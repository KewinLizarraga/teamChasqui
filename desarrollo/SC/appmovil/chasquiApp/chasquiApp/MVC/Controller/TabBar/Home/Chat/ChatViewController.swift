//
//  ChatViewController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 7/9/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit
import SocketIO
class ChatViewController: UIViewController,ListAdapterDataSource {
    
    var business_id: String! {
        didSet{
            print("el business_id es",business_id)
            verifyIfExistsAChat()
        }
    }
    
    var owner_id: String! {
        didSet{
            print("el owner_id es",owner_id)
        }
    }
    
    
    var chat_id: String! = nil {
        didSet {
            print("el chat_id es",chat_id)
            getMessages()
        }
    }
    
    var user_id: String {
        return Globals.usuario.getId()
    }
    
    var data: [Message]! = []
    
    fileprivate func verifyIfExistsAChat() {
        
        ApiService.sharedInstance.verifyChatID(business_id: business_id) { (err, statusCode, json) in
            if let error = err {
                self.showAlert(title: "Error verifying", message: error.localizedDescription)
            }else {
                if statusCode == 200 {
                    if let array = json?.array {
                        if array.count != 0 {
                            if let chat = array.first {
                                self.chat_id = chat["_id"].stringValue
                            }
                        }else {
                            self.getChatID()
                        }
                    }
                }else {
                    self.showAlert(title: "Ocurrio algo", message: json!.description)
                }
            }
        }
    }
    
    fileprivate func getChatID() {
        ApiService.sharedInstance.getChatID(business_id: business_id) { (err, statusCode, json) in
            if let error = err {
                self.showAlert(title: "Error getChatID", message: error.localizedDescription)
            }else {
                if statusCode == 200 {
                    print(json!)
                    self.chat_id = json!["_id"].stringValue
                }else {
                    self.showAlert(title: "Ocurrio algo", message: json!.description)
                }
            }
        }
    }
    
    fileprivate func getMessages() {
        
        ApiService.sharedInstance.getMessages(chat_id: self.chat_id) { (err, statusCode, json) in
            if let error = err {
                self.showAlert(title: "Error getting messages", message: error.localizedDescription)
            }else {
                if statusCode == 200 {
                    if let messages = try? JSONDecoder().decode([Message].self, from: json!.rawData()) {
                        self.data = messages
                        self.adapter.performUpdates(animated: true, completion: nil)
                    }
                }else {
                    self.showAlert(title: "Ocurrio algo", message: json!.description)
                }
            }
        }
    }
    
    
    //MARK: - Components
    
    lazy var myCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .vertical
        let view = UICollectionView(frame: CGRect.zero, collectionViewLayout: layout)
        view.backgroundColor = UIColor.white
        return view
    }()
    
    lazy var adapter: ListAdapter = {
        let adapt = ListAdapter(updater: ListAdapterUpdater(), viewController: self, workingRangeSize: 1)
        adapt.collectionView = myCollectionView
        adapt.dataSource = self
        return adapt
    }()
    
    let sendButtonView = SendView()

    override func viewDidLoad() {
        super.viewDidLoad()
        _ = adapter
        setupViews()
        configureNavigationBar()
    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        configureNavigationBar()
    }
    
    
    
    //MARK: - Setup Views
    
    private func setupViews() {
        
        let safeArea = self.view.safeAreaLayoutGuide
        
        view.addSubview(sendButtonView)
        sendButtonView.snp.makeConstraints { (make) in
            make.bottom.equalTo(safeArea)
            make.height.equalTo(50)
            make.leading.trailing.equalToSuperview()
        }
        
        view.addSubview(myCollectionView)
        myCollectionView.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(safeArea)
            make.bottom.equalTo(sendButtonView.snp.top).offset(-8)
        }
    }
    
    
    //MARK: - configureNavigationBar
    
    private func configureNavigationBar() {
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title: " ", style: UIBarButtonItemStyle.plain, target: nil, action: nil)
        self.navigationController?.navigationBar.tintColor = UIColor.black
        
        //ButtonView
        sendButtonView.sendButton.addTarget(self, action: #selector(sendPressed), for: UIControlEvents.touchUpInside)
    }
    
    @objc func sendPressed() {
        
        guard let text = sendButtonView.bodyTV.text, text != "" else { return}
        sendButtonView.bodyTV.resignFirstResponder()
        
        let parameters: [String:Any] = [
            "message": text,
            "from": user_id,
            "to": owner_id,
            "chat_id": chat_id
        ]
        
        ApiService.sharedInstance.sendMessage(parameters: parameters) { (err, statusCode, json) in
            if let error = err {
                self.showAlert(title: "Error sending messages", message: error.localizedDescription)
            }else {
                if statusCode == 200 {
                    let message = json!["message"]
                    if let newMessage = try? JSONDecoder().decode(Message.self, from: message.rawData()) {
                        self.data.append(newMessage)
                        self.adapter.performUpdates(animated: true, completion: nil)
                        self.sendButtonView.bodyTV.text = ""
                    }
                }else {
                    self.showAlert(title: "Ocurrio algo", message: json!.description)
                }
            }
        }
    }
    
    
    
    func objects(for listAdapter: ListAdapter) -> [ListDiffable] {
        return data
    }
    
    func listAdapter(_ listAdapter: ListAdapter, sectionControllerFor object: Any) -> ListSectionController {
        return MessageSectionController()
    }
    
    func emptyView(for listAdapter: ListAdapter) -> UIView? {
        return nil
    }
    
    
}

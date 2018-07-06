//
//  AddCommentController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/26/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import Cosmos

class AddCommentController: UIViewController {
    
    
    var id: String! {
        didSet {
            
        }
    }
    
    var name: String? {
        didSet{
            serviceName.text = name
        }
    }
    
    let serviceName: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.left
        label.font = Font.customFont(type: Font.FontName.regular, 18)
        label.sizeToFit()
        return label
    }()
    
    let rate: CosmosView = {
        let view = CosmosView()
        view.settings.updateOnTouch = true
        view.settings.starSize = 25
        view.rating = 0
        view.settings.fillMode = .full
        view.settings.totalStars = 5
        view.settings.filledColor = Colors.dorado
        return view
    }()
    
    
    let titleTF: UITextField = {
        let tf = UITextField()
        tf.backgroundColor = UIColor.white
        tf.placeholder = "Titulo"
        return tf
    }()
    
    let bodyTF: UITextView = {
        let tf = UITextView()
        tf.backgroundColor = UIColor.white
        return tf
    }()
    
    let sendButton: RoundedButton = {
        let button = RoundedButton()
        button.setTitle("Enviar", for: UIControlState.normal)
        button.backgroundColor = UIColor.blue
        button.addTarget(self, action: #selector(send), for: UIControlEvents.touchUpInside)
        return button
    }()
    
    @objc func send() {
        let body = [
            "title": self.titleTF.text!,
            "message": self.bodyTF.text!
        ]
    
        let parameters: [String:Any] = [
            "business_id": self.id,
            "month_visited": "2018-06-27T07:06:57.504Z",
            "visitor_type": "5b1e0c36e8783c10a8dec482",
            "body": body,
            "stars": rate.rating
        ]
        ApiService.sharedInstance.addComment(parameters: parameters) { (err, statusCode, json) in
            if let error = err {
                self.showAlert(title: "Error", message: error.localizedDescription)
            }else {
                if statusCode == 200 {
                    self.showAlert(title: "Exitoso", message: "Su mensaje fue enviado",completion: {
                        print(json!)
                        self.navigationController?.popViewController(animated: true)
                    })
                }else {
                     self.showAlert(title: "Ocurrio algo", message: json!.description)
                }
            }
        }
    }
    
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        sendButton.layer.cornerRadius = sendButton.bounds.height / 2.0
        sendButton.layer.masksToBounds = true
    }
    
    private func configureNavigationBar() {
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title: " ", style: UIBarButtonItemStyle.plain, target: nil, action: nil)
        self.navigationController?.navigationBar.tintColor = UIColor.black
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
        
        view.backgroundColor = UIColor(hexString: "F6F0F0")
        
        let safeArea = Globals.heightFromTopToNavigationBarBottom
        
        view.addSubview(serviceName)
        serviceName.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.top.equalToSuperview().offset(safeArea)
            
        }
        
        view.addSubview(rate)
        rate.snp.makeConstraints { (make) in
            make.centerX.equalTo(serviceName)
            make.top.equalTo(serviceName.snp.bottom).offset(15)
            make.size.equalTo(CGSize(width: 120, height: 30))
        }
        
        view.addSubview(titleTF)
        titleTF.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.top.equalTo(rate.snp.bottom).offset(15)
            make.width.equalToSuperview().offset(-40)
            make.height.equalTo(40)
        }
        
        view.addSubview(bodyTF)
        bodyTF.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.top.equalTo(titleTF.snp.bottom).offset(15)
            make.width.equalToSuperview().offset(-40)
            make.height.equalTo(100)
        }
        
        view.addSubview(sendButton)
        sendButton.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.top.equalTo(bodyTF.snp.bottom).offset(25)
            make.width.equalToSuperview().offset(-60)
            make.height.equalTo(45)
        }
        
    }
    
}

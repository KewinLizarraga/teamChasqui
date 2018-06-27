//
//  ServiceDetailViewController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/5/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit
import FirebasePerformance

class ServiceDetailViewController: UIViewController, ListAdapterDataSource {
    
    var data: [Any]! = []
    
    var id: String! {
        didSet {
            loadMoreData({
                self.loadComments({
                    self.loadQuestions()
                })
            })
        }
    }
    
    lazy var seeInMapController = SeeInMapController()
    
    fileprivate func loadComments(_ completion: @escaping () -> () ) {
        //Comments
        guard let url = URL(string: Globals.comments), let metric = HTTPMetric(url: url, httpMethod: .get) else { return }
        metric.start()
        ApiService.sharedInstance.getComments(id: id, { (err, statusCode, json) in
            metric.responseCode = statusCode
            metric.stop()
            if let error = err {
                print(error)
            }else {
                print(json!)
                if let comments = try? JSONDecoder().decode([Comment].self, from: json!.rawData()) {
                    let commentSection = CommentSection(name: "Opiniones", comments: comments)
                    self.data.append(commentSection)
                }
                completion()
            }
            
        })
    }
    
    fileprivate func loadQuestions() {
        //QUestions
        guard let url = URL(string: Globals.comments), let metric = HTTPMetric(url: url, httpMethod: .get) else { return }
        metric.start()
        ApiService.sharedInstance.getQuestions(id: id, { (err, statusCode, json) in
            metric.responseCode = statusCode
            metric.stop()
            if let error = err {
                print(error)
            }else {
                print(json!)
                if let comments = try? JSONDecoder().decode([Question].self, from: json!.rawData()) {
                    let commentSection = QuestionSection(name: "Preguntas", questions: comments)
                    self.data.append(commentSection)
                }
            }
            self.adapter.performUpdates(animated: true, completion: nil)
        })
    }
    
    private func loadMoreData(_ completion: @escaping () -> () ) {
        guard let url = URL(string: Globals.business), let metric = HTTPMetric(url: url, httpMethod: .get) else { return }
        metric.start()
        ApiService.sharedInstance.getBusinessById(id: id) { (err, statusCode, json) in
            metric.responseCode = statusCode
            metric.stop()
            if let error = err {
                print(error)
            }else {
                
                if let newService = try? JSONDecoder().decode(MoreInformationService.self, from: json!.rawData()) {
                    var info = [Info]()
                    info.append(Info(name: newService.web, type: Info.TypeOfInfo.web))
                    info.append(Info(name: newService.phone, type: Info.TypeOfInfo.phone))
                    info.append(Info(name: newService.geo_location, type: Info.TypeOfInfo.geo_location))
                    info.append(Info(name: newService.address, type: Info.TypeOfInfo.address))
                    let additInfo = AdditionalInformation(name: "Información adicional", information: info)
                    self.data.append(additInfo)
                }else {
                    print("error")
                }
                completion()
            }
        }
    }
    
    // MARK: - Components
    
    lazy var collectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .vertical
        let view = UICollectionView(frame: CGRect.zero, collectionViewLayout: layout)
        view.backgroundColor = UIColor.clear
        return view
    }()
    
    lazy var adapter: ListAdapter = {
        let adapt = ListAdapter(updater: ListAdapterUpdater(), viewController: self, workingRangeSize: 0)
        adapt.collectionView = collectionView
        adapt.dataSource = self
        return adapt
    }()
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        UIApplication.shared.statusBarStyle = .lightContent
        self.navigationController?.navigationBar.tintColor = UIColor.white
    }
    
    //FIXME: - ok
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        UIApplication.shared.statusBarStyle = .default
    }
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor.white
        _ = adapter
        setupViews()
        configureNavigationBar()
    }
    
    //MARK: - configureNavigationBar
    
    private func configureNavigationBar() {
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title: " ", style: UIBarButtonItemStyle.plain, target: nil, action: nil)
        self.navigationController?.navigationBar.tintColor = UIColor.white
    }
    
    //MARK: - Setup Views
    
    private func setupViews() {
        
        let safeArea = self.view.safeAreaLayoutGuide
        
        view.addSubview(collectionView)
        collectionView.snp.makeConstraints { (make) in
            make.trailing.leading.equalToSuperview()
            make.top.equalToSuperview().offset(-Globals.heightFromTopToNavigationBarBottom)
            make.bottom.equalTo(safeArea)
        }
        
    }
    
    //MARK: - Adapter Data Source
    
    func objects(for listAdapter: ListAdapter) -> [ListDiffable] {
        return data as! [ListDiffable]
    }
    
    func listAdapter(_ listAdapter: ListAdapter, sectionControllerFor object: Any) -> ListSectionController {
        if object is Service {
            return TitleServiceSectionController()
        }else if object is AdditionalInformation {
            return AdditionalInformationSectionController()
        }
        else if object is CommentSection {
            return CommentsSectionController()
        }else if object is QuestionSection {
            return QuestionsSectionController()
        }
        else {
            return PhotoSectionController()
        }
    }
    
    func emptyView(for listAdapter: ListAdapter) -> UIView? {
        return nil
    }
    
    
    
    
    
    
    
}

//
//  CategoryDetailController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/12/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit
import UIKit


class CategoryDetailController: UIViewController, ListAdapterDataSource {
    
    var category: String! {
        didSet {
            loadData()
        }
    }
    
    var data: [Any]!
    
    lazy var seeInMapController = SeeInMapController()
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        self.mapButton.layer.cornerRadius = self.mapButton.bounds.width / 2.0
        self.mapButton.layer.shadowOffset = CGSize(width: 0, height: 2)
        self.mapButton.layer.shadowRadius = 5
        self.mapButton.layer.shadowColor = UIColor.lightGray.cgColor
        self.mapButton.layer.shadowOpacity = 0.7
        
        
    }
    
    //MARK: - Components
    
    lazy var myCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .vertical
        let view = UICollectionView(frame: CGRect.zero, collectionViewLayout: layout)
        view.backgroundColor = UIColor.clear
        return view
    }()
    
    lazy var adapter: ListAdapter = {
        let adapt = ListAdapter(updater: ListAdapterUpdater(), viewController: self, workingRangeSize: 1)
        adapt.collectionView = myCollectionView
        adapt.dataSource = self
        return adapt
    }()
    
    let mapButton: MapButton = {
        let button = MapButton()
        button.addTarget(self, action: #selector(mapTapped), for: UIControlEvents.touchUpInside)
        return button
    }()
    
    @objc func mapTapped() {
        seeInMapController.data = self.data
        self.navigationController?.pushViewController(seeInMapController, animated: true)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor(hexString: "F6F0F0")
        configureNavigationBar()
        setupViews()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.navigationBar.tintColor = UIColor.black
    }
    //MARK: - configureNavigationBar
    
    private func configureNavigationBar() {
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title: " ", style: UIBarButtonItemStyle.plain, target: nil, action: nil)
        self.navigationController?.navigationBar.tintColor = UIColor.black
    }
    
    //MARK: - Setup Views
    
    private func setupViews() {
        
        let safeArea = self.view.safeAreaLayoutGuide
        
        view.addSubview(myCollectionView)
        myCollectionView.snp.makeConstraints { (make) in
            make.edges.equalTo(safeArea)
        }
        
        view.addSubview(mapButton)
        mapButton.snp.makeConstraints { (make) in
            make.bottom.equalTo(safeArea).inset(20)
            make.trailing.equalToSuperview().inset(20)
            make.width.equalToSuperview().multipliedBy(0.2)
            make.height.equalTo(mapButton.snp.width)
            
        }
    }
    
    //MARK: - Load Data
    
    private func loadData() {
        ApiService.sharedInstance.getBusinessByType(type: category) { (err, statusCode, json) in
            if let error = err {
                print("error business by type",error)
            }else {
                if let services = try? JSONDecoder().decode([Service].self, from: json!.rawData()) {
                    self.data = services
                }
                self.adapter.performUpdates(animated: true, completion: nil)
            }
        }
    }
    
    
    //MARK: - List adapter datasource
    
    func objects(for listAdapter: ListAdapter) -> [ListDiffable] {
        return data as! [ListDiffable]
    }
    
    func listAdapter(_ listAdapter: ListAdapter, sectionControllerFor object: Any) -> ListSectionController {
        return CategoryDetailSectionController()
    }
    
    func emptyView(for listAdapter: ListAdapter) -> UIView? {
        return nil
    }
    
    
    
}

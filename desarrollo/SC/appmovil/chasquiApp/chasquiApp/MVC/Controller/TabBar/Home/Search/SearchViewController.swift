//
//  SearchViewController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/5/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit
import UIKit
import SnapKit

class SearchViewController: UIViewController {
    
    private var data: [Any] = ["Cerca",RecentPlaces.defaultData()]
    
    
    //MARK: - Components
    
    let closeButton: UIButton = {
        let button = UIButton()
        button.setImage(UIImage(named: "close"), for: UIControlState.normal)
        button.addTarget(self, action: #selector(closePressed), for: UIControlEvents.touchUpInside)
        return button
    }()
    
    @objc func closePressed() {
        textToSearchTF.resignFirstResponder()
        self.dismiss(animated: true, completion: nil)
    }
    
    let textToSearchTF: UITextField = {
        let tf = UITextField()
        tf.placeholder = "A donde quieres ir?"
        tf.font = Font.customFont(type: Font.FontName.regular, 15)
        tf.returnKeyType = .search
        return tf
    }()
    
    lazy var searchCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .vertical
        let view = UICollectionView(frame: CGRect.zero, collectionViewLayout: layout)
        view.backgroundColor = UIColor.clear
        return view
    }()
    
    lazy var adapter: ListAdapter = {
        let adapt = ListAdapter(updater: ListAdapterUpdater(), viewController: self, workingRangeSize: 1)
        adapt.collectionView = searchCollectionView
        adapt.dataSource = self
        return adapt
    }()
    
    //MARK: - Setup Views
    
    private func setupViews() {
        
        let safeArea = self.view.safeAreaLayoutGuide
        
        view.addSubview(closeButton)
        closeButton.snp.makeConstraints { (make) in
            make.trailing.equalToSuperview().inset(10)
            make.top.equalTo(safeArea).offset(15)
            make.size.equalTo(CGSize(width: 24, height: 24))
        }
        
        view.addSubview(textToSearchTF)
        textToSearchTF.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview().inset(15)
            make.top.equalTo(closeButton.snp.bottom).offset(15)
            make.height.equalTo(40)
        }
        
        view.addSubview(searchCollectionView)
        searchCollectionView.snp.makeConstraints { (make) in
            make.top.equalTo(textToSearchTF.snp.bottom).offset(10)
            make.leading.trailing.bottom.equalTo(safeArea)
        }
        
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        textToSearchTF.becomeFirstResponder()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        _ = adapter
        view.backgroundColor = UIColor.white
        
        setupViews()
        
    }
    
}
extension SearchViewController: ListAdapterDataSource {
    
    func objects(for listAdapter: ListAdapter) -> [ListDiffable] {
        return data as! [ListDiffable]
    }
    
    func listAdapter(_ listAdapter: ListAdapter, sectionControllerFor object: Any) -> ListSectionController {
        if object is String {
            return NearSectionController()
        }
        return RecentsSectionController()
    }
    
    func emptyView(for listAdapter: ListAdapter) -> UIView? {
        return nil
    }
    
}

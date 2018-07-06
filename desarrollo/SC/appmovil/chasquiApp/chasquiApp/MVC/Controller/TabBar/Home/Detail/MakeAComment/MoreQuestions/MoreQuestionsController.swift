//
//  MoreQuestionsController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/26/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit

class MoreQuestionsController: UIViewController,ListAdapterDataSource {
    
    
    var data: QuestionSection! {
        didSet{
            self.adapter.performUpdates(animated: true, completion: nil)
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
        
        view.addSubview(myCollectionView)
        myCollectionView.snp.makeConstraints { (make) in
            make.edges.equalTo(safeArea)
        }
        
        
    }
    
    
    //MARK: - configureNavigationBar
    
    private func configureNavigationBar() {
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title: " ", style: UIBarButtonItemStyle.plain, target: nil, action: nil)
        self.navigationController?.navigationBar.tintColor = UIColor.black
    }
    
    
    
    func objects(for listAdapter: ListAdapter) -> [ListDiffable] {
        return [data]
    }
    
    func listAdapter(_ listAdapter: ListAdapter, sectionControllerFor object: Any) -> ListSectionController {
        return QuestionsSectionControllerCopy()
    }
    
    func emptyView(for listAdapter: ListAdapter) -> UIView? {
        return nil
    }
    
    
}


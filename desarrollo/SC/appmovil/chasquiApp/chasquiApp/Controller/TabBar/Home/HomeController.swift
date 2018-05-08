//
//  HomeController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 4/24/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class HomeController: UIViewController {
    
    lazy var collectionView: ListCollectionView = {
        let layout = ListCollectionViewLayout(stickyHeaders: false, topContentInset: 0, stretchToEdge: false)
        let view = ListCollectionView(frame: CGRect.zero, listCollectionViewLayout: layout)
        return view
    }()
    
    lazy var adapter: ListAdapter = {
        let adapt = ListAdapter(updater: ListAdapterUpdater(), viewController: self, workingRangeSize: 0)
        return adapt
    }()
    
    
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.configureTabBar()
        
        
    }
    
    fileprivate func configureTabBar() {
        self.navigationController?.navigationBar.isHidden = true
    }
    
    
}


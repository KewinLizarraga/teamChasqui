//
//  HomeController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 4/24/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit
import SnapKit

class HomeController: UIViewController {
    
    var data: [Any]! = []
    
    lazy var searchViewController = SearchViewController()
    
    // MARK: - Components
    
    let discoverLabel: UILabel = {
        let label = UILabel()
        label.font = Font.customFont(type: Font.FontName.semibold,33)
        label.text = "Descubre"
        return label
    }()
    
    let searchButton: CustomSearchBar = {
        let view = CustomSearchBar()
        view.addTarget(self, action: #selector(searchTapped), for: UIControlEvents.touchUpInside)
        return view
    }()

    @objc func searchTapped() {
        searchViewController.modalPresentationStyle = .overCurrentContext
        searchViewController.modalTransitionStyle = .crossDissolve
        self.tabBarController?.present(searchViewController, animated: true, completion: nil)
    }

    lazy var sectionCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .vertical
        let view = UICollectionView(frame: CGRect.zero, collectionViewLayout: layout)
        view.backgroundColor = UIColor.clear
        return view
    }()
    
    lazy var adapterOfSections: ListAdapter = {
        let adapt = ListAdapter(updater: ListAdapterUpdater(), viewController: self, workingRangeSize: 1)
        adapt.collectionView = sectionCollectionView
        adapt.dataSource = self
        return adapt
    }()
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
    }
    
    override func viewDidLoad() {
        
//        print("User ID",Globals.usuario.getId())
        super.viewDidLoad()
        self.configureNavigationBar()
        self.setupViews()
        

        _ = adapterOfSections
    
        self.data.append(AllCategories())
        
        ApiService.sharedInstance.getBusinesses { (err, sta, json) in
            if let error = err {
                print("error getting businesses",error)
            }else {
                
                if let featuredHotel = try? JSONDecoder().decode([Service].self, from: json!["hotel"].rawData()) {
                    self.data.append(FeaturedServices(name: "Hoteles Destacados", services: featuredHotel))
                }
                
                
                if let featuredRestaurants = try? JSONDecoder().decode([Service].self, from: json!["restaurant"].rawData()) {
                    self.data.append(FeaturedServices(name: "Restaurantes Destacados", services: featuredRestaurants))
                }
                
                if let featuredTravelAgencies = try? JSONDecoder().decode([Service].self, from: json!["travel_agency"].rawData()) {
                    self.data.append(FeaturedServices(name: "Agencias Destacadas", services: featuredTravelAgencies))
                }
            }
            self.adapterOfSections.performUpdates(animated: true, completion: nil)
        }
    }
    
    //MARK: - NavigationBar configuration
    
    private func configureNavigationBar() {
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: UIBarMetrics.default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title: " ", style: UIBarButtonItemStyle.plain, target: nil, action: nil)
    }
    
    //MARK: - Setup Views
    private func setupViews() {
        
        let safeArea = self.view.safeAreaLayoutGuide
        
        self.view.addSubview(discoverLabel)
        discoverLabel.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(20)
            make.top.equalTo(safeArea).offset(-44 + 15)
        }
        
        self.view.addSubview(searchButton)
        searchButton.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview().inset(15)
            make.top.equalTo(discoverLabel.snp.bottom).offset(5)
            make.height.equalTo(35)
        }
    
        self.view.addSubview(sectionCollectionView)
        sectionCollectionView.snp.makeConstraints { (make) in
            make.top.equalTo(searchButton.snp.bottom).offset(10)
            make.leading.trailing.bottom.equalTo(safeArea)
        }
    }
    
    
}


//MARK: - Adapter Data Source

extension HomeController: ListAdapterDataSource {
    func objects(for listAdapter: ListAdapter) -> [ListDiffable] {
        return data as! [ListDiffable]
    }
    
    func listAdapter(_ listAdapter: ListAdapter, sectionControllerFor object: Any) -> ListSectionController {
        return HorizontalSectionController()
    }
    
    func emptyView(for listAdapter: ListAdapter) -> UIView? {
        return nil
    }

}








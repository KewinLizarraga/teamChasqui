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
    
    var data: [Any]! = [Category(name: "Hoteles", imageName: "hotel"),
                        Category(name: "Restaurantes", imageName: "restaurant"),
                        Category(name: "Agencias de turismo", imageName: "bus")]
    
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
        self.showAlert(title: "FIXME:",message: "Aqui se manda a otra pantalla",completion: nil)
    }
    
    lazy var categoryCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .horizontal
        let view = UICollectionView(frame: CGRect.zero, collectionViewLayout: layout)
        view.backgroundColor = UIColor.clear
        return view
    }()
    
    lazy var sectionCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .vertical
        let view = UICollectionView(frame: CGRect.zero, collectionViewLayout: layout)
        view.backgroundColor = UIColor.clear
        return view
    }()
    
    lazy var adapterOfCategories: ListAdapter = {
        let adapt = ListAdapter(updater: ListAdapterUpdater(), viewController: self, workingRangeSize: 1)
        adapt.collectionView = categoryCollectionView
        adapt.dataSource = self
        return adapt
    }()
    
    lazy var adapterOfSections: ListAdapter = {
        let adapt = ListAdapter(updater: ListAdapterUpdater(), viewController: self, workingRangeSize: 1)
        adapt.collectionView = sectionCollectionView
        adapt.dataSource = self
        return adapt
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.configureNavigationBar()
        self.setupViews()
        
        _ = adapterOfCategories
            
        _ = adapterOfSections
        
        ApiService.sharedInstance.getBusinesses { (err, sta, json) in
            if let error = err {
                print(error)
            }else {
                do {
                    let featuredRestaurants = try JSONDecoder().decode([Service].self, from: json!["restaurant"].rawData())
                    let featuredHotel = try JSONDecoder().decode([Service].self, from: json!["hotel"].rawData())
                    let featuredTravelAgencies = try JSONDecoder().decode([Service].self, from: json!["travel_agency"].rawData())
                    let allFeatured = [FeaturedServices(name: "Hoteles Destacados", services: featuredHotel),
                                       FeaturedServices(name: "Restaurantes Destacados", services: featuredRestaurants),
                                       FeaturedServices(name: "Agecias Destacadas", services: featuredTravelAgencies)]
                    self.data.append(FeaturedServices(name: "Hoteles Destacados", services: featuredHotel))
                    self.data.append(FeaturedServices(name: "Restaurantes Destacados", services: featuredRestaurants))
                    self.data.append(FeaturedServices(name: "Agencias Destacadas", services: featuredTravelAgencies))
                    
                    self.adapterOfSections.performUpdates(animated: true, completion: nil)
                }catch let error {
                    print(error)
                }
            }
        }
    }
    
    //MARK: - NavigationBar configuration
    
    private func configureNavigationBar() {
        self.navigationController?.navigationBar.isHidden = true
        
        
        
    }
    
    //MARK: - Setup Views
    private func setupViews() {
        
        let safeArea = self.view.safeAreaLayoutGuide
        
        self.view.addSubview(discoverLabel)
        discoverLabel.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(30)
            make.top.equalTo(safeArea).offset(15)
        }
        
        self.view.addSubview(searchButton)
        searchButton.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(15)
            make.top.equalTo(discoverLabel.snp.bottom).offset(5)
            make.trailing.equalToSuperview().offset(-15)
            make.height.equalTo(30)
        }
        
        self.view.addSubview(categoryCollectionView)
        categoryCollectionView.snp.makeConstraints { (make) in
            make.leading.trailing.equalTo(safeArea)
            make.top.equalTo(searchButton.snp.bottom).offset(5)
            make.height.equalTo(safeArea.snp.width).multipliedBy(0.3)
        }
        
        self.view.addSubview(sectionCollectionView)
        sectionCollectionView.snp.makeConstraints { (make) in
            make.top.equalTo(categoryCollectionView.snp.bottom).offset(5)
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
        if object is Category {
            return CategorySectionController()
        }
        let section = HorizontalSectionController()
        return section
    }
    
    func emptyView(for listAdapter: ListAdapter) -> UIView? {
        return nil
    }
    
    
    
    
}






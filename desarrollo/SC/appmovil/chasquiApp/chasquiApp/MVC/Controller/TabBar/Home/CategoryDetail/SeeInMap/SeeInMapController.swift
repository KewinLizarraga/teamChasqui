//
//  SeeInMapController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/12/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import MapKit
import IGListKit

class SeeInMapController: UIViewController, ListAdapterDataSource {
    
    
    var data: [Any]! {
        didSet {
            self.adapter.performUpdates(animated: true, completion: nil)
        }
    }
    
    
    //MARK: - Components
    
    lazy var mapView: MKMapView = {
        let view = MKMapView()
        return view
    }()
    
    let locationButton: MapButton = {
        let button = MapButton()
        button.setImage(UIImage(named: "compass"), for: .normal)
        button.imageEdgeInsets = UIEdgeInsetsMake(8, 8, 8, 8)
        return button
    }()
    
    lazy var myCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .horizontal
        let view = UICollectionView(frame: CGRect.zero, collectionViewLayout: layout)
        view.backgroundColor = UIColor.clear
        view.showsHorizontalScrollIndicator = false
        view.isPagingEnabled = true
        return view
    }()
    
    lazy var adapter: ListAdapter = {
        let adapt = ListAdapter(updater: ListAdapterUpdater(), viewController: self, workingRangeSize: 1)
        adapt.collectionView = myCollectionView
        adapt.dataSource = self
        return adapt
    }()
    
    
    //MARK: - configureNavigationBar
    
    private func configureNavigationBar() {
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title: " ", style: UIBarButtonItemStyle.plain, target: nil, action: nil)
        self.navigationController?.navigationBar.tintColor = UIColor.black
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.navigationBar.tintColor = UIColor.black
    }
    
    //MARK: - Setup Views
    
    private func setupViews() {
        
        let safeArea = view.safeAreaLayoutGuide
        view.addSubview(mapView)
        mapView.snp.makeConstraints { (make) in
            make.edges.equalTo(safeArea)
        }
        
        view.addSubview(myCollectionView)
        myCollectionView.snp.makeConstraints { (make) in
            make.leading.trailing.bottom.equalTo(safeArea).inset(10)
            make.height.equalTo(safeArea.snp.width).multipliedBy(0.36)
        }
        
        view.addSubview(locationButton)
        locationButton.snp.makeConstraints { (make) in
            make.bottom.equalTo(myCollectionView.snp.top).offset(-10)
            make.size.equalTo(CGSize(width: 36, height: 36))
            make.leading.equalToSuperview().inset(10)
        }
        
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        self.myCollectionView.layer.cornerRadius = 8
        self.myCollectionView.layer.shadowOffset = CGSize(width: 0, height: 2)
        self.myCollectionView.layer.shadowRadius = 5
        self.myCollectionView.layer.shadowColor = UIColor.lightGray.cgColor
        self.myCollectionView.layer.shadowOpacity = 0.7
        
        self.locationButton.layer.cornerRadius = locationButton.bounds.width / 2.0
        self.locationButton.layer.shadowOffset = CGSize(width: 0, height: 2)
        self.locationButton.layer.shadowRadius = 5
        self.locationButton.layer.shadowColor = UIColor.lightGray.cgColor
        self.locationButton.layer.shadowOpacity = 0.7
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        _ = adapter
        view.backgroundColor = UIColor(hexString: "F6F0F0")
        configureNavigationBar()
        setupViews()
        
        if let services = data as? [Service] {
            for i in 0..<services.count {
                let s = services[i]
                let annotation = MKPointAnnotation()
                let coord = CLLocationCoordinate2DMake(s.geo_location.lat,s.geo_location.lng)
                annotation.coordinate = coord
                annotation.title = s.name
                annotation.subtitle = "\(s.review_count) Reviews"
                self.mapView.addAnnotation(annotation)
                if i == 0 {
                    let coordinateRegion = MKCoordinateRegionMakeWithDistance(coord, 500, 500)
                    mapView.setRegion(coordinateRegion, animated: true)
                }
            }
        }
        
        
    }
    
    //MARK: - List adapter datasource
    
    func objects(for listAdapter: ListAdapter) -> [ListDiffable] {
        return data as! [ListDiffable]
    }
    
    func listAdapter(_ listAdapter: ListAdapter, sectionControllerFor object: Any) -> ListSectionController {
        let sectionController = CategoryDetailSectionController()
        sectionController.delegate = self
        return sectionController
    }
    
    func emptyView(for listAdapter: ListAdapter) -> UIView? {
        return nil
    }

}
    
extension SeeInMapController: MoveMapDelegate {
    func moveToCoord(location: GeoLocation) {
        let coord = CLLocationCoordinate2DMake(location.lat,location.lng)
        let coordinateRegion = MKCoordinateRegionMakeWithDistance(coord, 500, 500)
        self.mapView.setRegion(coordinateRegion, animated: true)
        
    }
}

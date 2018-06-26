//
//  CategoryDetailSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/12/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit
import UIKit

protocol MoveMapDelegate {
    func moveToCoord(location: GeoLocation)
}


class CategoryDetailSectionController: ListSectionController, ListDisplayDelegate {
    
    private var service: Service!
    
    var delegate: MoveMapDelegate? = nil
    
    override init() {
        super.init()
        minimumLineSpacing = 0
        minimumInteritemSpacing = 0
        self.displayDelegate = self
    }
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        let cell = collectionContext!.dequeueReusableCell(of: CategoryDetailCell.self, for: self, at: index) as! CategoryDetailCell
        cell.item = service;
        if let controller = self.viewController {
            if controller is SeeInMapController{
                cell.backgroundColor = UIColor.white
            }
        }
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width
        return CGSize(width: width, height: width*0.36)
    }
    
    override func didUpdate(to object: Any) {
        service = object as? Service
    }
    override func didSelectItem(at index: Int) {
        print(service.name)
        let controller = self.viewController
        let detailController = ServiceDetailViewController()
        detailController.id = service!.id
        if let imageURL = service.photos.first {
            detailController.data.append(imageURL)
        }
        detailController.data.append(service!)
        controller?.navigationController?.pushViewController(detailController, animated: true)
    }
    
    // MARK: ListDisplayDelegate
    
    func listAdapter(_ listAdapter: ListAdapter, willDisplay sectionController: ListSectionController) {
        delegate?.moveToCoord(location: service.geo_location)
        
    }
    
    func listAdapter(_ listAdapter: ListAdapter, didEndDisplaying sectionController: ListSectionController) {
        
    }
    
    func listAdapter(_ listAdapter: ListAdapter, willDisplay sectionController: ListSectionController, cell: UICollectionViewCell, at index: Int) {
        
    }
    
    func listAdapter(_ listAdapter: ListAdapter, didEndDisplaying sectionController: ListSectionController, cell: UICollectionViewCell, at index: Int) {
        
    }
    
    
}

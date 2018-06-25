//
//  GeneralInformationSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/7/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//



import UIKit
import IGListKit

class TitleServiceSectionController: ListSectionController {
    
    private var service: Service!
    
    override init() {
        super.init()
        minimumLineSpacing = 0
        minimumInteritemSpacing = 0
    }
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        let cell = collectionContext!.dequeueReusableCell(of: TitleOfServiceCell.self, for: self, at: index) as! TitleOfServiceCell
        cell.item = service;
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width
        return CGSize(width: width, height: 110)
    }
    
    override func didUpdate(to object: Any) {
        service = object as? Service
    }
    override func didSelectItem(at index: Int) {
        
    }
    
}

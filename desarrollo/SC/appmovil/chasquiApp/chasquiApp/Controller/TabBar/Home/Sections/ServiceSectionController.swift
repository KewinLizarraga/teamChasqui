//
//  ServiceSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/22/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class ServiceSectionController: ListSectionController {
    
    
    var category: Category!
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        let cell = collectionContext!.dequeueReusableCell(of: CategoryCell.self, for: self, at: index) as! CategoryCell
        cell.item = category;
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width / 3
        return CGSize(width: width, height: width)
    }
    
    override func didUpdate(to object: Any) {
        category = object as? Category
    }
    override func didSelectItem(at index: Int) {
        print(category.name)
    }
}

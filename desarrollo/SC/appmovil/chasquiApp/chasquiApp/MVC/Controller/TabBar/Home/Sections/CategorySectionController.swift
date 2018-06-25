//
//  CategorySectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/9/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class CategorySectionController: ListSectionController {
    
    private var category: Category!
    
    override init() {
        super.init()
        minimumLineSpacing = 0
        minimumInteritemSpacing = 0
    }
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        let cell = collectionContext!.dequeueReusableCell(of: CategoryCell.self, for: self, at: index) as! CategoryCell
        cell.item = category;
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.height
        return CGSize(width: width, height: width)
    }
    
    override func didUpdate(to object: Any) {
        category = object as? Category
    }
    override func didSelectItem(at index: Int) {
        let type = String(describing: category.type)
        let controller = self.viewController
        let detailController = CategoryDetailController()
        detailController.category = type
        detailController.title = category.name
        controller?.navigationController?.pushViewController(detailController, animated: true)
        
    }
    
}

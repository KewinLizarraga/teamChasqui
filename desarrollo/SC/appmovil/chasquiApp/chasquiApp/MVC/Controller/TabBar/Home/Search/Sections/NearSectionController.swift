//
//  NearSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/5/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class NearSectionController: ListSectionController {
    
    private var item: String!
    
    override init() {
        super.init()
        minimumLineSpacing = 0
        minimumInteritemSpacing = 0
    }
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        let cell = collectionContext!.dequeueReusableCell(of: NearCell.self, for: self, at: index) as! NearCell
        cell.item = item;
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width
        return CGSize(width: width, height: 40)
    }
    
    override func didUpdate(to object: Any) {
        item = object as? String
    }
    override func didSelectItem(at index: Int) {
        print(item)
    }
    
}

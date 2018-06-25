//
//  PhotoSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/8/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class PhotoSectionController: ListSectionController {
    
    private var photo: String!
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        let cell = collectionContext!.dequeueReusableCell(of: ImageCell.self, for: self, at: index) as! ImageCell
        cell.item = photo
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width
        return CGSize(width: width, height: width*9.0/16)
    }
    
    override func didUpdate(to object: Any) {
        photo = object as? String
    }
    override func didSelectItem(at index: Int) {
        print(photo)
    }
    
}


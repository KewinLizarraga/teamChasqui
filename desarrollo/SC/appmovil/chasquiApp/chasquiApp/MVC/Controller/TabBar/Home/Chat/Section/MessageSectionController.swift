//
//  MessageSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 7/9/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit

class MessageSectionController: ListSectionController {
    
    private var item: Message!
    
    override init() {
        super.init()
    }
   
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        let cell = collectionContext!.dequeueReusableCell(of: MessageCell.self, for: self, at: index) as! MessageCell
        cell.item = item
        cell.layoutIfNeeded()
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width
        let body = item.message
        let height = MessageCell.textHeight(body , width: width)
        return CGSize(width: width, height: height)
    }
    
    override func didUpdate(to object: Any) {
        item = object as? Message
    }
    override func didSelectItem(at index: Int) {
        print("toco message")
    }
    
    
   
    
    
}

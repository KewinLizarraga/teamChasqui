//
//  EmbeddedSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/22/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit
import UIKit

final class EmbeddedSectionController: ListSectionController {
    
    private var service: Service?
    
    override init() {
        super.init()
        self.inset = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 10)
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let height = collectionContext?.containerSize.height ?? 0
        return CGSize(width: height, height: height)
    }
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        guard let cell = collectionContext?.dequeueReusableCell(of: ServiceCell.self, for: self, at: index) as? ServiceCell else {
            fatalError()
        }
        cell.item = self.service
        return cell
    }
    
    override func didUpdate(to object: Any) {
        service = object as? Service
    }
    
}

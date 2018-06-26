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
        inset = UIEdgeInsets(top: 0, left: 15, bottom: 0, right: 0)
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let height = collectionContext?.containerSize.height ?? 0
        let width = collectionContext?.containerSize.width ?? 0
        return CGSize(width: width*4.0/9, height: height)
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
    
    override func didSelectItem(at index: Int) {
        
        let controller = self.viewController
        let detailController = ServiceDetailViewController()
        if let imageURL = service?.photos.first {
            detailController.data.append(imageURL)
        }
        detailController.data.append(service!)
        detailController.id = service!.id
        controller?.navigationController?.pushViewController(detailController, animated: true)
    }
    
    
    
}

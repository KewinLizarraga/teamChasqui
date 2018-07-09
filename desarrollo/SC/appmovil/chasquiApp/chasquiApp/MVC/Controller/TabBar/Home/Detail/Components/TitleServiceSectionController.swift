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
        cell.item = service
        cell.bookButton.addTarget(self, action: #selector(openChat), for: UIControlEvents.touchUpInside)
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width
        return CGSize(width: width, height: 110)
    }
    
    override func didUpdate(to object: Any) {
        service = object as? Service
    }
    
    @objc func openChat() {
        let vc = ChatViewController()
        vc.business_id = service.id
        vc.owner_id = service.user_id
        self.viewController?.navigationController?.pushViewController(vc, animated: true)
    }
    
    override func didSelectItem(at index: Int) {

    }
    
}

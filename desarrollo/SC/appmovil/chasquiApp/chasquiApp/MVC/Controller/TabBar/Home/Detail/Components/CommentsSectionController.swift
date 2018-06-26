//
//  CommentsSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/25/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class CommentsSectionController: ListSectionController, ListSupplementaryViewSource {
    
    private var item: CommentSection!
    
    override init() {
        super.init()
        supplementaryViewSource = self
        minimumLineSpacing = 0
        minimumInteritemSpacing = 0
        inset = UIEdgeInsetsMake(0, 0, 0, 0)
    }
    
    override func numberOfItems() -> Int {
        return item.comments.count < 3 ? item.comments.count : 3
    }
    
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        let cell = collectionContext!.dequeueReusableCell(of: CommentCell.self, for: self, at: index) as! CommentCell
        cell.item = item.comments[index]
        cell.layoutIfNeeded()
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width
        return CGSize(width: width, height: 110)
    }
    
    override func didUpdate(to object: Any) {
        item = object as? CommentSection
    }
    override func didSelectItem(at index: Int) {
        
    }
    
    // MARK: - ListSupplementaryViewSource
    
    func supportedElementKinds() -> [String] {
        return [UICollectionElementKindSectionHeader,UICollectionElementKindSectionFooter]
    }
    
    func viewForSupplementaryElement(ofKind elementKind: String, at index: Int) -> UICollectionReusableView {
        switch elementKind {
        case UICollectionElementKindSectionHeader:
            return userHeaderView(atIndex: index)
        default:
            return userFooterView(atIndex: index)
        }
    }
    
    func sizeForSupplementaryView(ofKind elementKind: String, at index: Int) -> CGSize {
        if elementKind == UICollectionElementKindSectionFooter {
            return CGSize(width: collectionContext!.containerSize.width, height: 80)
        }
        return CGSize(width: collectionContext!.containerSize.width, height: 40)
    }
    
    // MARK: - Private
    
    private func userHeaderView(atIndex index: Int) -> UICollectionReusableView {
        guard let view = collectionContext?.dequeueReusableSupplementaryView(ofKind: UICollectionElementKindSectionHeader, for: self, class: ServiceHeaderView.self, at: index) as? ServiceHeaderView else { fatalError() }
        view.item = item.name
        return view
    }
    
    private func userFooterView(atIndex index: Int) -> UICollectionReusableView {
        guard let view = collectionContext?.dequeueReusableSupplementaryView(ofKind: UICollectionElementKindSectionFooter, for: self, class: ServiceFooterView.self, at: index) as? ServiceFooterView else { fatalError() }
        view.moreButton.addTarget(self, action: #selector(buttonPressed), for: UIControlEvents.touchUpInside)
        view.addCommentButton.addTarget(self, action: #selector(addcommentPressed), for: UIControlEvents.touchUpInside)
        view.item = "Ver más comentarios"
        return view
    }
    
    //MARK: - Button handlers
    
    @objc func buttonPressed() {
        print("pressed")
        let vc = MakeACommentController()
        vc.data = item
        self.viewController?.navigationController?.pushViewController(vc, animated: true)
        
    }
    
    @objc func addcommentPressed() {
        print("pressed add comment")
        if Globals.usuario.getisSession() == false {
            self.viewController?.showAlert(title: "Informacion", message: "Usted necesita tener una cuenta para realizar esta operacion")
        }else {
            let vc = AddCommentController()
            if let id = (self.viewController as! ServiceDetailViewController).id {
                vc.service = id
            }

            self.viewController?.navigationController?.pushViewController(vc, animated: true)
        }
    }
    
}

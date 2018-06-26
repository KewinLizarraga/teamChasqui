//
//  CommentsSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/25/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class CommentsSectionControllerCopy: ListSectionController, ListSupplementaryViewSource {
    
    private var item: CommentSection!
    
    override init() {
        super.init()
        supplementaryViewSource = self
        minimumLineSpacing = 0
        minimumInteritemSpacing = 0
        inset = UIEdgeInsetsMake(0, 0, 0, 0)
    }
    
    override func numberOfItems() -> Int {
        return item.comments.count
    }
    
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        let cell = collectionContext!.dequeueReusableCell(of: CommentCell.self, for: self, at: index) as! CommentCell
        cell.item = item.comments[index]
        cell.layoutIfNeeded()
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width
        let body = item.comments[index].body.message
        let height = CommentCell.textHeight(body , width: width)
        return CGSize(width: width, height: height)
    }
    
    override func didUpdate(to object: Any) {
        item = object as? CommentSection
    }
    override func didSelectItem(at index: Int) {
        
    }
    
    // MARK: - ListSupplementaryViewSource
    
    func supportedElementKinds() -> [String] {
        return [UICollectionElementKindSectionHeader]
    }
    
    func viewForSupplementaryElement(ofKind elementKind: String, at index: Int) -> UICollectionReusableView {
        switch elementKind {
        case UICollectionElementKindSectionHeader:
            return userHeaderView(atIndex: index)
        default:
            fatalError()
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
    
    
    
}

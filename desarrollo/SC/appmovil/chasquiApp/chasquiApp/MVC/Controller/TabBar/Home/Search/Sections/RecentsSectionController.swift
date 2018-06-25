//
//  RecentsSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/5/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class RecentsSectionController: ListSectionController,ListSupplementaryViewSource  {
    
    private var recents: RecentPlaces!
    
    override init() {
        super.init()
        supplementaryViewSource = self
        minimumLineSpacing = 0
        minimumInteritemSpacing = 0
    }
    
    override func numberOfItems() -> Int {
        return recents.places.count
    }
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        let cell = collectionContext!.dequeueReusableCell(of: RecentCell.self, for: self, at: index) as! RecentCell
        cell.item = recents.places[index];
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width
        return CGSize(width: width, height: 40)
    }
    
    override func didUpdate(to object: Any) {
        recents = object as? RecentPlaces
    }
    override func didSelectItem(at index: Int) {
        print(recents.places[index].city)
    }
    
    //MARK: - Suplementary view
    
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
        return CGSize(width: collectionContext!.containerSize.width, height: 20)
    }
    
    // MARK: - Private
    
    private func userHeaderView(atIndex index: Int) -> UICollectionReusableView {
        guard let view = collectionContext?.dequeueReusableSupplementaryView(ofKind: UICollectionElementKindSectionHeader, for: self, class: RecentsHeaderView.self, at: index) as? RecentsHeaderView else { fatalError() }
        view.item = recents.recent
        return view
    }
    
}

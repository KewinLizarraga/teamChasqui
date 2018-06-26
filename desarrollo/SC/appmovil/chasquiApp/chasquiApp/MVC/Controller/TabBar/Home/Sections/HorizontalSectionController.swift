//
//  HorizontalSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/22/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//


import IGListKit
import UIKit

final class HorizontalSectionController: ListSectionController, ListAdapterDataSource, ListSupplementaryViewSource {
    
    private var items: Any!
    
    lazy var adapter: ListAdapter = {
        let adapter = ListAdapter(updater: ListAdapterUpdater(),
                                  viewController: self.viewController,
                                  workingRangeSize: 1)
        adapter.dataSource = self
        return adapter
    }()
    
    override init() {
        super.init()
        supplementaryViewSource = self
        inset = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
        minimumInteritemSpacing = 0
        minimumLineSpacing = 0
        _ = adapter
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width
        if items is AllCategories {
            return CGSize(width: width, height: width/3.0)
        }
        return CGSize(width: width, height: width*5.0/9)
    }
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        guard let cell = collectionContext?.dequeueReusableCell(of: EmbeddedCollectionViewCell.self,
                                                                for: self,
                                                                at: index) as? EmbeddedCollectionViewCell else {
                                                                    fatalError()
        }
        adapter.collectionView = cell.collectionView
        return cell
    }
    
    override func didUpdate(to object: Any) {
        if let obj = object as? FeaturedServices {
            items = obj
        }else {
            items = object as? AllCategories
        }
        
        
    }
    
    // MARK: - ListAdapterDataSource
    
    func objects(for listAdapter: ListAdapter) -> [ListDiffable] {
        if items is AllCategories {
            return (items as! AllCategories).categories
        }
        return Array((items as! FeaturedServices).services.prefix(10))
    }
    
    func listAdapter(_ listAdapter: ListAdapter, sectionControllerFor object: Any) -> ListSectionController {
        if object is Category {
            return CategorySectionController()
        }
        return EmbeddedSectionController()
    }
    
    func emptyView(for listAdapter: ListAdapter) -> UIView? {
        return nil
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
        if items is AllCategories {
            return CGSize(width: 0, height: 0)
        }
        return CGSize(width: collectionContext!.containerSize.width, height: 40)
    }
    
    // MARK: - Private
    
    private func userHeaderView(atIndex index: Int) -> UICollectionReusableView {
        guard let view = collectionContext?.dequeueReusableSupplementaryView(ofKind: UICollectionElementKindSectionHeader, for: self, class: ServiceHeaderView.self, at: index) as? ServiceHeaderView else { fatalError() }
        if let _ = items as? AllCategories {
            view.item = ""
        }else {
            view.item = (items as! FeaturedServices).name
        }
        return view
    }

}

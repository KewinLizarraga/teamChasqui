//
//  AdditionalInformationSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/8/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit
import UIKit

final class AdditionalInformationSectionController: ListSectionController, ListSupplementaryViewSource {
    
    private var additionalInfo: AdditionalInformation!
    
    var expanded = false
 
    override init() {
        super.init()
        supplementaryViewSource = self
        minimumLineSpacing = 0
        minimumInteritemSpacing = 0
        inset = UIEdgeInsetsMake(0, 0, 0, 0)
    }
    
    override func numberOfItems() -> Int {
        return additionalInfo.information.count
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        
        let width = collectionContext!.containerSize.width
        if additionalInfo.information[index].type == .geo_location {
            return  CGSize(width: width, height: 110)
        }
        if additionalInfo.information[index].type == .address {
            if let address = additionalInfo.information[index].name as? Address {
                let height = expanded ? InformationCell.textHeight(address.togetherInfo , width: width) : InformationCell.singleLineHeight
                return CGSize(width: width, height: height)
            }
        }
        return CGSize(width: width, height: 50)
    }
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        guard let cell = collectionContext?.dequeueReusableCell(of: InformationCell.self,
                                                                for: self,
                                                                at: index) as? InformationCell else {
                                                                    fatalError()
        }
        cell.item = additionalInfo.information[index]
        return cell
    }
    
    override func didUpdate(to object: Any) {
        additionalInfo = object as? AdditionalInformation
    }
    
    override func didSelectItem(at index: Int) {
        let info = additionalInfo.information[index]
        switch info.type {
            case .web:
                UIApplication.shared.open(URL(string : info.name as! String)!, options: [:], completionHandler: { (status) in })
            case .phone:
                if let numbersOnly = info.name as? String {
                    if let url = URL(string: "tel://\(numbersOnly)"), UIApplication.shared.canOpenURL(url) {
                        if #available(iOS 10, *) {
                            UIApplication.shared.open(url)
                        } else {
                            UIApplication.shared.openURL(url)
                        }
                    }
                }
            case .geo_location:
                if let vc = self.viewController as? ServiceDetailViewController {
                    if let service = vc.data[1] as? Service {
                        vc.seeInMapController.data = [service]
                        vc.navigationController?.pushViewController(vc.seeInMapController, animated: true)
                    }
                }
            case .address:
                print("toco address")
                    expanded = !expanded
                    UIView.animate(withDuration: 0.5,
                                   delay: 0,
                                   usingSpringWithDamping: 0.4,
                                   initialSpringVelocity: 0.6,
                                   options: [],
                                   animations: {
                                    self.collectionContext?.invalidateLayout(for: self)
                    })
                
            
            
        }
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
        return CGSize(width: collectionContext!.containerSize.width, height: 40)
    }
    
    // MARK: - Private
    
    private func userHeaderView(atIndex index: Int) -> UICollectionReusableView {
        guard let view = collectionContext?.dequeueReusableSupplementaryView(ofKind: UICollectionElementKindSectionHeader, for: self, class: ServiceHeaderView.self, at: index) as? ServiceHeaderView else { fatalError() }
        view.item = additionalInfo.name
        return view
    }
    
}
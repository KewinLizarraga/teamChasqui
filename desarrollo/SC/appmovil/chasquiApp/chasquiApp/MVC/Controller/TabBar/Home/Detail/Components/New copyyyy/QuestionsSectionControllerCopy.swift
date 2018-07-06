//
//  QuestionsSectionController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/27/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class QuestionsSectionControllerCopy: ListSectionController, ListSupplementaryViewSource {
    
    private var item: QuestionSection!
    
    override init() {
        super.init()
        supplementaryViewSource = self
        minimumLineSpacing = 0
        minimumInteritemSpacing = 0
        inset = UIEdgeInsetsMake(0, 0, 0, 0)
    }
    
    override func numberOfItems() -> Int {
        return item.questions.count
    }
    
    
    override func cellForItem(at index: Int) -> UICollectionViewCell {
        let cell = collectionContext!.dequeueReusableCell(of: QuestionCell.self, for: self, at: index) as! QuestionCell
        cell.item = item.questions[index]
        cell.layoutIfNeeded()
        return cell
    }
    
    override func sizeForItem(at index: Int) -> CGSize {
        let width = collectionContext!.containerSize.width
        let body = item.questions[index].message
        let height = QuestionCell.textHeight(body , width: width)
        return CGSize(width: width, height: height)
    }
    
    override func didUpdate(to object: Any) {
        item = object as? QuestionSection
    }
    override func didSelectItem(at index: Int) {
        print("toco pregunta")
        let i = item.questions[index]
        print(i.id)
        print(i.message)
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
        view.item = "Ver más preguntas"
        view.addCommentButton.setTitle("Hacer una pregunta", for: UIControlState.normal)
        return view
    }
    
    //MARK: - Button handlers
    
    @objc func buttonPressed() {
        print("pressed")
        let vc = MoreQuestionsController()
        vc.data = item
        self.viewController?.navigationController?.pushViewController(vc, animated: true)
        
    }
    
    
}


//
//  Category.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/8/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class Category: ListDiffable {
    
    var name: String
    var categoryImage: UIImage
    var type: CategoryType
    
    enum CategoryType {
        case hotel,restaurant,travel_agency
    }
    
    init(name: String, imageName: String, type: CategoryType) {
        self.name = name
        self.categoryImage = UIImage(named: imageName) ?? UIImage()
        self.type = type
    }
    
    func diffIdentifier() -> NSObjectProtocol {
        return name as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        guard self !== object else { return true }
        guard let object = object as? Category else { return false }
        return name == object.name
    }
    
    //MARK: - Static categories
    
    static func categories() -> [Category] {
        return [
            Category(name: "Hoteles", imageName: "hotel", type: .hotel),
            Category(name: "Restaurantes", imageName: "restaurant", type: .restaurant),
            Category(name: "Agencias de turismo", imageName: "bus", type: .travel_agency)
        ]
    }
    
}

class AllCategories: ListDiffable {
    
    var name: String
    var categories: [Category]
    
    init() {
        self.name = "All categories available"
        self.categories = Category.categories()
    }
    
    
    func diffIdentifier() -> NSObjectProtocol {
        return name as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        guard self !== object else { return true }
        guard let object = object as? AllCategories else { return false }
        return name == object.name
    }
    
    
    
    
}


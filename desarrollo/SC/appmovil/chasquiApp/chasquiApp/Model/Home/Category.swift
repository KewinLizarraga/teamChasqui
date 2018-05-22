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
    
    init(name: String, imageName: String) {
        self.name = name
        self.categoryImage = UIImage(named: imageName) ?? UIImage()
    }
    
    //MARK: - ListDiffable methods
    
    func diffIdentifier() -> NSObjectProtocol {
        return name as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        guard self !== object else { return true }
        guard let obj = object as? Category else { return false }
        return self.name == obj.name
    }
    
    //MARK: - Static categories
    
    static func categories() -> [Category] {
        return [
            Category(name: "Hoteles", imageName: "hotel"),
            Category(name: "Restaurantes", imageName: "restaurant"),
            Category(name: "Agencias de turismo", imageName: "bus")
        ]
    }
    
}

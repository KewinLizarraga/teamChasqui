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
    
    func diffIdentifier() -> NSObjectProtocol {
        return name as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        return self.name == (object as! Category).name
    }
    

    var name: String
    var imageName: UIImage
    
    init(name: String, imageName: String) {
        self.name = name
        self.imageName = UIImage(named: imageName) ?? UIImage()
    }
    
}

//
//  FeaturedServices.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/22/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit
import UIKit

class FeaturedServices: ListDiffable {
    
    var name: String
    var services: [Service]
    
    init(name: String, services: [Service]) {
        self.name = name
        self.services = services
    }
    
    
    func diffIdentifier() -> NSObjectProtocol {
        return name as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        guard self !== object else { return true }
        guard let object = object as? FeaturedServices else { return false }
        return name == object.name 
    }
    
    
    
    
}

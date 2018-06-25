//
//  AdditionalInformation.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/11/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit
import UIKit


struct Info {
    
    enum TypeOfInfo {
        case phone,web,geo_location,address
    }
    
    var name: Any
    var type: TypeOfInfo
}

class AdditionalInformation: ListDiffable {
    
    var name: String
    var information: [Info]

    init(name: String, information: [Info]) {
        self.name = name
        self.information = information
    }
    
    
    func diffIdentifier() -> NSObjectProtocol {
        return name as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        guard self !== object else { return true }
        guard let object = object as? AdditionalInformation else { return false }
        return name == object.name
    }
    
    
    
    
}


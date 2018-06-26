//
//  CommentSection.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/25/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit

class CommentSection: ListDiffable {
    
    var name: String
    var comments: [Comment]
    
    init(name: String, comments: [Comment]) {
        self.name = name
        self.comments = comments
    }
    
    
    func diffIdentifier() -> NSObjectProtocol {
        return name as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        guard self !== object else { return true }
        guard let object = object as? CommentSection else { return false }
        return name == object.name
    }
    
    
    
    
}


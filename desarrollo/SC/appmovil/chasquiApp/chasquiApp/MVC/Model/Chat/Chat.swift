//
//  Chat.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 7/9/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class Chat: ListDiffable, Decodable {
    
    var id: String
    var message: String
    var from: String
    var to: String
    var chat_id: String
    
    
    //MARK: - Decodable methods
    
    private enum CodingKeys: String,CodingKey {
        case id = "_id"
        case message
        case from
        case to
        case chat_id
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        message = try container.decode(String.self, forKey: .message)
        from = try container.decode(String.self, forKey: .from)
        to = try container.decode(String.self, forKey: .to)
        chat_id = try container.decode(String.self, forKey: .chat_id)
    }
    
    
    //MARK: - ListDiffable methods
    
    func diffIdentifier() -> NSObjectProtocol {
        return id as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        guard self !== object else { return true }
        guard let object = object as? Message else { return false }
        return id == object.id
    }
    
}


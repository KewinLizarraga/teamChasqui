//
//  Question.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/27/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit

class Question: Decodable, ListDiffable {
    
    var id: String
    var reply_count: Int
    var user_id: String
    var business_id: String
    var message: String
    
    
    //MARK: - Decodable methods
    
    private enum CodingKeys: String,CodingKey {
        case id = "_id"
        case reply_count
        case user_id
        case business_id
        case message
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        reply_count = try container.decode(Int.self, forKey: .reply_count)
        user_id = try container.decode(String.self, forKey: .user_id)
        business_id = try container.decode(String.self, forKey: .business_id)
        message = try container.decode(String.self, forKey: .message)
    }
    
    
    func diffIdentifier() -> NSObjectProtocol {
        return id as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        guard self !== object else { return true }
        guard let object = object as? Comment else { return false }
        return id == object.id
    }
    
    
}


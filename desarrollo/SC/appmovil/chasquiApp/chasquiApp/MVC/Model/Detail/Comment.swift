//
//  Comment.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/25/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit

class Comment: Decodable, ListDiffable {
    
    var id: String
    var stars: Double
    var user_id: String
    var business_id: String
    var month_visited: String
    var body: CommentBody
    
    
    //MARK: - Decodable methods
    
    private enum CodingKeys: String,CodingKey {
        case id = "_id"
        case stars
        case user_id
        case business_id
        case month_visited
        case body
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        stars = try container.decode(Double.self, forKey: .stars)
        user_id = try container.decode(String.self, forKey: .user_id)
        business_id = try container.decode(String.self, forKey: .business_id)
        body = try container.decode(CommentBody.self, forKey: .body)
        month_visited = try container.decode(String.self, forKey: .month_visited)
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

struct CommentBody: Decodable {
    
    var title: String
    var message: String
    
    //MARK: - Decodable methods
    
    private enum CodingKeys: String,CodingKey {
        case title
        case message
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        title = try container.decode(String.self, forKey: .title)
        message = try container.decode(String.self, forKey: .message)
    }
    
}

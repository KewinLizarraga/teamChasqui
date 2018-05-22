//
//  Service.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/10/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class Service: ListDiffable, Decodable {
    
    var id: String
    var name: String
    var photos: [String]
    var stars: Int
    var type: String
    var review_count: Int

    
    //MARK: - Decodable methods
    
    enum CodingKeys: String,CodingKey {
        case id = "_id"
        case name
        case photos
        case stars
        case type
        case review_count
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        photos = try container.decode([String].self, forKey: .photos)
        stars = try container.decode(Int.self, forKey: .stars)
        type = try container.decode(String.self, forKey: .type)
        review_count = try container.decode(Int.self, forKey: .review_count)
    }
    
    
    //MARK: - ListDiffable methods
    
    func diffIdentifier() -> NSObjectProtocol {
        return id as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        guard self !== object else { return true }
        guard let object = object as? Service else { return false }
        return id == object.id
    }
    
}

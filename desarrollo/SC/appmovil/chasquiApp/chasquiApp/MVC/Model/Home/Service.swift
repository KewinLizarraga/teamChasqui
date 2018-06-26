//
//  Service.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/10/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit



//MARK: - Service

class Service: ListDiffable, Decodable {
    
    var id: String
    var name: String
    var photos: [String]
    var stars: Double
    var type: String
    var review_count: Int
    var geo_location: GeoLocation
    var price: Price

    
    //MARK: - Decodable methods
    
    private enum CodingKeys: String,CodingKey {
        case id = "_id"
        case name
        case photos
        case stars
        case type
        case review_count
        case geo_location
        case price
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        let phot = try container.decode([String].self, forKey: .photos)
        photos = phot.count == 0 ? [Globals.defaultPhotoURL] : phot
        stars = try container.decode(Double.self, forKey: .stars)
        type = try container.decode(String.self, forKey: .type)
        review_count = try container.decode(Int.self, forKey: .review_count)
        geo_location = try container.decode(GeoLocation.self, forKey: .geo_location)
        price = try container.decode(Price.self, forKey: .price)
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

//MARK: - Geolocation

struct GeoLocation: Decodable {
    var lat: Double
    var lng: Double
    
    //MARK: - Decodable methods
    
    private enum CodingKeys: String,CodingKey {
        case lat,lng
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        lat = try container.decode(Double.self, forKey: .lat)
        lng = try container.decode(Double.self, forKey: .lng)
    }
    
}

//MARK: - Price

struct Price: Decodable {
    var min: Double
    var max: Double
    var average: Double
    
    //MARK: - Decodable methods
    
    private enum CodingKeys: String,CodingKey {
        case min,max,average
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        min = try container.decode(Double.self, forKey: .min)
        max = try container.decode(Double.self, forKey: .max)
        average = try container.decode(Double.self, forKey: .average)
    }
    
}


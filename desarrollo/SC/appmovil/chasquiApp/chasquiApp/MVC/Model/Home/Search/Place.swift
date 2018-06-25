//
//  Place.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/5/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import IGListKit
import UIKit

class Place: ListDiffable {
    
    var city: String
    var country: String
    
    init(city: String, country: String) {
        self.city = city
        self.country = country
    }
    
    
    func diffIdentifier() -> NSObjectProtocol {
        return city as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        guard self !== object else { return true }
        guard let object = object as? Place else { return false }
        return city == object.city && country == object.country
    }
    
    
    
    
}



class RecentPlaces: ListDiffable {
    
    var recent = "RECIENTES"
    var places: [Place]
    
    init(places: [Place]) {
        self.places = places
    }
    
    func diffIdentifier() -> NSObjectProtocol {
        return recent as NSObjectProtocol
    }
    
    func isEqual(toDiffableObject object: ListDiffable?) -> Bool {
        guard self !== object else { return true }
        guard let object = object as? RecentPlaces else { return false }
        return recent == object.recent
    }
    
    static func defaultData() -> RecentPlaces {
        var rawData = [Place]()
        rawData.append(Place(city: "Chancay", country: "Peru"))
        rawData.append(Place(city: "Cuzco", country: "Peru"))
        rawData.append(Place(city: "Lima", country: "Peru"))
        rawData.append(Place(city: "Denver", country: "Estados Unidos"))
        rawData.append(Place(city: "Callao", country: "Peru"))
        rawData.append(Place(city: "Iquitos", country: "Peru"))
        rawData.append(Place(city: "Peru", country: "America del Sur"))
        rawData.append(Place(city: "1Chancay", country: "Peru"))
        rawData.append(Place(city: "1Cuzco", country: "Peru"))
        rawData.append(Place(city: "1Lima", country: "Peru"))
        rawData.append(Place(city: "1Denver", country: "Estados Unidos"))
        rawData.append(Place(city: "1Callao", country: "Peru"))
        rawData.append(Place(city: "1Iquitos", country: "Peru"))
        rawData.append(Place(city: "1Peru", country: "America del Sur"))
        rawData.append(Place(city: "2Chancay", country: "Peru"))
        rawData.append(Place(city: "2Cuzco", country: "Peru"))
        rawData.append(Place(city: "2Lima", country: "Peru"))
        rawData.append(Place(city: "2Denver", country: "Estados Unidos"))
        rawData.append(Place(city: "2Callao", country: "Peru"))
        rawData.append(Place(city: "2Iquitos", country: "Peru"))
        rawData.append(Place(city: "2Peru", country: "America del Sur"))
        return RecentPlaces(places: rawData)
    }
}

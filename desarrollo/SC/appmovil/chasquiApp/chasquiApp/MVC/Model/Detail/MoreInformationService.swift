//
//  MoreInformationService.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/12/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import IGListKit

class MoreInformationService: Service {
    
    var phone: String
    var web: String
    var address: Address
    
    
    
    //MARK: - Decodable methods
    
    private enum CodingKeys: String,CodingKey {
        case phone
        case web = "web_page"
        case address
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        phone = try container.decode(String.self, forKey: .phone)
        web = try container.decode(String.self, forKey: .web)
        address = try container.decode(Address.self, forKey: .address)
        try super.init(from: decoder)
    }

}

struct Address: Decodable {
    var details: String
    var reference: String
    
    var togetherInfo: String {
        return details + " " + reference
    }
    
    //MARK: - Decodable methods
    
    private enum CodingKeys: String,CodingKey {
        case details
        case reference
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        details = try container.decode(String.self, forKey: .details)
        reference = try container.decode(String.self, forKey: .reference)
    }
}

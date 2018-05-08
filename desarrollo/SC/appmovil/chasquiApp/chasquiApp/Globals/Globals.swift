//
//  Globals.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 4/24/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class Globals {
    
    static var baseURL: String {
        return (UIApplication.shared.delegate as! AppDelegate).remoteConfig?.configValue(forKey: parameters.rest_dev.rawValue).stringValue ?? ""
    }
    
    //Auth
    
    static let auth = baseURL + "/auth"
    static let singup = auth + "/singup"
    static let confirmation = auth + "/confirmation"
    static let login = auth + "/login"
    static let forgot = auth + "/forgot"
    
    //Business
    
    static let business = baseURL + "businesses"
    
    
    
    private enum parameters: String {
        case rest_dev = "rest_dev"
        case rest_prod = "rest_prod"
    }
    
    static var remoteConfig: [String : NSObject] = [
        parameters.rest_dev.rawValue : "hola mundo" as NSObject
    ]
    
    
    
    
    
    
}

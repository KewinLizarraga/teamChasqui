//
//  Globals.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 4/24/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class Globals {
    
    static var isInProduction = false
    
    static var baseURL: String {
        let enviroment = isInProduction ? MyRemoteConfig.rest_prod : MyRemoteConfig.rest_dev
        return (UIApplication.shared.delegate as! AppDelegate).remoteConfig?.configValue(forKey: enviroment).stringValue ?? MyRemoteConfig.remoteConfig[enviroment] as! String
    }
    
    //Auth
    
    static let auth = baseURL + "/auth"
    static let singup = auth + "/singup"
    static let confirmation = auth + "/confirmation"
    static let login = auth + "/login"
    static let forgot = auth + "/forgot"
    
    //Business
    
    static let business = baseURL + "businesses"
    
}

//
//  Globals.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 4/24/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class Globals {
    
    static var isInProduction: Bool {
        return (UIApplication.shared.delegate as! AppDelegate).remoteConfig?.configValue(forKey: MyRemoteConfig.is_in_production).boolValue ?? false
    }
    
    static var baseURL: String {
        let enviroment = isInProduction ? MyRemoteConfig.rest_prod : MyRemoteConfig.rest_dev
        return (UIApplication.shared.delegate as! AppDelegate).remoteConfig?.configValue(forKey: enviroment).stringValue ?? ""
    }
    
    static var defaultPhotoURL: String {
        return (UIApplication.shared.delegate as! AppDelegate).remoteConfig?.configValue(forKey: MyRemoteConfig.default_photo).stringValue ?? ""
    }
    static let heightFromTopToNavigationBarBottom = UIApplication.shared.statusBarFrame.height + 44
    
    static var usuario = userModel()
    
    //Auth
    
    static let auth = baseURL + "auth"
    static let singup = auth + "/signup"
    static let confirmation = auth + "/confirmation"
    static let login = auth + "/login"
    static let forgot = auth + "/forgot"
    
    //Business
    
    static let business = baseURL + "businesses"
    
    //Comments
    
    static let comments = business
    
    //Add comments
    
    static let addComment = baseURL + "reviews"
    
    
}

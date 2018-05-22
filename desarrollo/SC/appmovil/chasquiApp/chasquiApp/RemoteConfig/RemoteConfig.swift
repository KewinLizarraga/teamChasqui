//
//  RemoteConfig.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/9/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import Foundation

struct MyRemoteConfig {
    
    static let rest_dev = "rest_dev"
    static let rest_prod = "rest_prod"
    
    static var remoteConfig: [String : NSObject] = [
        rest_dev : "http://206.189.175.34:8000/api/v1/" as NSObject,
        rest_prod : "Hola Mundo" as NSObject
    ]
    
}

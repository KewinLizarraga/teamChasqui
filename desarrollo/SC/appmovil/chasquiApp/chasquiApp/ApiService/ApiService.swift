//
//  ApiService.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/8/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import Foundation
import Alamofire
import SwiftyJSON

class ApiService {
    
    static let sharedInstance = ApiService()
    
    //MARK: - Request for all methods
    
    func request(url: String,
                 httpMethod: HTTPMethod,
                 parameters: Parameters?,
                 encoding: ParameterEncoding = URLEncoding.default,
                 headers: HTTPHeaders?,
                 completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> ()) {
        Alamofire.request(url, method: httpMethod, parameters: parameters, encoding: encoding, headers: headers).responseJSON { (dataResponse) in
            if let error = dataResponse.error {
                DispatchQueue.main.async {
                    completion(error, dataResponse.response?.statusCode ?? -1, nil)
                    return
                }
            }
            
            if let value = dataResponse.value, let statusCode = dataResponse.response?.statusCode {
                DispatchQueue.main.async {
                    let json = JSON(value)
                    completion(nil,statusCode,json)
                }
            }
        }
    }
}

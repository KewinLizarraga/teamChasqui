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
    
    //MARK: - Get business
    
    func getBusinesses(_ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        ApiService.sharedInstance.request(url: Globals.business, httpMethod: .get, parameters: nil, headers: nil, completion: completion)
    }
    
    //MARK: - Get business by id
    
    func getBusinessById(id: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.business + "/\(id)?details=true&mode=populated"
        ApiService.sharedInstance.request(url: url, httpMethod: .get, parameters: nil, headers: nil, completion: completion)
    }
    
    //MARK: - Get business by type
    
    func getBusinessByType(type: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.business + "?filter[type]=\(type)"
        ApiService.sharedInstance.request(url: url, httpMethod: .get, parameters: nil, headers: nil, completion: completion)
    }
    //Signin
    func signin( name: String, password: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let parameters = [
            "email" : name,
            "password" : password
        ]
        let url = Globals.login
        ApiService.sharedInstance.request(url: url, httpMethod: .post, parameters: parameters, headers: nil, completion: completion)
        
    }
    
    //Signup
    func signup( parameters: [String:String], _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.singup
        ApiService.sharedInstance.request(url: url, httpMethod: .post, parameters: parameters, headers: nil, completion: completion)
        
    }
    
    //Forgot
    func forgot( email: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let parameters = [
            "email" : email
        ]
        let url = Globals.forgot
        ApiService.sharedInstance.request(url: url, httpMethod: .post, parameters: parameters, headers: nil, completion: completion)
    }
    
    
    //MARK: - Request for all methods
    
    func request(url: String,
                 httpMethod: HTTPMethod,
                 parameters: Parameters?,
                 encoding: ParameterEncoding = URLEncoding.default,
                 headers: HTTPHeaders?,
                 completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        print(url)
        Alamofire.request(url, method: httpMethod, parameters: parameters, encoding: encoding, headers: headers).responseJSON { (dataResponse) in
            if let error = dataResponse.error {
                DispatchQueue.main.async {
                    completion(error, dataResponse.response?.statusCode ?? -1, nil)
                }
            }else {
                if let value = dataResponse.value, let statusCode = dataResponse.response?.statusCode {
                    DispatchQueue.main.async {
                        let json = JSON(value)
                        completion(nil,statusCode,json)
                    }
                }
            }
            
        }
    }
}

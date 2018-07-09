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
        request(url: Globals.business, httpMethod: .get, parameters: nil, headers: nil, completion: completion)
    }
    
    //MARK: - Get business by id
    
    func getBusinessById(id: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.business + "/\(id)"
        request(url: url, httpMethod: .get, parameters: nil, headers: nil, completion: completion)
    }
    
    //MARK: - Get business by type
    
    func getBusinessByType(type: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.business + "?filter[type]=\(type)"
        request(url: url, httpMethod: .get, parameters: nil, headers: nil, completion: completion)
    }
    //Signin
    func signin( name: String, password: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let parameters = [
            "email" : name,
            "password" : password
        ]
        let url = Globals.login
        request(url: url, httpMethod: .post, parameters: parameters, headers: nil, completion: completion)
        
    }
    
    //Signup
    func signup( parameters: [String:String], _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.singup
        request(url: url, httpMethod: .post, parameters: parameters, headers: nil, completion: completion)
        
    }
    
    //Forgot
    func forgot( email: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let parameters = [
            "email" : email
        ]
        let url = Globals.forgot
        request(url: url, httpMethod: .post, parameters: parameters, headers: nil, completion: completion)
    }
    
    //Comments
    
    func getComments(id: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.comments + "/" + id + "/reviews"
        request(url: url, httpMethod: .get, parameters: nil, headers: nil, completion: completion)
    }
    
    func addComment(parameters: Parameters, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.addComment
        
        let headers: [String:String] = [
            "x-access-token": Globals.usuario.gettoken()
        ]
        request(url: url, httpMethod: .post, parameters: parameters, encoding: JSONEncoding.default, headers: headers, completion: completion)
    }
    
    //MARK: - Questions
    
    func getQuestions(id: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.comments + "/" + id + "/questions"
        request(url: url, httpMethod: .get, parameters: nil, headers: nil, completion: completion)
    }
    
    func addQuestion(parameters: Parameters, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.addQuestion
        
        let headers: [String:String] = [
            "x-access-token": Globals.usuario.gettoken()
        ]
        request(url: url, httpMethod: .post, parameters: parameters, encoding: JSONEncoding.default, headers: headers, completion: completion)
    }
    
    
    //MARK: - Chat
    
    func verifyChatID(business_id: String, completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.chat + "?filter[business_id]=" + business_id +  "&filter[user_id]=\(Globals.usuario.getId())"
        
        request(url: url, httpMethod: .get, parameters: nil, headers: nil, completion: completion)
    }
    
    func getChatID(business_id: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.chat
        
        let headers: [String:String] = [
            "x-access-token": Globals.usuario.gettoken()
        ]
        
        let parameters: Parameters = [
            "business_id": business_id
        ]
        request(url: url, httpMethod: .post, parameters: parameters, encoding: JSONEncoding.default, headers: headers, completion: completion)
    }
    
    //MARK: - Message
    
    func getMessages(chat_id: String, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.chat + "/" + chat_id + "/messages"
        
        request(url: url, httpMethod: .get, parameters: nil, encoding: URLEncoding.default, headers: nil, completion: completion)
    }
    
    func sendMessage(parameters: Parameters, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let url = Globals.messages
        
        let headers: [String:String] = [
            "x-access-token": Globals.usuario.gettoken()
        ]
    
        request(url: url, httpMethod: .post, parameters: parameters, encoding: JSONEncoding.default, headers: headers, completion: completion)
    }
    
    //MARK: - Maps
    
    func getPathID(_ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let headers: [String:String] = [
            "x-access-token": Globals.usuario.gettoken()
        ]
        request(url: Globals.directions, httpMethod: HTTPMethod.post, parameters: nil, encoding: JSONEncoding.default, headers: headers, completion: completion)
    }
    
    func sendLocations(parameters: Parameters, _ completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        let headers: [String:String] = [
            "x-access-token": Globals.usuario.gettoken()
        ]
        request(url: Globals.locations, httpMethod: HTTPMethod.post, parameters: parameters, encoding: JSONEncoding.default, headers: headers, completion: completion)
    }
    
    
    //MARK: - Request for all methods
    
    func request(url: String,
                 httpMethod: HTTPMethod,
                 parameters: Parameters?,
                 encoding: ParameterEncoding = URLEncoding.default,
                 headers: HTTPHeaders?,
                 completion: @escaping (_ error:Error?,_ statusCode:Int,_ json:JSON?) -> () ) {
        
        Alamofire.request(url, method: httpMethod, parameters: parameters, encoding: encoding, headers: headers).responseJSON { (dataResponse) in
            if let error = dataResponse.error {
                completion(error, dataResponse.response?.statusCode ?? -1, nil)
            }else {
                if let value = dataResponse.value, let statusCode = dataResponse.response?.statusCode {
                    let json = JSON(value)
                    completion(nil,statusCode,json)
                }
            }
        }
    }
}

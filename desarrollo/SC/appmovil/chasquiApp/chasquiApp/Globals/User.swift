//
//  User.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/26/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class userModel {
    let user : UserDefaults?
    var id: String?
    var nombre: String?
    var apellido: String?
    var correo: String?
    var isSession : Bool?
    var token: String?
    init() {
        user = UserDefaults.standard
    }
    
    func setId(value:String?){
        user!.set(value, forKey: "id")
        self.id = value
    }
    func  getId()->String{
        return user!.string(forKey: "id")!
    }
    func setnombre(value:String?){
        user!.set(value, forKey: "nombre")
        self.nombre = value
    }
    
    func  getnombre()->String{
        return user!.string(forKey: "nombre")!
    }
    func setapellido(value:String?){
        user!.set(value, forKey: "apellido")
        self.apellido = value
    }
    
    func  getapellido()->String{
        return user!.string(forKey: "apellido")!
    }
    func setcorreo(value:String?){
        user!.set(value, forKey: "correo")
        self.correo = value
    }
    
    func  getcorreo()->String{
        return user!.string(forKey: "correo")!
    }
    
    func settoken(value:String?){
        user!.set(value, forKey: "token")
        self.token = value
    }
    
    func  gettoken()->String{
        return user!.string(forKey: "token")!
    }
    
    func setisSession(value:Bool?){
        user!.set(value, forKey: "isSession")
        self.isSession = value
    }
    
    func  getisSession()->Bool{
        return user!.bool(forKey: "isSession")
    }
    
    func saveSession(){
        setisSession(value: true)
        user!.synchronize()
    }
    func logout(){
        /*for key in user!.dictionaryRepresentation().keys {
         user!.removeObject(forKey: key.description)
         }*/
        let appDomain = Bundle.main.bundleIdentifier!
        /*UserDefaults.standard.removePersistentDomain(forName: appDomain)*/
        user?.removePersistentDomain(forName: appDomain)
    }
}

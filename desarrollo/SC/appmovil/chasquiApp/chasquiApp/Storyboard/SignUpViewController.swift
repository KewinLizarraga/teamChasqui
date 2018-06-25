//
//  SignUpViewController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/5/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class SignUpViewController: UIViewController {

  
    
    
    @IBOutlet weak var name: UITextField!
    
    @IBOutlet weak var lastName: UITextField!
    
    
    @IBOutlet weak var repeatPass: UITextField!
    @IBOutlet weak var password: UITextField!
    @IBOutlet weak var email: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func backPressed(_ sender: Any) {
        self.navigationController?.popViewController(animated: true)
    }
    
    @IBAction func signUp(_ sender: Any) {
        
        let parameters: [String:String] = [
            "email":email.text!,
            "password":password.text!,
            "first_name":name.text!,
            "last_name":lastName.text!,
            "password2":repeatPass.text!
        ]
        ApiService.sharedInstance.signup(parameters: parameters) { (err, statusCode, json) in
            if let error = err {
                print(statusCode)
                self.showAlert(title: "Error", message: error.localizedDescription)
            }else {
                self.showAlert(title: "Exitoso", message: json!.description)
            }
        }
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}

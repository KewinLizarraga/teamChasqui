//
//  SignInViewController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/12/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class SignInViewController: UIViewController {

    @IBOutlet weak var passwordTF: UITextField!
    @IBOutlet weak var nameTF: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    private func configureNavigationBar() {
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: UIBarMetrics.default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title: " ", style: UIBarButtonItemStyle.plain, target: nil, action: nil)
    }
    
    @IBAction func signIn(_ sender: Any) {
        
        ApiService.sharedInstance.signin(name: nameTF.text!, password: passwordTF.text!) { (err, statusCode, json) in
            if let error = err {
                self.showAlert(title: "Error", message: error.localizedDescription)
            }else {
                
                if statusCode == 200 {
                    self.showAlert(title: "Exitoso", message: "Correcto")
                    let user = json!["user"]
                    Globals.usuario.setnombre(value: user["first_name"].stringValue)
                    Globals.usuario.setapellido(value: user["last_name"].stringValue)
                    Globals.usuario.setcorreo(value: user["email"].stringValue)
                    Globals.usuario.settoken(value: json!["token"].stringValue)
                    Globals.usuario.saveSession()
                    
                    //changing view controller
                    
                    if var array = self.tabBarController?.viewControllers {
                        array.remove(at: 2)
                        
                        let vc4 = UIStoryboard(name: "Login", bundle: nil).instantiateViewController(withIdentifier: "inicio")
                        vc4.view.backgroundColor = UIColor.white
                        vc4.tabBarItem.image = #imageLiteral(resourceName: "round-account-button-with-user-inside (1)").withRenderingMode(UIImageRenderingMode.alwaysOriginal)
                        vc4.tabBarItem.selectedImage = #imageLiteral(resourceName: "round-account-button-with-user-inside").withRenderingMode(UIImageRenderingMode.alwaysOriginal)
                        vc4.tabBarItem.title = "Mi cuenta"
                        
                        array.append(vc4)
                        self.tabBarController?.viewControllers = array
                    }
                }else {
                    self.showAlert(title: "Ocurrio algo", message: json!.description)
                }
                
            }
        }
    }
    
    @IBAction func FORGOT(_ sender: Any) {
        let alert = UIAlertController(title: "Ayuda", message: "Ingresa tu correo", preferredStyle: UIAlertControllerStyle.alert)
        let action = UIAlertAction(title: "OK", style: .default) { (alertAction) in
            let textField = alert.textFields![0] as UITextField
            guard let text = textField.text, text != "" else {
                return 
            }
            ApiService.sharedInstance.forgot(email: text, { (err, statusCode, json) in
                if let error = err {
                    self.showAlert(title: "Error", message: error.localizedDescription)
                }else {
                    self.showAlert(title: "Exitoso", message: json!.description)
                }
            })
            
        }
        
        alert.addTextField { (textField) in
            textField.placeholder = "Correo"
        }
        
        alert.addAction(action)
        self.present(alert, animated: true) {
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

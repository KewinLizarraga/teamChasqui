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
                self.showAlert(title: "Exitoso", message: json!.description)
            }
        }
    }
    
    @IBAction func FORGOT(_ sender: Any) {
        let alert = UIAlertController(title: "Ayuda", message: "Ingresa tu correo", preferredStyle: UIAlertControllerStyle.alert)
        let action = UIAlertAction(title: "OK", style: .default) { (alertAction) in
            let textField = alert.textFields![0] as UITextField
            guard let text = textField.text, text != "" else {
                
                if var array = self.tabBarController?.viewControllers {
                    array.remove(at: 2)
                    array.append(UIViewController())
                    self.tabBarController?.viewControllers = array
                }
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

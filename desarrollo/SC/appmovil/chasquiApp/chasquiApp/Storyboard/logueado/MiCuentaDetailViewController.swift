//
//  MiCuentaDetailViewController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/26/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class MiCuentaDetailViewController: UIViewController {

    @IBOutlet weak var lastName: UILabel!
    @IBOutlet weak var name: UILabel!
    
    
    @IBOutlet weak var email: UILabel!
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        lastName.text = Globals.usuario.getapellido()
        name.text = Globals.usuario.getnombre()
        email.text = Globals.usuario.getcorreo()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
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

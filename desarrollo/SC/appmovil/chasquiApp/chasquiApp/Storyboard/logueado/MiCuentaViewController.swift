//
//  MiCuentaViewController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/26/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class MiCuentaViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate  {

    @IBOutlet weak var imagePerfil: UIImageView!
    
    @IBOutlet weak var completeName: UILabel!
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        imagePerfil.layer.cornerRadius = imagePerfil.bounds.width / 2.0
        imagePerfil.layer.masksToBounds = true
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let tap = UITapGestureRecognizer(target: self, action: #selector(imageTapped))
        imagePerfil.addGestureRecognizer(tap)
        imagePerfil.isUserInteractionEnabled = true
        
        
        completeName.text = Globals.usuario.getnombre() + " " + Globals.usuario.getapellido()
        
        // Do any additional setup after loading the view.
    }

    //MARK: Handle Image
    
    @objc private func imageTapped() {
        print("tapped")
        let imagePickerController = UIImagePickerController()
        imagePickerController.delegate = self
        imagePickerController.allowsEditing = true
        let actionSheet = UIAlertController(title: "", message: "Elije una opción", preferredStyle: .actionSheet)
        let camera = UIAlertAction(title: "Cámara", style: .default) { (action) in
            if UIImagePickerController.isSourceTypeAvailable(.camera) {
                imagePickerController.sourceType = .camera
                self.present(imagePickerController, animated: true, completion: nil)
            }else {
                print("problems with the camera")
            }
        }
        let library = UIAlertAction(title: "Librería de fotos", style: .default) { (action) in
            imagePickerController.sourceType = .photoLibrary
            self.present(imagePickerController, animated: true, completion: nil)
        }
        let cancel = UIAlertAction(title: "Cancelar", style: .cancel, handler: nil)
        actionSheet.addAction(camera)
        actionSheet.addAction(library)
        actionSheet.addAction(cancel)
        self.present(actionSheet, animated: true, completion: nil)
    }
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        var selectedImage: UIImage?
        if let editedImage = info[UIImagePickerControllerEditedImage] as? UIImage {
            selectedImage = editedImage
        }else if let originalImage = info[UIImagePickerControllerOriginalImage] as? UIImage{
            selectedImage = originalImage
        }
        if let image = selectedImage {
            self.imagePerfil.image = image
            picker.dismiss(animated: true, completion: nil)
        }
        picker.dismiss(animated: true, completion: nil)
        
    }
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true, completion: nil)
    }
    

    @IBAction func logOut(_ sender: Any) {
        Globals.usuario.logout()
        if var array = self.tabBarController?.viewControllers {
            array.remove(at: 2)
            
            let vc4 = UIStoryboard(name: "Login", bundle: nil).instantiateInitialViewController()!
            vc4.view.backgroundColor = UIColor.white
            vc4.tabBarItem.image = #imageLiteral(resourceName: "round-account-button-with-user-inside (1)").withRenderingMode(UIImageRenderingMode.alwaysOriginal)
            vc4.tabBarItem.selectedImage = #imageLiteral(resourceName: "round-account-button-with-user-inside").withRenderingMode(UIImageRenderingMode.alwaysOriginal)
            vc4.tabBarItem.title = "Mi cuenta"
            
            array.append(vc4)
            self.tabBarController?.viewControllers = array
        }
        
        
        
    }
    
    

    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    

}

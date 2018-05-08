//
//  CustomTabBarController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/8/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class CustomTabBarController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()
        configureTabBar()
        setupViewControllers()
    }
    
    fileprivate func configureTabBar() {
        self.view.backgroundColor = UIColor.white
        self.tabBar.isTranslucent = true
        self.tabBar.tintColor = UIColor.black
        self.tabBar.barTintColor = UIColor.lightGray
    }
    
    //MARK: Setup View Controllers
    
    private func setupViewControllers() {
        
        let vc1 = UINavigationController(rootViewController: HomeController())
        vc1.view.backgroundColor = UIColor.white
        vc1.tabBarItem.image = #imageLiteral(resourceName: "home").withRenderingMode(UIImageRenderingMode.alwaysOriginal)
        vc1.tabBarItem.selectedImage = #imageLiteral(resourceName: "home (1)").withRenderingMode(UIImageRenderingMode.alwaysOriginal)
        vc1.tabBarItem.title = "Home"
        
        let vc2 = UIViewController()
        vc2.view.backgroundColor = UIColor.white
        vc2.tabBarItem.image = #imageLiteral(resourceName: "facebook-placeholder-for-locate-places-on-maps").withRenderingMode(UIImageRenderingMode.alwaysOriginal)
        vc2.tabBarItem.selectedImage = #imageLiteral(resourceName: "facebook-placeholder-for-locate-places-on-maps (1)").withRenderingMode(UIImageRenderingMode.alwaysOriginal)
        vc2.tabBarItem.title = "Mi ubicacion"
        

        let vc4 = UIViewController()
        vc4.view.backgroundColor = UIColor.white
        vc4.tabBarItem.image = #imageLiteral(resourceName: "round-account-button-with-user-inside (1)").withRenderingMode(UIImageRenderingMode.alwaysOriginal)
        vc4.tabBarItem.selectedImage = #imageLiteral(resourceName: "round-account-button-with-user-inside").withRenderingMode(UIImageRenderingMode.alwaysOriginal)
        vc4.tabBarItem.title = "Mi cuenta"
        
        self.viewControllers = [vc1,vc2,vc4]
        
    }
}

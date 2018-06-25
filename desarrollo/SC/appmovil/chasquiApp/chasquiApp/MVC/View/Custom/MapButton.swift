//
//  MapButton.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/12/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class MapButton: UIButton {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = UIColor.white
        self.contentMode = UIViewContentMode.scaleAspectFill
        self.setImage(#imageLiteral(resourceName: "map").withRenderingMode(UIImageRenderingMode.alwaysOriginal), for: UIControlState.normal)
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

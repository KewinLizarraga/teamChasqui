//
//  Fonts.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/9/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class Font {
    
    enum FontName {
        
        case regular,semibold
        
        var description: String {
            switch self {
            case .regular:
                return "AvenirNext-Regular"
            case .semibold:
                return "AvenirNext-DemiBold"
            }
        }
    }
    
    static func customFont(type: FontName, _ size: CGFloat) -> UIFont {
        return UIFont(name: type.description, size: size)!
    }
    
}

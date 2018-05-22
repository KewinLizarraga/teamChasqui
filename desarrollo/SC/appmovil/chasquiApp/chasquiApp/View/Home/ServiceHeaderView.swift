//
//  ServiceHeaderView.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/22/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class ServiceHeaderView: GenericCell<Any> {
    
    override var item: Any! {
        didSet {
            updateUI()
        }
    }
    
    override func updateUI() {
        categoryName.text = item as? String
    }
    
    //MARK: - Components
    
    let categoryName: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.left
        label.font = Font.customFont(type: Font.FontName.semibold, 18)
        return label
    }()
    
    override func setupViews() {
        
        
        addSubview(categoryName)
        categoryName.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview()
            make.leading.equalToSuperview().inset(15)
        }
        
    }
    
}

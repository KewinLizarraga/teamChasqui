//
//  RecentsHeaderView.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/5/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class RecentsHeaderView: GenericCell<String> {
    
    override var item: String! {
        didSet {
            updateUI()
        }
    }
    
    override func updateUI() {
        categoryName.text = item
    }
    
    //MARK: - Components
    
    let categoryName: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.left
        label.textColor = UIColor.lightGray
        label.font = Font.customFont(type: Font.FontName.regular, 10)
        return label
    }()
    
    override func setupViews() {
        
        contentView.addSubview(categoryName)
        categoryName.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview()
            make.leading.equalToSuperview().offset(15)
        }
        
    }
    
}


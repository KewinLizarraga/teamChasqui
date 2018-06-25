//
//  RecentCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/5/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class RecentCell: GenericCell<Place> {
    
    override var item: Place! {
        didSet {
            updateUI()
        }
    }
    
    override func updateUI() {
        recentName.text = item.city + "," + item.country
    }
    
    //MARK: - Components
    
    let recentName: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.center
        label.font = Font.customFont(type: Font.FontName.semibold, 14)
        return label
    }()
    
    //MARK: - Setup views
    
    override func setupViews() {
        
        contentView.addSubview(recentName)
        recentName.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(15)
            make.centerY.equalToSuperview()
        }
        
        
        
    }
    
}


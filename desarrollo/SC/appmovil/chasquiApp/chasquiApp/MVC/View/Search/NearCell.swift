//
//  NearCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/5/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class NearCell: GenericCell<String> {
    
    override var item: String! {
        didSet {
            updateUI()
        }
    }
    
    override func updateUI() {
        recentName.text = item
    }
    
    //MARK: - Components
    
    let compassImage: UIImageView = {
        let imageView = UIImageView(image: UIImage(named: "compass"))
        imageView.contentMode = .scaleAspectFit
        return imageView
    }()
    
    
    let recentName: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.center
        label.font = Font.customFont(type: Font.FontName.semibold, 14)
        return label
    }()
    
    //MARK: - Setup views
    
    override func setupViews() {
        
        contentView.addSubview(compassImage)
        compassImage.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(15)
            make.centerY.equalToSuperview()
            make.size.equalTo(CGSize(width: 10, height: 10))
        }
        
        contentView.addSubview(recentName)
        recentName.snp.makeConstraints { (make) in
            make.leading.equalTo(compassImage.snp.trailing).offset(10)
            make.centerY.equalToSuperview()
        }
        
        
        
    }
    
}

//
//  CustomSearchBar.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/22/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class CustomSearchBar: UIButton {
    
    let searchIcon: UIImageView = {
        let imageView = UIImageView(image: UIImage(named: "search"))
        imageView.contentMode = UIViewContentMode.scaleAspectFit
        return imageView
    }()
    
    let placeHolder: UILabel = {
        let label = UILabel()
        label.font = Font.customFont(type: Font.FontName.regular, 13)
        label.text = "Escribe un lugar..."
        return label
    }()
    
    override func layoutSubviews() {
        super.layoutSubviews()
        layer.cornerRadius = 10
        layer.shadowColor = UIColor(hexString: "D8D3D3").cgColor
        layer.shadowOffset = CGSize(width: 0, height: 5)
        layer.shadowRadius = 25
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = UIColor.white
        
        addSubview(searchIcon)
        searchIcon.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview()
            make.leading.equalToSuperview().offset(15)
            make.size.equalTo(CGSize(width: 16, height: 16))
        }
        
        addSubview(placeHolder)
        placeHolder.snp.makeConstraints { (make) in
            make.leading.equalTo(searchIcon.snp.trailing).offset(15)
            make.centerY.equalToSuperview()
        }
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    
    
}

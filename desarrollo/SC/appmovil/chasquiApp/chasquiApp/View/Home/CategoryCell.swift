//
//  CategoryCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/9/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class CategoryCell: GenericCell<Category> {
    
    override var item: Category! {
        didSet {
            updateUI()
        }
    }
    
    override func updateUI() {
        categoryName.text = item.name
        categoryImage.image = item.categoryImage
    }
    
    //MARK: - Components
    
    let categoryImage: UIImageView = {
        let view = UIImageView()
        view.contentMode = UIViewContentMode.scaleAspectFit
        return view
    }()
    
    let categoryName: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.center
        label.font = Font.customFont(type: Font.FontName.regular, 11)
        return label
    }()
    
    //MARK: - Setup views
    
    override func setupViews() {
        contentView.addSubview(categoryImage)
        categoryImage.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.size.equalTo(CGSize(width: 24, height: 24))
            make.bottom.equalTo(self.snp.centerY).offset(-5)
        }
        
        contentView.addSubview(categoryName)
        categoryName.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.leading.trailing.equalToSuperview().inset(5)
            make.top.equalTo(self.snp.centerY).offset(5)
        }
        
    }
    
}

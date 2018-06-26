//
//  ServiceFooterView.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/26/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class ServiceFooterView: GenericCell<String> {
    
    override var item: String! {
        didSet {
            updateUI()
        }
    }
    
    override func updateUI() {
        moreButton.setTitle(item, for: UIControlState.normal)
        addCommentButton.setTitle("Escribir un comentario", for: .normal)
    }
    
    //MARK: - Components
    
    lazy var moreButton: UIButton = {
        let button = UIButton()
        button.contentHorizontalAlignment = .left
        button.setTitleColor(UIColor.black, for: UIControlState.normal)
        button.titleLabel?.font = Font.customFont(type: Font.FontName.regular, 16)
        return button
    }()
    
    lazy var addCommentButton: UIButton = {
        let button = UIButton()
        button.contentHorizontalAlignment = .left
        button.setTitleColor(UIColor.blue, for: UIControlState.normal)
        button.titleLabel?.font = Font.customFont(type: Font.FontName.semibold, 16)
        return button
    }()
    
    let nextImage: UIImageView = {
        let view = UIImageView()
        view.contentMode = UIViewContentMode.scaleAspectFill
        view.clipsToBounds = true
        view.image = UIImage(named: "next")
        return view
    }()
    
    override func setupViews() {
        clipsToBounds = true
        
        
        contentView.addSubview(moreButton)
        moreButton.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview().inset(15)
            make.top.equalToSuperview()
            make.height.equalToSuperview().multipliedBy(0.5)
        }
        
        contentView.addSubview(nextImage)
        nextImage.snp.makeConstraints { (make) in
            make.centerY.equalTo(moreButton)
            make.trailing.equalToSuperview().offset(-15)
            make.size.equalTo(CGSize(width: 20, height: 20))
        }
        
        contentView.addSubview(addCommentButton)
        addCommentButton.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview().inset(15)
            make.top.equalTo(moreButton.snp.bottom)
            make.height.equalToSuperview().multipliedBy(0.5)
        }
        
    }
    
}


//
//  ServiceCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/10/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import Cosmos

class ServiceCell: GenericCell<Service> {
    
    override var item: Service! {
        didSet {
            updateUI()
        }
    }
    
    override func updateUI() {
        serviceName.text = item.name
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        layer.cornerRadius = 10
        layer.masksToBounds = true
    }
    //MARK: - Components
    
    let serviceImage: UIImageView = {
        let view = UIImageView()
        view.image = UIImage(named: "service")
        view.contentMode = UIViewContentMode.scaleAspectFill
        return view
    }()
    
    let serviceName: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.left
        label.font = Font.customFont(type: Font.FontName.regular, 12)
        return label
    }()
    
    let rate: CosmosView = {
        let view = CosmosView()
        view.settings.updateOnTouch = false
        view.settings.starSize = 15
        view.rating = 4
        view.settings.totalStars = 5
        view.settings.filledColor = Colors.dorado
        return view
    }()
    
    let review_count: UILabel = {
        let label = UILabel()
        label.textAlignment = NSTextAlignment.left
        label.text = "(6000)"
        label.font = Font.customFont(type: Font.FontName.regular, 14)
        return label
    }()
    
    
    override func setupViews() {
        super.setupViews()
        
        backgroundColor = UIColor.white
        
        addSubview(serviceImage)
        serviceImage.snp.makeConstraints { (make) in
            make.top.centerX.width.equalToSuperview()
            make.height.equalTo(serviceImage.snp.width).multipliedBy(0.5)
        }
        
        addSubview(serviceName)
        serviceName.snp.makeConstraints { (make) in
            make.top.equalTo(serviceImage.snp.bottom).offset(15)
            make.leading.equalToSuperview().offset(15)
        }
        
        addSubview(rate)
        rate.snp.makeConstraints { (make) in
            make.leading.equalTo(serviceName)
            make.top.equalTo(serviceName.snp.bottom).offset(15)
            make.size.equalTo(CGSize(width: 85, height: 10))
        }
        
        addSubview(review_count)
        review_count.snp.makeConstraints { (make) in
            make.leading.equalTo(rate.snp.trailing).offset(15)
            make.centerY.equalTo(rate)
        }
    }
    
}


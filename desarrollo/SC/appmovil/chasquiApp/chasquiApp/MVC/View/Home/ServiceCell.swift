//
//  ServiceCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/10/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import Cosmos
import SDWebImage

class ServiceCell: GenericCell<Service> {
    
    override var item: Service! {
        didSet {
            updateUI()
        }
    }
    
    override func updateUI() {
        serviceName.text = item.name
        rate.rating = item.stars
        review_count.text = String(item.review_count) + " Reviews"
        if let str = item.photos.first {
            let url = URL(string: str)
            serviceImage.sd_setImage(with: url, completed: nil)
        }
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        layer.cornerRadius = 10
        layer.masksToBounds = true
    }
    
    
    //MARK: - Components
    
    let serviceImage: UIImageView = {
        let view = UIImageView()
        view.contentMode = UIViewContentMode.scaleAspectFill
        view.clipsToBounds = true
        return view
    }()
    
    let serviceName: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.left
        label.font = Font.customFont(type: Font.FontName.regular, 15)
        label.sizeToFit()
        return label
    }()
    
    let rate: CosmosView = {
        let view = CosmosView()
        view.settings.updateOnTouch = false
        view.settings.starSize = 12
        view.rating = 0
        view.settings.fillMode = .precise
        view.settings.totalStars = 5
        view.settings.filledColor = Colors.dorado
        return view
    }()
    
    let review_count: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.left
        label.text = "(6000)"
        label.font = Font.customFont(type: Font.FontName.regular, 10)
        return label
    }()
    
    
    //MARK: - Setup Views
    
    override func setupViews() {
        
        backgroundColor = UIColor.white
        
        contentView.addSubview(serviceImage)
        serviceImage.snp.makeConstraints { (make) in
            make.top.centerX.width.equalToSuperview()
            make.height.equalTo(serviceImage.snp.width).multipliedBy(3.0/4)
        }
        
        contentView.addSubview(serviceName)
        serviceName.snp.makeConstraints { (make) in
            make.top.equalTo(serviceImage.snp.bottom).offset(10)
            make.leading.equalToSuperview().offset(10)
        }
        
        contentView.addSubview(rate)
        rate.snp.makeConstraints { (make) in
            make.leading.equalTo(serviceName)
            make.top.equalTo(serviceName.snp.bottom).offset(5)
            make.size.equalTo(CGSize(width: 85, height: 10))
        }
        
        contentView.addSubview(review_count)
        review_count.snp.makeConstraints { (make) in
            make.leading.equalTo(rate.snp.trailing).offset(3)
            make.trailing.equalToSuperview().offset(-3)
            make.centerY.equalTo(rate)
        }
    }
    
}


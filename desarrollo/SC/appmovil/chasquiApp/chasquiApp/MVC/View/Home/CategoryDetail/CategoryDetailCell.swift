//
//  CategoryDetailCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/12/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import Cosmos

class CategoryDetailCell: GenericCell<Service> {
    
    override var item: Service! {
        didSet {
            updateUI()
        }
    }
    
    override func updateUI() {
        serviceName.text = item.name
        rate.rating = item.stars
        review_count.text = String(item.review_count) + " Reviews"
        servicePrice.text = item.price.average.solesString
        if let str = item.photos.first {
            let url = URL(string: str)
            serviceImage.sd_setImage(with: url, completed: nil)
        }
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        clipsToBounds = true
        serviceImage.layer.cornerRadius = 5
        serviceImage.layer.masksToBounds = true

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
        label.font = Font.customFont(type: Font.FontName.semibold, 20)
        label.sizeToFit()
        return label
    }()
    
    let rate: CosmosView = {
        let view = CosmosView()
        view.settings.updateOnTouch = false
        view.settings.starSize = 15
        view.rating = 0
        view.settings.fillMode = .precise
        view.settings.totalStars = 5
        view.settings.filledColor = Colors.dorado
        return view
    }()
    
    let review_count: UILabel = {
        let label = UILabel()
        label.textAlignment = NSTextAlignment.left
        label.text = "(6000)"
        label.font = Font.customFont(type: Font.FontName.regular, 15)
        return label
    }()
    
    let servicePrice: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.left
        label.font = Font.customFont(type: Font.FontName.regular, 18)
        label.sizeToFit()
        return label
    }()
    
    override func setupViews() {
        
        let line1 = UIView()
        line1.backgroundColor = UIColor.lightGray
        contentView.addSubview(line1)
        line1.snp.makeConstraints { (make) in
            make.leading.trailing.top.equalToSuperview()
            make.height.equalTo(0.5)
        }
        
        let line2 = UIView()
        line2.backgroundColor = UIColor.lightGray
        contentView.addSubview(line2)
        line2.snp.makeConstraints { (make) in
            make.leading.trailing.bottom.equalToSuperview()
            make.height.equalTo(1)
        }

        
        let insetView = UIView()
        contentView.addSubview(insetView)
        insetView.snp.makeConstraints { (make) in
            make.edges.equalToSuperview().inset(10)
        }
        
        
        insetView.addSubview(serviceImage)
        serviceImage.snp.makeConstraints { (make) in
            make.leading.top.height.equalToSuperview()
            make.width.equalTo(serviceImage.snp.height)
        }
        
        insetView.addSubview(serviceName)
        serviceName.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview().multipliedBy(0.5)
            make.leading.equalTo(serviceImage.snp.trailing).offset(10)
        }
        
        insetView.addSubview(rate)
        rate.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview().multipliedBy(1)
            make.leading.equalTo(serviceName)
            make.size.equalTo(CGSize(width: 100, height: 15))
        }
        
        insetView.addSubview(review_count)
        review_count.snp.makeConstraints { (make) in
            make.centerY.equalTo(rate)
            make.leading.equalTo(rate.snp.trailing).offset(5)
        }
        
        insetView.addSubview(servicePrice)
        servicePrice.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview().multipliedBy(1.5)
            make.leading.equalTo(serviceName)
        }
        
    }
}

//
//  TitleOfServiceCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/8/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import Cosmos

class TitleOfServiceCell: GenericCell<Service> {
    
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
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        clipsToBounds = true
        let layer = CALayer()
        layer.frame = CGRect(x: 0, y: bounds.height - 1, width: bounds.width, height: 0.5)
        layer.borderColor = UIColor.lightGray.cgColor
        layer.borderWidth = 0.5
        self.layer.addSublayer(layer)
        
        bookButton.layer.cornerRadius = bookButton.bounds.height / 2
        bookButton.layer.masksToBounds = true
    }
    
    //MARK: - Components
    
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
        view.settings.totalStars = 5
        view.settings.fillMode = .precise
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
    
    let bookButton: RoundedButton = {
        let button = RoundedButton()
        button.setTitle("Reservar", for: UIControlState.normal)
        button.backgroundColor = Colors.dorado
        return button
    }()
    
    //MARK: - Setup Views
    
    override func setupViews() {
        
        backgroundColor = UIColor.white
        
        contentView.addSubview(serviceName)
        serviceName.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(15)
            make.leading.equalToSuperview().offset(15)
        }
        
        contentView.addSubview(rate)
        rate.snp.makeConstraints { (make) in
            make.leading.equalTo(serviceName)
            make.top.equalTo(serviceName.snp.bottom).offset(5)
            make.size.equalTo(CGSize(width: 100, height: 15))
        }
        
        contentView.addSubview(review_count)
        review_count.snp.makeConstraints { (make) in
            make.leading.equalTo(rate.snp.trailing).offset(5)
            make.centerY.equalTo(rate)
        }
        
        contentView.addSubview(servicePrice)
        servicePrice.snp.makeConstraints { (make) in
            make.leading.equalTo(serviceName)
            make.top.equalTo(rate.snp.bottom).offset(5)
            
        }
        
        contentView.addSubview(bookButton)
        bookButton.snp.makeConstraints { (make) in
            make.trailing.equalToSuperview().offset(-15)
            make.bottom.equalToSuperview().inset(8)
            make.size.equalTo(CGSize(width: 120, height: 40))
        }
        
        
        
    }
    
}



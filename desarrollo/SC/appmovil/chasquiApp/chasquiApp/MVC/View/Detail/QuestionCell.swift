//
//  QuestionCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/27/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import MapKit
import Cosmos

class QuestionCell: GenericCell<Question> {
    
    override var item: Question! {
        didSet {
            updateUI()
        }
    }
    
    fileprivate static let font = Font.customFont(type: Font.FontName.regular, 13)
    
    fileprivate static let insets = UIEdgeInsets(top: 70, left: 15, bottom: 8, right: 10)
    
    static var singleLineHeight: CGFloat {
        return font.lineHeight + insets.top + insets.bottom
    }
    
    static func textHeight(_ text: String, width: CGFloat) -> CGFloat {
        let constrainedSize = CGSize(width: width - insets.left - insets.right, height: CGFloat.greatestFiniteMagnitude)
        let attributes = [ NSAttributedStringKey.font: font ]
        let options: NSStringDrawingOptions = [.usesFontLeading, .usesLineFragmentOrigin]
        let bounds = (text as NSString).boundingRect(with: constrainedSize, options: options, attributes: attributes, context: nil)
        return ceil(bounds.height) + insets.top + insets.bottom
    }
    
    override func updateUI() {
        title.text = "\""  + item.message + "\""
        userImage.image = UIImage(named: "harry")
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        userImage.layer.cornerRadius = userImage.bounds.height / 2.0
        userImage.layer.masksToBounds = true
        clipsToBounds = true
        
        let layer = CALayer()
        layer.frame = CGRect(x: 10, y: bounds.height - 1, width: bounds.width - 10, height: 0.5)
        layer.borderColor = UIColor.lightGray.cgColor
        layer.borderWidth = 0.5
        self.layer.addSublayer(layer)
        
    }
    
    override func setupViews() {
        
        contentView.addSubview(userImage)
        userImage.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(15)
            make.top.equalToSuperview().offset(8)
            make.size.equalTo(CGSize(width: 50, height: 50))
        }
        
        contentView.addSubview(title)
        title.snp.makeConstraints { (make) in
            make.top.equalTo(userImage)
            make.leading.equalTo(userImage.snp.trailing).offset(10)
            make.trailing.equalToSuperview().inset(10)
        }
    }
    
    //MARK: - Components
    
    let userImage: UIImageView = {
        let view = UIImageView()
        view.contentMode = UIViewContentMode.scaleAspectFill
        view.clipsToBounds = true
        return view
    }()
    
    let title: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.left
        label.font = Font.customFont(type: Font.FontName.regular, 14)
        label.sizeToFit()
        return label
    }()
    
    
    
    
}

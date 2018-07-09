//
//  MessageCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 7/9/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class MessageCell: GenericCell<Message> {
    
    override var item: Message! {
        didSet {
            updateUI()
        }
    }
    
    fileprivate static let font = Font.customFont(type: Font.FontName.regular, 12)
    
    fileprivate static let insets = UIEdgeInsets(top: 8, left: 10, bottom: 8, right: 10)
    
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
        title.text = item.message
        if item.from == Globals.usuario.getId() {
            backgroundColor = UIColor.blue
            title.textColor = UIColor.white
        }else {
            backgroundColor = UIColor.lightGray.withAlphaComponent(0.2)
        }
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
    }
    
    override func setupViews() {
    
        contentView.addSubview(title)
        title.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview().inset(MessageCell.insets.top)
            make.leading.trailing.equalToSuperview().inset(MessageCell.insets.left)
        }
    }
    
    //MARK: - Components
    
    let title: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.left
        label.font = MessageCell.font
        label.sizeToFit()
        return label
    }()
    
    
    
    
}

//
//  SendView.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 7/9/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class SendView: UIView {
    
    
    let bodyTV: UITextView = {
        let tf = UITextView()
        tf.backgroundColor = UIColor.lightGray.withAlphaComponent(0.2)
        tf.autocorrectionType = .no
        tf.spellCheckingType = .no
        return tf
    }()
    
    lazy var sendButton: UIButton = {
        let button = UIButton()
        button.setImage(UIImage(named: "send"), for: UIControlState.normal)
        let inset: CGFloat = 5.0
        button.imageEdgeInsets = UIEdgeInsetsMake(inset, inset, inset, inset)
        button.clipsToBounds = true
        return button
    }()
    
    override func layoutSubviews() {
        super.layoutSubviews()
        bodyTV.layer.cornerRadius = bodyTV.bounds.height / 2
        bodyTV.layer.masksToBounds = true
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        
        addSubview(sendButton)
        sendButton.snp.makeConstraints { (make) in
            make.trailing.equalToSuperview().offset(-15)
            make.centerY.equalToSuperview()
            make.size.equalTo(CGSize(width: 30, height: 30))
        }
        
        addSubview(bodyTV)
        bodyTV.snp.makeConstraints { (make) in
            make.trailing.equalTo(sendButton.snp.leading).offset(-10)
            make.leading.equalToSuperview().offset(15)
            make.centerY.height.equalToSuperview()
        }
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}

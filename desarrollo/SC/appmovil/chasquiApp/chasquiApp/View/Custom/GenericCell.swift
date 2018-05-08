//
//  GenericCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 5/4/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit

class GenericCell<Item> : UICollectionViewCell {
    
    var item: Item! {
        didSet {
            updateUI()
        }
    }
    
    
    func updateUI() {
        
    }
    
    
    func setupViews() {
        
    }
    
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}







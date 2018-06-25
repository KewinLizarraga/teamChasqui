//
//  ImageCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/8/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import SDWebImage

class ImageCell: GenericCell<String> {
    
    override var item: String! {
        didSet {
            updateUI()
        }
    }
    
    override func updateUI() {
        let url = URL(string: item)
        serviceImage.sd_setImage(with: url) { (image, err, _, url) in
            if let img = image {
                print("image is",img)
            }
            if let error = err {
                print("error is",error)
            }
            if let urls = url {
                print("url is",urls)
            }
        }
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
    }
    
    //MARK: - Components
    
    let serviceImage: UIImageView = {
        let view = UIImageView()
        view.contentMode = UIViewContentMode.scaleAspectFill
        view.clipsToBounds = true
        return view
    }()
    
    
    //MARK: - Setup views
    
    override func setupViews() {
        
        backgroundColor = UIColor.white
        
        contentView.addSubview(serviceImage)
        serviceImage.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
       
        
        
        
    }
    
}


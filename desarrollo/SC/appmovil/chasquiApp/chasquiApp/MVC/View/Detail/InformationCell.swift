//
//  InformationCell.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/8/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import MapKit

class InformationCell: GenericCell<Info> {
    
    fileprivate static let font = Font.customFont(type: Font.FontName.regular, 14)
    
    fileprivate static let insets = UIEdgeInsets(top: 8, left: 45, bottom: 8, right: 10)
    
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
    
    override var item: Info! {
        didSet {
            updateUI()
        }
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        clipsToBounds = true
        let layer = CALayer()
        layer.frame = CGRect(x: 10, y: bounds.height - 1, width: bounds.width - 10, height: 0.5)
        layer.borderColor = UIColor.lightGray.cgColor
        layer.borderWidth = 0.5
        self.layer.addSublayer(layer)
    }
    
    override func updateUI() {
        switch item.type {
        case .address,.phone,.web:
            
            contentView.addSubview(informationImage)
            informationImage.snp.makeConstraints { (make) in
                make.leading.equalToSuperview().offset(15)
                make.centerY.equalToSuperview()
                make.size.equalTo(CGSize(width: 20, height: 20))
            }
            
            
            contentView.addSubview(informationName)
            informationName.snp.makeConstraints { (make) in
                make.leading.equalTo(informationImage.snp.trailing).offset(10)
                make.trailing.equalToSuperview().offset(-10)
                make.top.bottom.equalToSuperview().inset(8)
            }
            
        default:
            contentView.addSubview(mapView)
            mapView.snp.makeConstraints { (make) in
                make.top.leading.equalToSuperview().offset(10)
                make.bottom.trailing.equalToSuperview().offset(-10)
            }
            
        }
        
        switch item.type {
        case .address:
            informationName.text = (item.name as? Address)?.togetherInfo
            informationImage.image = #imageLiteral(resourceName: "facebook-placeholder-for-locate-places-on-maps (1)")
        case .web:
            informationName.text = "Visitar el sitio web"
            informationImage.image = #imageLiteral(resourceName: "web")
        case .phone:
            informationName.text = item.name as? String
            informationImage.image = #imageLiteral(resourceName: "phone")
        default:
            let annotation = MKPointAnnotation()
            if let geo = item.name as? GeoLocation {
                let coord = CLLocationCoordinate2DMake(geo.lat,geo.lng)
                annotation.coordinate = coord
                self.mapView.addAnnotation(annotation)
                let coordinateRegion = MKCoordinateRegionMakeWithDistance(coord, 500, 500)
                mapView.setRegion(coordinateRegion, animated: true)

            }
        }
        
        
        
    }
    
    //MARK: - Components
    
    let informationImage: UIImageView = {
        let view = UIImageView()
        view.contentMode = UIViewContentMode.scaleAspectFit
        return view
    }()
    
    let informationName: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = NSTextAlignment.left
        label.font = InformationCell.font
        return label
    }()
    
    lazy var mapView: MKMapView = {
        let view = MKMapView()
        view.isScrollEnabled = false
        view.isZoomEnabled = false
        view.isRotateEnabled = false
        view.isUserInteractionEnabled = false
        return view
    }()
    
    //MARK: - Setup views
    
    override func setupViews() {
        
    }
    
}

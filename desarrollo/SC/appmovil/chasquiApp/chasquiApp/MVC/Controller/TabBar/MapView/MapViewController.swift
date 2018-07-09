//
//  MapViewController.swift
//  chasquiApp
//
//  Created by Gonzalo Toledo Aranguren on 6/5/18.
//  Copyright © 2018 Gonzalo Toledo Aranguren. All rights reserved.
//

import UIKit
import MapKit
import CoreLocation
import SocketIO
import SwiftyTimer

class MapViewController: UIViewController {
    
    //Socket.IO
    let manager = SocketManager(socketURL: URL(string: "http://206.189.175.34:8000")!, config: [.log(true), .compress])
    var socket: SocketIOClient!
    
    var locationManager: CLLocationManager?
    var mapView: MKMapView! = {
        let view = MKMapView()
        return view
    }()
    
    lazy var myLocationButton: RoundedButton = {
        let button = RoundedButton()
        button.setImage(UIImage(named: "compass"), for: .normal)
        button.imageEdgeInsets = UIEdgeInsetsMake(12, 12, 12, 12)
        button.backgroundColor = UIColor.white
        button.addTarget(self, action: #selector(myLocationPressed), for: UIControlEvents.touchUpInside)
        return button
    }()
    
    lazy var shareButton: RoundedButton = {
        let button = RoundedButton()
        button.setTitle("Compartir ubicacion", for: UIControlState.normal)
        button.backgroundColor = UIColor.blue
        button.addTarget(self, action: #selector(sharePressed), for: UIControlEvents.touchUpInside)
        return button
    }()
    
    lazy var shareLinkButton: RoundedButton = {
        let button = RoundedButton()
        button.setImage(UIImage(named: "share-symbol"), for: .normal)
        button.imageEdgeInsets = UIEdgeInsetsMake(12, 12, 12, 12)
        button.backgroundColor = UIColor.white
        button.addTarget(self, action: #selector(shareLinkPressed), for: UIControlEvents.touchUpInside)
        button.isHidden = true
        return button
    }()
    
    @objc func shareLinkPressed() {
        let firstActivityItem = "Hola estoy compartiendo mi ubicación contigo "
        let secondActivityItem : NSURL = NSURL(string: "http://206.189.175.34:3000/maps/\(Globals.path_id)")!

        
        let activityViewController : UIActivityViewController = UIActivityViewController(
            activityItems: [firstActivityItem, secondActivityItem], applicationActivities: nil)
        
        
        
        // Anything you want to exclude
        activityViewController.excludedActivityTypes = [
            UIActivityType.postToWeibo,
            UIActivityType.print,
            UIActivityType.assignToContact,
            UIActivityType.saveToCameraRoll,
            UIActivityType.addToReadingList,
            UIActivityType.postToFlickr,
            UIActivityType.postToVimeo,
            UIActivityType.postToTencentWeibo
        ]
        
        self.present(activityViewController, animated: true, completion: nil)
    }
    
    @objc func myLocationPressed() {
        let locations = mapView.userLocation.coordinate
        mapView.setCenter(locations, animated: true)
    }
    var sharing = false
    
    var timer = Timer()
    
    @objc func sharePressed(button: UIButton) {
        if Globals.usuario.getisSession() == false {
            self.showAlert(title: "Informacion", message: "Usted necesita tener una cuenta para realizar esta operacion")
            return
        }else {
            if sharing{
                timer.invalidate()
                //UI update
                self.sharing = !self.sharing
                button.backgroundColor = self.sharing ? UIColor.red : UIColor.blue
                button.setTitle((self.sharing ? "Compartiendo..." : "Compartir ubicacion"), for: UIControlState.normal)
                shareLinkButton.isHidden = true
                
                
            }else {
                ApiService.sharedInstance.getPathID { (err, statusCode, json) in
                    if let error = err {
                        print("error getting path ID",error)
                    }else {
                        print(json!)
                        
                        //UI update
                        self.sharing = !self.sharing
                        button.backgroundColor = self.sharing ? UIColor.red : UIColor.blue
                        button.setTitle((self.sharing ? "Compartiendo..." : "Compartir ubicacion"), for: UIControlState.normal)
                        self.shareLinkButton.isHidden = false
                        
                        //Share position
                        let path_id = json!["_id"].stringValue
                        Globals.path_id = path_id
                        self.setSocketEvents(path_id: path_id)
                        
                        
                        self.timer = Timer.new(every: 3, {
                            let parameters: [String:Any] = [
                                "direction_id":path_id,
                                "lat": self.mapView.userLocation.coordinate.latitude,
                                "lng": self.mapView.userLocation.coordinate.longitude
                            ]
                            ApiService.sharedInstance.sendLocations(parameters: parameters, { (err, statusCode, json) in
                                if err == nil {
                                    //Socket.IO
                                    if let dataMessage = json!.dictionaryObject {
                                        let myJSON = [
                                            "room": path_id,
                                            "location": dataMessage
                                            ] as [String : Any]
                                        self.socket.emit("addLocation", myJSON)
                                    }
                                    
                                }
                            })
                        })
                        self.timer.start()
                    }
                }
            }
            
        }
  
    }
    
    private func setSocketEvents(path_id: String) {

        socket.on(clientEvent: .connect) { (data, ack) in
            print("socket locations connected")
            self.socket.emit("join", ["room":path_id])
        }

        socket.connect()
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureLocationManager()
        
        self.view.backgroundColor = .white
        configureMap()
        
        socket = manager.defaultSocket
        
        let safeArea = self.view.safeAreaLayoutGuide
        
        view.addSubview(mapView)
        mapView.frame = view.frame
        
        view.addSubview(myLocationButton)
        myLocationButton.snp.makeConstraints { (make) in
            make.leading.equalTo(safeArea).offset(15)
            make.bottom.equalTo(safeArea).offset(-15)
            make.size.equalTo(CGSize(width: 50, height: 50))
        }
        
        view.addSubview(shareButton)
        shareButton.snp.makeConstraints { (make) in
            make.trailing.equalTo(safeArea).offset(-15)
            make.bottom.equalTo(safeArea).offset(-15)
            make.size.equalTo(CGSize(width: 150, height: 50))
        }
        
        view.addSubview(shareLinkButton)
        shareLinkButton.snp.makeConstraints { (make) in
            make.trailing.equalTo(shareButton.snp.leading).offset(-10)
            make.centerY.equalTo(shareButton)
            make.size.equalTo(CGSize(width: 50, height: 50))
        }
        
        
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        
        shareLinkButton.layer.cornerRadius = shareLinkButton.bounds.height / 2
        shareButton.layer.cornerRadius = shareButton.bounds.height / 2
        myLocationButton.layer.cornerRadius = myLocationButton.bounds.width / 2
    }
    
    func configureLocationManager() {
        locationManager = CLLocationManager()
        locationManager!.delegate = self
        if CLLocationManager.authorizationStatus() == .authorizedWhenInUse {
            locationManager!.startUpdatingLocation()
        } else {
            locationManager!.requestWhenInUseAuthorization()
        }
        
    }
    
    func configureMap() {
        self.mapView.isRotateEnabled = false
        self.mapView.isPitchEnabled = false
        self.mapView.showsUserLocation = true
    }

}


extension MapViewController: CLLocationManagerDelegate {
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let location = locations.first!
        let coordinateRegion = MKCoordinateRegionMakeWithDistance(location.coordinate, 500, 500)
        mapView.setRegion(coordinateRegion, animated: true)
        locationManager?.stopUpdatingLocation()
    }
    
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        switch status {
        case .notDetermined:
            print("NotDetermined")
        case .restricted:
            print("Restricted")
        case .denied:
            print("Denied")
        case .authorizedAlways:
            print("AuthorizedAlways")
        case .authorizedWhenInUse:
            print("AuthorizedWhenInUse")
            locationManager!.startUpdatingLocation()
        }
    }
}

extension MapViewController: MKMapViewDelegate {
    func mapView(_ mapView: MKMapView, didSelect view: MKAnnotationView) {
        print("toco annotation")
    }
}
    


import React from 'react'

//Assets
import '../assets/css/z-registerservices.css'

//  Images
import restaurant from '../assets/images/restaurant.jpg'
import hotel from '../assets/images/hotel.jpg'
import tourism_company from '../assets/images/tourism-company.jpg'


const RegisterServices = (props) => (
    <div className="Register-services">      
            <h2>Registrar Servicios</h2>
            <div className="container-items">
                <article className="item register-hotel">
                    <img src={hotel} alt="Registrar Hotel" title="Registrar Hotel"/>
                    <input type="submit" value="Hotel"/>
                </article>
                <article className="item register-restaurant">
                    <img src={restaurant} alt="Registrar Restaurante" title="Registrar Restaurante"/>
                    <input type="submit" value="Restaurante"/>
                </article>
                <article className="item  register-tourism-company">
                    <img src={tourism_company} alt="Registrar Empresa" title="Registrar compañia de turismo"/>
                    <input type="submit" value="Empresa de Turismo"/>
                </article>
        </div>
        
    </div>
)

export default RegisterServices
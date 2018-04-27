import React from 'react'

import '../assets/css/z-listservices.css'

const servicesState =false;

const ListServices = (props) => (
    <div className="List-services">
        <h2>Lista de Servicios</h2>

        <div className="list-container"> 
                
            {  servicesState ? <p className="services-null">No hay servicios</p>
                : 
                (
                    <ul className="services">
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li> <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li> <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li> <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li> <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li> <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li> <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li> <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        
                        <li className="service">Hotel California</li>
                        <li className="service">Hotel California</li>
                        <li className="service">Restaurante Norteño</li>
                        <li className="service">Empresa Dest</li>
                        <li className="service">Hotel California</li>
                            
                        <li className="service">Empresa Dest</li>
                    </ul>
                        
                )
                   
            }
        </div>

        <input className="submit" type="submit" value="Ir a Servicios"/>
   
        
    </div>
)

export default ListServices
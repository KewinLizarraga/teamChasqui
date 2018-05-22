import React from 'react'

import '../assets/css/z-listservices.css'

const servicesState = true;

const ListServices = (props) => (
    <div className="List-services">
        <h2>Lista de Servicios</h2>

        <div className="list-container"> 
                
            {  servicesState ? <p className="services-null">No hay servicios</p>
                : 
                (
                    <ul className="services">
                        
                    </ul>                   
                )
                   
            }
        </div>

        <input className="submit" type="submit" value="Ir a Servicios"/>
   
        
    </div>
)

export default ListServices
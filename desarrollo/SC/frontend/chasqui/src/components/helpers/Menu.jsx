import React from 'react'

import '../assets/css/z-menu.css'

const Menu = (props) => (
   <div className="Menu" id="Menu">
        <ul>
            <li><a href="">Editar Datos de Usuario</a></li>
            <li><a href="">Lista de Servicios</a></li>
        </ul>
        <div className="container-logout">
            <i className="material-icons logout"  onClick={props.logout}>power_settings_new</i>
        </div>
   </div>
)

export default Menu
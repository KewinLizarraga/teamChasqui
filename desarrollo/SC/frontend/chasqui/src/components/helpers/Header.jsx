import React from 'react'

import '../assets/css/z-header.css'

const Header = (props) => (
    <header className="header">
        <div className="pictures">
            <i className="material-icons menu-burger" onClick={props.toggleMenu}>menu</i>
            <img className="logo" src={props.logo} alt=""/>
        </div>       
        <div className="info-user">
            <p className="user-name">{props.nameUser}</p>
            <div className="container-photo">
                <img className="user-photo" src="https://yt3.ggpht.com/-3eyhFcQSv7o/AAAAAAAAAAI/AAAAAAAAAAA/12pyRRx1VP4/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"/>
            </div>
            
        </div>
    </header>
)

export default Header
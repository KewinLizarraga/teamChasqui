import React from 'react';
import {Link} from 'react-router-dom'
 
import '../assets/css/confirmationmessage.css'

const ConfirmationMessage = (props) => (
    <section id="message" className="Confirmation-Message">
        <div className="main-content">           
            <p id="msg">{props.message}</p>
            <Link to="/login">Aceptar</Link>
        </div>
    </section>
);

export default ConfirmationMessage;

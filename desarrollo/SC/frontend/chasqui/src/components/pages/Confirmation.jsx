import React, { Component } from 'react';
import '../assets/css/confirmation.css'

import AuthService from '../../actions/AuthService'
import axios from 'axios'
import ConfirmationMessage from '../helpers/ConfirmationMessage';

class Confirmation extends Component{
    constructor(){
        super()
        this.state={
            message:""
        }
        this.Auth= new AuthService()
        this.handleConfirmation= this.handleConfirmation.bind(this)
    }

    handleConfirmation(e){
        e.preventDefault()
        let token = this.props.match.params.confirmationToken
        console.log(token);
        let _this=this
        axios.post('http://206.189.175.34:8000/api/v1/auth/confirmation', {token})
            .then(function(response){                
                let message = response.data.message
                console.log(_this)
                _this.setState({
                    message: message
                })               
            })
            .catch(function(error){
                console.log(error)
            })
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.props.history.replace('/')
        }
    }

    render(){
        return(       
            <div className="Confirmation">
                <section className="main-cont">
                    <p className="message">
                        ¿ Desea confirmar correo Electronico ?
                    </p>  
                    <form onSubmit={this.handleConfirmation}>
                        <input className="submit" type="submit" value="Confirmar Email" />
                    </form>                                      
                </section>    
                {this.state.message ? <ConfirmationMessage message={this.state.message}/> : null}      
            </div>
           
        )
    }
}

          


export default Confirmation;

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../assets/css/register.css'

import AuthService from '../../actions/AuthService'
import axios from 'axios'
import ConfirmationMessage from '../helpers/ConfirmationMessage';


class Register extends Component{
    constructor(...props){
        super(...props)
        this.state={
          first_name: "",
          last_name:"",
          email: "",
          password: "",
          password2: "",
          message: "",
        }
        this.Auth= new AuthService()
        this.onChange= this.onChange.bind(this)
        this.handleFormSubmit= this.handleFormSubmit.bind(this)
        this.removeError= this.removeError.bind(this)
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.props.history.replace('/')
        }
    }

    onChange(e){
        this.setState({
           [e.target.name]: e.target.value
        })
    }

    handleFormSubmit(e){
        e.preventDefault()
        let {first_name, last_name, email, password, password2} = this.state       
        if(this.state.password !== this.state.password2){
            let error= document.getElementsByClassName('password')
            error[0].classList.add('error')
            error[1].classList.add('error')
            let msj= document.getElementById('msj')
            msj.textContent='Las contraseñas deben coincidir'
        }
        else{
            let _this= this
            console.log(this.state)
            axios.post('http://206.189.175.34:8000/api/v1/auth/signup', {first_name, last_name, email, password, password2})
            .then(function(response){                
                let message = response.data.message
                _this.setState({
                    message: message
                })
            })
            .catch(function(error){
                console.log(error)
            })
        }      
    }

    removeError(e){
        e.target.classList.remove('error')
    }

    render(){
        return(
            <div className="Register">
                <section className="register-container">
                    <div className="register-title">
                        <h2>Complete sus datos</h2>
                    </div>
                    <form className="register-form" id="register-form" onSubmit={this.handleFormSubmit}>
                        <div className="inputs">
                            <div className="form-input">
                                <label>Nombre</label>
                                <input type="text" id="firstname" name="first_name" autoComplete="off" autoFocus required value={this.state.first_name} onChange={this.onChange}/>     
                            </div>
                            <div className="form-input">
                                <label>Apellido</label>
                                <input type="text" id="lastname" name="last_name" autoComplete="off" required value={this.state.last_name} onChange={this.onChange}/>                              
                            </div>
                            <div className="form-input">
                                <label>Correo Electrónico</label>
                                <input type="email" id="email" name="email" autoComplete="off" required value={this.state.email} onChange={this.onChange}/>
                            </div>
                            <div className="form-input">
                                <label>Contraseña</label>
                                <input type="password" id="password" name="password" className="password" required value={this.state.password} onChange={this.onChange} onFocus={this.removeError}/>
                            </div>
                            <div className="form-input">
                                <label>Confirmar Contraseña:</label>
                                <input type="password" id="password2" name="password2" className="password" required value={this.state.password2} onChange={this.onChange} onFocus={this.removeError}/>         
                            </div>
                            <div className="confirm">                          
                                <span id="msj" className="msj"></span>
                            </div>
                        </div>                                    
                        <div className="buttons">
                            <Link to="/login" className="return">Cancelar</Link>
                            <input type="submit" value="Registrar" className="submit"/>
                        </div>                                                               
                    </form>

                </section>
                {this.state.message ? <ConfirmationMessage message={this.state.message}/> : null}
            </div>
        )
    }
}

export default Register


import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../assets/css/login.css'
import logo from '../assets/images/logo.png'
import $ from 'jquery'

import AuthService from '../../actions/AuthService'

class Login extends Component{
    constructor(...props){
        super(...props)
        this.state={
            email:"",
            password:"",
            loading : false
        }

        this.handleOnFocusInput= this.handleOnFocusInput.bind(this)
        this.handleOnShowFade= this.handleOnShowFade.bind(this)

        this.onChange = this.onChange.bind(this)
        this.handleFormSubmit= this.handleFormSubmit.bind(this)
        this.Auth = new AuthService()
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.props.history.replace('/')
        }
    }
    
    handleOnFocusInput(e){
        $('#visibility').css('display', 'block')       
    }

    handleOnShowFade(e){
        let x = $(e.target).next().attr('type')
        if(x === 'password'){
            $('#visibility').text("visibility_on")
            $('#user-password').attr('type','text')
        }
        else if (x === 'text'){
            $('#visibility').text('visibility_off')
            $('#user-password').attr('type','password')
        }       
    }

    onChange(e){
        this.setState({
           [e.target.name]: e.target.value
        })
    }

    handleFormSubmit(e){
        e.preventDefault();
        this.Auth.login(this.state.email, this.state.password)
            .then(res =>{
                this.props.history.replace('/');
            })
            .catch(err =>{
                this.error()
            })
    }

    error(){
        let contentError = document.getElementById("form-error")
        let form = document.getElementById("login-user")
        form.reset()
        contentError.textContent="Datos Incorrectos, Intentalo de nuevo !"
    }
    
    render(){
        
        return(
            <div className="container">
                <div className="container-img box-width">
                    <img  className="logo" src={logo} alt="logo - Chasqui" title="Team Chasqui"/>
                </div>
                <div className="container-form box-width">        
                    <form className="login-user" id="login-user" onSubmit={this.handleFormSubmit}>
                        <div className="error" id="form-error"></div>
                        <div className="form-input input-field">
                            <input 
                                type= "email"  
                                id= "user-username" 
                                name= "email" 
                                required
                                autoFocus
                                autoComplete= "off"
                                value= {this.state.email}
                                onChange= {this.onChange}
                                title= "Complete sus datos"
                                autoCorrect= "off"
                            />
                            <label htmlFor="user-username" className="label">Usuario</label>
                        </div>
                        <div className="form-input input-field">
                            <i id="visibility" className="material-icons visibility" onClick={this.handleOnShowFade}>visibility_off</i>
                            <input 
                                type= "password"  
                                id= "user-password" 
                                name= "password" 
                                required
                                onFocus= {this.handleOnFocusInput}
                                value= {this.state.password}
                                onChange= {this.onChange}
                                title= "Complete sus datos"
                            />
                            <label htmlFor="user-password" className="label">Contraseña</label>
                        </div>
                        <div className="form-redirect"> 
                            <Link to="/register">Si no tiene acceso, registrese!</Link>
                        </div>
                        <div className="form-input btn">
                            <input type="submit"  value="Ingresar"/>                           
                        </div>                      
                    </form>
                </div>
            </div>
        )       
    }
} 

export default Login
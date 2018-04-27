import React, { Component } from 'react'

import '../assets/css/login.css'
import logo from '../assets/images/logo.png'
import $ from 'jquery'


class Login extends Component{
    constructor(...props){
        super(...props)
        this.state={

        }

        this.handleOnFocusInput= this.handleOnFocusInput.bind(this)
        this.handleOnShowFade= this.handleOnShowFade.bind(this)
        this.handleOnBlurInput= this.handleOnBlurInput.bind(this)
    }

    handleOnFocusInput(e){
        $('#visibility').css('display', 'block')       
    }

    handleOnBlurInput(e){}

    handleOnShowFade(e){
        let x = $(e.target).next().attr('type')
        if(x == 'password'){
            $('#visibility').text("visibility_on")
            $('#user-password').attr('type','text')
        }
        else if (x == 'text'){
            $('#visibility').text('visibility_off')
            $('#user-password').attr('type','password')
        }       
    }

    render(){
        return(
            <div className="container">
                <div className="container-img box-width">
                    <img  className="logo" src={logo} alt="logo - Chasqui" title="Team Chasqui"/>
                </div>
                <div className="container-form box-width">        
                    <form action="" className="login-user" id="login-user">
                        <div className="error" id="form-error"></div>
                        <div className="form-input input-field">
                            <input type="email"  id="user-username" required autoFocus/>
                            <label htmlFor="user-username" className="label">Usuario</label>
                        </div>
                        <div className="form-input input-field">
                            <i id="visibility" className="material-icons visibility" onClick={this.handleOnShowFade}>visibility_off</i>
                            <input type="password"  id="user-password" required onFocus={this.handleOnFocusInput} onBlur={this.handleOnBlurInput}/>
                            <label htmlFor="user-password" className="label">Contraseña</label>
                        </div>
                        <div className="form-redirect"> 
                            <Link to="/register">Si not tiene acceso, registrese!</Link>
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
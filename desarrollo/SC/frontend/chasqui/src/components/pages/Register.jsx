import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../assets/css/register.css'

import AuthService from '../../actions/AuthService'


class Register extends Component{
    constructor(...props){
        super(...props)
        this.state={
          
        }
        this.Auth= new AuthService()
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.props.history.replace('/')
        }
    }

    render(){
        return(
            <div className="Register">
                <section className="register-container">
                    <div className="register-title">
                        <h2>Complete sus datos</h2>
                    </div>
                    <form className="register-form">               
                        <div className="group-1">
                            <div className="input-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text"  autoFocus/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text"/>
                            </div>
                        </div>
                        <div className="group-2">
                            <div className="input-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text"/>
                            </div>
                        </div>  
                        <div className="buttons">
                            <Link to="/login" className="return">Cancelar</Link>
                            <input type="submit" value="Registrar" className="submit"/>
                        </div>                                                               
                    </form>

                </section>
            </div>
        )
    }
}

export default Register


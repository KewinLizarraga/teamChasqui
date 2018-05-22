import React, { Component } from 'react'

import logo from '../assets/images/logo.png'
import $ from 'jquery'
import '../assets/css/home.css'

//Componentes
import Header from '../helpers/Header'
import Menu from '../helpers/Menu'
import RegisterServices from  '../helpers/RegisterServices'
import ListServices from '../helpers/ListServices'
import withAuth from '../../actions/withAuth'
import AuthService from '../../actions/AuthService'
const Auth = new AuthService()

class Home extends Component{
    constructor(...props){
        super(...props)
        this.state={

        }
        this.onToogleMenu=this.onToogleMenu.bind(this)
        this.handleLogout= this.handleLogout.bind(this)
    }

    onToogleMenu(){
        $("#Menu").toggleClass("show-fade")
        $(".main-section").toggleClass("toggle-margin")
    }

    handleLogout(){
        Auth.logout()
        this.props.history.replace('/login')
    }

    render(){
       
        return(
           <section className="Home">
                <Header nameUser="Franco Ademir" emailUser="francoade04@gmail.com" logo={logo} toggleMenu={this.onToogleMenu}/>
                <main className="main-container" >                                
                        <Menu logout={this.handleLogout}/>
                        <section className="main-section">
                            <div className="box-center">
                                <RegisterServices />
                                <ListServices />
                            </div>
                        </section>
                </main>
           </section>
        )
    }
}

export default withAuth(Home)
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Error404 from './pages/Error404'

class Chasqui extends Component {
    constructor(...props){
        super(...props)
    }

    render(){
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/login' component={Login}/>
                        <Route path='*' component={Error404}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Chasqui

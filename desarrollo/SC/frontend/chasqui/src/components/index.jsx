import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

class Chasqui extends Component {
    constructor(...props){
        super(...props)
        this.state={
            
        }
    }

    render(){
        return (
            <Router>
                <p>Chasqui</p>
            </Router>
        )
    }
}

export default Chasqui
import React, { Component } from 'react';
import * as AuthService from './AuthService';

export default function withAuth(AuthComponent) {
  return class AuthWrapped extends Component {
    constructor() {
      super();
    }
    componentWillMount() {
      if (!AuthService.loggedIn()) {
        this.props.history.replace('/login')
      }
      else {
        try {
          const profile = AuthService.getProfile()
          // dispatch
        }
        catch (err) {
          AuthService.logout()
          this.props.history.replace('/login')
        }
      }
    }

    render() {
      return (
        <AuthComponent match={this.props.match} history={this.props.history} />
      )
    }
  };
}

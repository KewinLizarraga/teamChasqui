import React from 'react';
import LoginRegister from '../../components/LoginRegister/LoginRegister';
import { loggedIn } from '../../services/AuthService'
// Thrid party library used by this component.
// Materias-ui components and functions used by this component.

// Components used by this component

// Styles for this component

// Sections for this component

// Component class
class LoginPage extends React.Component {
  componentWillMount = () => {
    if (loggedIn()) {
      this.props.history.replace('/')
    }
  }
  render() {
    if (loggedIn()) {
      return null;
    }
    return (
      <LoginRegister history={this.props.history} type='login' />
    );
  }
}

// ProtTypes for this component

// Export component
export default LoginPage;

import React from 'react';

// Thrid party library used by this component.

// Materias-ui components and functions used by this component.

// Components used by this component
import LorginRegister from '../../components/LoginRegister/LoginRegister';
import { loggedIn } from '../../services/AuthService';
// Styles for this component

// Sections for this component

// Component class
class RegisterPage extends React.Component {
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
      <LorginRegister history={this.props.history} type='register' />
    )
  }
}

// ProtTypes for this component

// Export component
export default RegisterPage;

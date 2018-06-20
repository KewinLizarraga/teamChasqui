import React from 'react';

// Thrid party library used by this component.

// Materias-ui components and functions used by this component.

// Components used by this component
import { loggedIn } from '../../services/AuthService';
// Styles for this component

// Sections for this component

// Component class
class RegisterBusinessPage extends React.Component {
  componentWillMount() {
    if (!loggedIn()) {
      this.props.history.replace('/login')
    }
  }
  render() {
    return (
      <h1>RegisterBusinessPage Component!!</h1>
    )
  }
}

// ProtTypes for this component

// Export component
export default RegisterBusinessPage;

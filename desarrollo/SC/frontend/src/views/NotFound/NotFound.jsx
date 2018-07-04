/* eslint-disable */
import React from 'react';

// Thrid party library used by this component.
import { Field, reduxForm } from 'redux-form';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { Select, Input, MenuItem, InputLabel, FormControl, Chip } from '@material-ui/core';
import SelectHours from '../../components/SelectHours/SelectHours';
import ListSelectHours from '../../components/SelectHours/ListSelectHours';
import CustomDialogForm from '../../components/CustomDialog/CustomDialogForm';
import Review from '../Dashboard/Notifies/Sections/Review';
import ListReviews from '../Dashboard/Notifies/Sections/ListReviews';
// Materias-ui components and functions used by this component.

// Components used by this component

// Styles for this component

// Sections for this component
// Component class
class NotFound extends React.Component {
  render() {
    return (
      <div
        style={{
          marginTop: '100px',
          marginLeft: '30px'
        }}
      >
        <hi style={{ fontSize: 100}}>Page not found!</hi>
      </div>
    )
  }
}

// ProtTypes for this component
// Export component
export default NotFound;

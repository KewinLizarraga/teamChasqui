/* eslint-disable */
import React from 'react';

// Thrid party library used by this component.
import { Field, reduxForm } from 'redux-form';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
// Materias-ui components and functions used by this component.

// Components used by this component

// Styles for this component

// Sections for this component

// Component class

class NotFound extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form style={{marginTop: '200px'}} onSubmit={handleSubmit(values => console.log(values))}>
        <Field onInvalid={this.setCustomValidate} type="text" required name="passwordField" component="input" />
        <Field onChange={() => console.log(this.props)} name="select" component={CustomSelect} labelName='Paises' options={{
          123: 'pais1',
          124: 'pais2 asdhhjas asjdhajsdha'
        }} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

// ProtTypes for this component
const validate = (values) => {
  const errors = {};
  console.log('Validate ->', values.select)
  if (!values.select) {
    errors.select = 'Mal Mal'
  }
  if (!values.passwordField) {
    errors.passwordField = 'field'
  }

  return errors;
}
// Export component
export default  reduxForm({
  validate,
  form: 'testForm'
})(NotFound);

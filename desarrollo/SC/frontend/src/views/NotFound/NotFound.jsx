/* eslint-disable */
import React from 'react';

// Thrid party library used by this component.
import { Field, reduxForm } from 'redux-form';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { Select, Input, MenuItem, InputLabel, FormControl, Chip } from '@material-ui/core';
// Materias-ui components and functions used by this component.

// Components used by this component

// Styles for this component

// Sections for this component

// Component class

const options = {
  'id1': 'option1',
  'id2': 'option2',
  'id3': 'option3',
  'id4': 'option4',
  'id5': 'option5',
  'id6': 'option6',
  'id7': 'option7',
  'id8': 'option8',

}

class CustomMultiSelect extends React.Component {
  render = () => {
    const { id, label } = this.props;
    return (
      <FormControl>
        <InputLabel htmlFor={`select-multiple-${id}`}>{label}</InputLabel>
        <Select
          multiple
        >
        </Select>
      </FormControl>
    )
  }
}

class NotFound extends React.Component {
  state = {
    values: []
  }

  handleChange = (e) => {
    this.setState({
      values: e.target.value
    })
  }
  render() {
    const { handleSubmit, name = [] } = this.props;
    return (
      <form style={{ marginTop: '200px' }} onSubmit={handleSubmit(values => console.log(values))}>
        <FormControl>
          <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
          <Select
            multiple
            value={this.state.values}
            onChange={this.handleChange}
            input={<Input id='select-multiple-chip' />}
            renderValue={selected => (
              <div >
                {selected.map(value => <Chip key={value} label={options[value]} />)}
              </div>
            )}
          >
            {Object.keys(options).map(value => (
              <MenuItem key={value} value={value} >{options[value]}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Field 
          name='test'
          type='select'
          id='testId'
          component={CustomMultiSelect}
        />
      </form>
    )
  }
}

// ProtTypes for this component
const validate = (values) => {
  const errors = {};
  if (!values.select) {
    errors.select = 'Mal Mal'
  }
  if (!values.passwordField) {
    errors.passwordField = 'field'
  }

  return errors;
}
// Export component
export default reduxForm({
  validate,
  form: 'testForm'
})(NotFound);

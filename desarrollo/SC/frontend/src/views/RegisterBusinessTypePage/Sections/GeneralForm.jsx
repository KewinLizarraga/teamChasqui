import React from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { Field, reduxForm } from 'redux-form';
class GeneralForm extends React.Component {
  render = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} >
          <Field
            type='text'
            name='name'
            labelText='oliiii'
            id='name'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: 'text'
            }}
            required
            component={CustomInput}
          />
        </GridItem>
        <select type="select">
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
          <option value="myOption">Opcion</option>
        </select>
      </GridContainer>
    );
  }
}

export default reduxForm({
  form: 'generalForm'
})(GeneralForm);

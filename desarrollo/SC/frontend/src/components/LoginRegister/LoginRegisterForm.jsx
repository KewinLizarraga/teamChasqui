// This is the form which contain all the necessary fields to neither login or register
import React from 'react';

import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import CustomInput from '../../components/CustomInput/CustomInput';
import CardBody from '../../components/Card/CardBody';
import CardFooter from '../../components/Card/CardFooter';
import Button from '../../components/CustomButtons/Button';

import validateEmail from '../../utils/validateEmail';
import { login, register } from '../../actions/authActions';

let INPUTS = [];

const renderCustomInputs = (inputs => {
  return inputs.map(input => (
    <GridItem key={input.id} xs={12} sm={input.size} md={input.size} >
      <Field
        type={input.type}
        name={input.id}
        labelText={input.label}
        id={input.id}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          type: input.type
        }}
        required
        component={CustomInput}
      />
    </GridItem>
  ));
});

const handleLogin = (values, dispatch, pp) => {
  const { type } = pp;
  if (type === 'login') {
    dispatch(login(values))
      .then(response => {
        if (response.statusText === 'OK') {
          pp.history.replace('/');
        }
      });
  } else if (type === 'register') {
    dispatch(register(values))
      .then(response => {
        if (response.statusText === 'OK') {
          pp.history.replace(`/handle-confirmation?email=${values.email}`);
        }
      })
  }
}

const LoginRegisterForm = ({ data, classes, handleSubmit, ...props }) => {
  const { inputs, buttonText, extraText } = data;
  INPUTS = inputs;
  console.log(props)
  return (
    <form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
      <CardBody>
        <GridContainer justify='center'>
          {renderCustomInputs(inputs)}
        </GridContainer>
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <GridContainer justify='center'>
          <GridItem className={classes.centerItem}>
            <Button type="submit" simple color="primary" size="lg">
              {buttonText}
            </Button>
          </GridItem>
          {extraText ? (
            <GridItem className={classes.centerItem}>
              <Link className={classes.aClasses} to='#'>{extraText}</Link>
            </GridItem>
          ) : null}
        </GridContainer>
      </CardFooter>
    </form>
  )
}


const validate = (values, p) => {
  const errors = {};
  if (values.email) {
    errors.email = validateEmail(values.email || '');
  }
  if (values.password2 && (values.password !== values.password2)) {
    errors.password2 = 'Contraseña diferente.'
  }

  _.each(INPUTS, ({ id }) => {
    if (!values[id]) {
      errors[id] = 'Por favor, rellene este campo.'
    }
  });

  return errors;
}


export default reduxForm({
  initialValues: {
    last_name: '',
    first_name: '',
    email: '',
    password: '',
    password2: '' 
  },
  validate,
  form: 'loginRegisterForm'
})(LoginRegisterForm);

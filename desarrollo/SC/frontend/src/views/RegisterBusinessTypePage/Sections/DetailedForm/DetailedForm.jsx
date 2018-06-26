// TODO: VALIDAR CAMPOS, EJM -> QUE SOLO SE ENRTEN NUMEROS EN EL TELEFONO
import React from 'react';
import CustomImg from '../../../../components/CustomImg/CustomImg';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomMultiSelect from '../../../../components/CustomMultiSelect/CustomMultiSelect';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../assets/jss/material-kit-react/views/registerTypeSections/generalFormStyle';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import SpecificForm from './SpecificForm';
import { fetchMoneyTypes, changeCompleted, setCurrentMoneyTypes } from '../../../../actions/businessActions';

let DISPATCH = null;
let COMPLETED = undefined;

const FIELDS = [
  'phone',
  'money_types',
  'price_min',
  'price_max'
]

class DetailedForm extends React.Component {

  componentDidMount = () => {
    this.props.dispatch(fetchMoneyTypes());
  }
  moneyTypesHandleChange = (ev) => {
    const moneyTypes = ev.target.value;
    this.props.dispatch(setCurrentMoneyTypes(moneyTypes));
  }
  render = () => {
    const {
      classes,
      dispatch,
      businessType,
      moneyTypes,
      completed,
      currentMoneyTypes
    } = this.props;
    DISPATCH = dispatch;
    COMPLETED = completed;
    return (
      <form className={classes.formContainer}>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={6} >
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
                <Field
                  type='text'
                  name='web_page'
                  labelText='Página web'
                  id='web_page'
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: 'text'
                  }}
                  required={false}
                  component={CustomInput}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
                <Field
                  type='text'
                  name='face_page'
                  labelText='Pagina de facebook'
                  id='face_page'
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: 'text'
                  }}
                  required={false}
                  component={CustomInput}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
                <Field
                  type='number'
                  name='phone'
                  labelText='Teléfono'
                  id='phone'
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: 'number'
                  }}
                  required
                  component={CustomInput}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
                <CustomMultiSelect
                  disabled={_.isEmpty(moneyTypes)}
                  id='money_types'
                  label='Tipos de moneda'
                  value={currentMoneyTypes}
                  handleChange={this.moneyTypesHandleChange}
                  options={moneyTypes}
                />
              </GridItem>
            </GridContainer>
            <GridContainer justify='center' >
              <GridItem xs={12} sm={12} md={6} className={classes.gridItem}>
                <Field
                  type='number'
                  name='price_min'
                  labelText='Precio mínimo'
                  id='price_min'
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: 'number'
                  }}
                  required
                  component={CustomInput}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6} className={classes.gridItem}>
                <Field
                  type='number'
                  name='price_max'
                  labelText='Precio máximo'
                  id='price_max'
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: 'number'
                  }}
                  required
                  component={CustomInput}
                />
              </GridItem>
            </GridContainer>
            <h5 style={{ color: '#515252' }}>Detalles del {businessType}</h5>
            <SpecificForm
              classes={classes}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6} >
            <CustomImg />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  _.each(FIELDS, field => {
    if (!values[field]) errors[field] = 'error';
  });

  if (_.isEmpty(errors) && !COMPLETED) {
    DISPATCH(changeCompleted(true));
  }
  if (!_.isEmpty(errors) && COMPLETED) {
    DISPATCH(changeCompleted(false));
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'detailedForm'
})(withStyles(styles)(DetailedForm));

// Form para llenar informacion general
// TODO: Object que obtenga informacion de los field
// TODO: funcion que genere un field y otra para select (dandole la data)
// TODO: llenar todo de forma ordenada (ver la mejor forma)
// TODO: Cuando elija pais, consultar los departamentos (solo falta funcion linea 55)
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import generalFormStyle from '../../../assets/jss/material-kit-react/views/registerTypeSections/generalFormStyle';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import {
  changeNext,
  fetchUserRoles,
  fetchDepartments,
  fetchProvinces,
  fetchDistricts
} from '../../../actions/businessActions';

let DISPATCH = null;
let CANNEXT = undefined;


class GeneralForm extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(fetchUserRoles('hotel'))
  }
  renderInput = (input) => {
    return (
      <GridItem xs={12} sm={6} md={5} >
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
    )
  }
  renderSelect = (select) => {
    return (
      <GridItem xs={12} sm={6} md={5}>
        <Field
          name='country'
          labelName='Paises'
          component={CustomSelect}
          // currentValue={formData.country}
          onChange={(e) => console.log('cambie busco departamentos con', e.target.value)}
          options={{
            'id1': 'pais1',
            'id2': 'pais2',
            'id3': 'pais3',
            'id4': 'pais4',
            'id5': 'pais5'
          }}
        />
      </GridItem>
    )
  }

  countryHandleChange = (ev) => {
    const country_id = ev.target.value;
    this.props.dispatch(fetchDepartments(country_id));
  }
  departmentHandleChange = (ev) => {
    const deparment_id = ev.target.value;
    this.props.dispatch(fetchProvinces(deparment_id));
  }
  provinceHandleChange = (ev) => {
    const province_id = ev.target.value;
    this.props.dispatch(fetchDistricts(province_id));
  }
  render = () => {
    const { dispatch, business, classes } = this.props;
    const formData = business.data.business || {};
    const {
      canNext,
      userRoles,
      countries,
      departments,
      provinces,
      districts
    } = business;
    DISPATCH = dispatch;
    CANNEXT = canNext;
    return (
      <form className={classes.formContainer}>
        <GridContainer justify='center' >
          <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
            <Field
              name='role_id'
              labelName='Rol del usuario'
              component={CustomSelect}
              currentValue={formData.role_id}
              options={userRoles}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={10} >
            <Field
              type='text'
              name='businessName'
              labelText='Nombre del negocio'
              id='businessName'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'businessName'
              }}
              required
              component={CustomInput}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={5} className={classes.gridItem}>
            <Field
              disabled={_.isEmpty(countries)}
              name='country_id'
              labelName='Pais'
              component={CustomSelect}
              currentValue={formData.country_id}
              onChange={this.countryHandleChange}
              options={countries}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={5} className={classes.gridItem}>
            <Field
              disabled={_.isEmpty(departments)}
              name='deparment_id'
              labelName='Departamento'
              component={CustomSelect}
              currentValue={formData.deparment_id}
              onChange={this.departmentHandleChange}
              options={departments}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={5} className={classes.gridItem}>
            <Field
              disabled={_.isEmpty(provinces)}
              name='province_id'
              labelName='Provincia'
              component={CustomSelect}
              currentValue={formData.province_id}
              onChange={this.provinceHandleChange}
              options={provinces}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={5} className={classes.gridItem}>
            <Field
              disabled={_.isEmpty(districts)}
              name='district_id'
              labelName='Distrito'
              component={CustomSelect}
              currentValue={formData.district_id}
              options={districts}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={5} >
            <Field
              type='text'
              name='address'
              labelText='Dirección'
              id='address'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'address'
              }}
              required
              component={CustomInput}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={5} >
            <Field
              type='text'
              name='city_code'
              labelText='Código postal'
              id='city_code'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'city_code'
              }}
              required
              component={CustomInput}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={10} >
            <Field
              type='text'
              name='reference'
              labelText='Referencia'
              id='reference'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'reference'
              }}
              required
              component={CustomInput}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.role_id) errors.role_id = 'error';

  if (_.isEmpty(errors) && !CANNEXT) {
    DISPATCH(changeNext(true));
  }
  if (!_.isEmpty(errors) && CANNEXT) {
    DISPATCH(changeNext(false));
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'generalForm'
})(withStyles(generalFormStyle)(GeneralForm));

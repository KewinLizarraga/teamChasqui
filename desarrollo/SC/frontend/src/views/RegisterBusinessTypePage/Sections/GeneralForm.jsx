// Form para llenar informacion general
// TODO: Object que obtenga informacion de los field
// TODO: funcion que genere un field y otra para select (dandole la data)
// TODO: llenar todo de forma ordenada (ver la mejor forma)
// TODO: Cuando elija pais, consultar los departamentos (solo falta funcion linea 55)
import React from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { changeNext, fetchUserRoles, fetchDepartments } from '../../../actions/businessActions';

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
    console.log(country_id)
    this.props.dispatch(fetchDepartments(country_id));
  }
  render = () => {
    const { dispatch, business } = this.props;
    const formData = business.data.business || {};
    const { canNext, userRoles, countries, departments, provinces, districts } = business;
    DISPATCH = dispatch;
    CANNEXT = canNext;
    console.log('GeneralForm ->', departments)
    return (
      <form style={{ width: '100%', margin: '20px' }}>
        <GridContainer justify='center' >
          <GridItem>
            <Field
              name='role_id'
              labelName='Rol del usuario'
              component={CustomSelect}
              currentValue={formData.role_id}
              onChange={() => console.log('aaa')}
              options={userRoles}
            />
          </GridItem>
          <GridItem>
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
          <GridItem>
            <Field

              name='deparment_id'
              labelName='Departamento'
              component={CustomSelect}
              currentValue={formData.deparment_id}
              onChange={() => console.log('aaa')}
              options={departments}
            />
          </GridItem>
          <GridItem>
            <Field
              disabled={_.isEmpty(provinces)}
              name='province_id'
              labelName='Provincia'
              component={CustomSelect}
              currentValue={formData.province_id}
              onChange={() => console.log('aaa')}
              options={provinces}
            />
          </GridItem>
          <GridItem>
            <Field
              disabled={_.isEmpty(districts)}
              name='district_id'
              labelName='Distrito'
              component={CustomSelect}
              currentValue={formData.district_id}
              onChange={() => console.log('aaa')}
              options={districts}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  console.log('Validate ->', values)

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
})(GeneralForm);

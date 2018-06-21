// Form para llenar informacion general
// TODO: Object que obtenga informacion de los field
// TODO: funcion que genere un field y otra para select (dandole la data)
// TODO: llenar todo de forma ordenada (ver la mejor forma)
// TODO: Cuando elija pais consultar los departamentos (solo falta funcion linea 55)
// TODO: Ver como hacer con el boton para guardar la data ya que al dar next se destruye
import React from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { Field, reduxForm } from 'redux-form';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
class GeneralForm extends React.Component {
  render = () => {
    return (
      <form style={{ width: '100%', margin: '20px' }}>
        <GridContainer justify='center' >
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
          <GridItem xs={12} sm={6} md={5}>
            <Field
              name='country'
              labelName='Paises'
              component={CustomSelect}
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
        </GridContainer>
      </form>
    );
  }
}

export default reduxForm({
  form: 'generalForm'
})(GeneralForm);

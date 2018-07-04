import React from 'react';
// TODO: HACER UN INPUT QUE MUESTRE LOS DIAS SELECCIONADOS
import { reduxForm, Field } from 'redux-form';
import { changeNext, setCurrentFoodTypes, fetchFoodTypes } from '../../../../../actions/businessActions';
import _ from 'lodash';
import GridContainer from '../../../../../components/Grid/GridContainer';
import GridItem from '../../../../../components/Grid/GridItem';
import CustomMultiSelect from '../../../../../components/CustomMultiSelect/CustomMultiSelect';
import CustomSelect from '../../../../../components/CustomSelect/CustomSelect';
import CustomDialogForm from '../../../../../components/CustomDialog/CustomDialogForm';

let DISPATCH = null;
let CANNEXT = undefined;
let COMPLETED = undefined;

const FIELDS = ['category'];

class RestaurantForm extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(fetchFoodTypes());
  }
  foondTypesHandleChange = (ev) => {
    const foodTypes = ev.target.value;
    this.props.dispatch(setCurrentFoodTypes(foodTypes))
  }
  render = () => {
    const {
      classes,
      completed,
      canNext,
      dispatch,
      foodTypes,
      currentFoodTypes,
      restaurantForm
    } = this.props;
    DISPATCH = dispatch;
    CANNEXT = canNext;
    COMPLETED = completed;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
          <Field
            name='category'
            labelName='Categoría'
            component={CustomSelect}
            currentValue={restaurantForm ? restaurantForm.category : ''}
            options={{
              'Para llevar': 'Para llevar'
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
          <CustomMultiSelect
            disabled={_.isEmpty(foodTypes)}
            id='foodTypes'
            label='Tipos de comida'
            value={currentFoodTypes}
            handleChange={this.foondTypesHandleChange}
            options={foodTypes}
          />
        </GridItem>
        <GridItem>
          <CustomDialogForm
            buttonText='Agregar horario'
            title='Seleccione su horario'
            content='Seleccione los dias que atendera, marcando la hora de entrada y salida.'
          />
        </GridItem>
      </GridContainer>
    );
  }
}

const validate = values => {
  const errors = {};

  _.each(FIELDS, field => {
    if (!values[field]) errors[field] = 'error';
  });

  if (_.isEmpty(errors) && !CANNEXT) {
    DISPATCH(changeNext(true));
  }
  if (!_.isEmpty(errors) && CANNEXT) {
    DISPATCH(changeNext(false));
  }
  if (COMPLETED && _.isEmpty(errors) && !CANNEXT) {
    DISPATCH(changeNext(true));
  }
  if (COMPLETED && !_.isEmpty(errors) && CANNEXT) {
    DISPATCH(changeNext(false));
  }

  return errors;
}
 // cambiar R por r
export default reduxForm({
  validate,
  form: 'restaurantForm'
})(RestaurantForm);

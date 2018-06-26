import React from 'react';
import GridItem from '../../../../../components/Grid/GridItem';
import GridContainer from '../../../../../components/Grid/GridContainer';
import CustomDatetime from '../../../../../components/CustomDatetime/CustomDatetime';
import CustomInput from '../../../../../components/CustomInput/CustomInput';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { fetchServices, changeNext, setCurrentServices } from '../../../../../actions/businessActions';
import CustomMultiSelect from '../../../../../components/CustomMultiSelect/CustomMultiSelect';

let DISPATCH = null;
let CANNEXT = undefined;
let COMPLETED = undefined;
const FIELDS = [
  'checkin_time',
  'checkout_time',
  'room_quantity'
];

class HotelForm extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(fetchServices());
  }
  servicesHandleChange = (ev) => {
    const services = ev.target.value;
    this.props.dispatch(setCurrentServices(services))
  }
  render = () => {
    const {
      classes,
      hotelServices,
      completed,
      canNext,
      dispatch,
      currentServices
    } = this.props;
    
    DISPATCH = dispatch;
    CANNEXT = canNext;
    COMPLETED = completed;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
          <CustomMultiSelect
            disabled={_.isEmpty(hotelServices)}
            id='services'
            label='Servicios'
            value={currentServices}
            handleChange={this.servicesHandleChange}
            options={hotelServices}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6} className={classes.gridItem}>
          <Field
            name='checkin_time'
            label='Hora de entrada'
            placeholder='Elija una hora'
            formControlProps={{
              fullWidth: true
            }}
            dateTimeProps={{
              dateFormat: false,
              timeConstraints: {
                minutes: { step: 15 }
              }
            }}
            component={CustomDatetime}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6} className={classes.gridItem}>
          <Field
            name='checkout_time'
            label='Hora de salida'
            placeholder='Elija una hora'
            formControlProps={{
              fullWidth: true
            }}
            dateTimeProps={{
              dateFormat: false,
              timeConstraints: {
                minutes: { step: 15 }
              }
            }}
            component={CustomDatetime}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6} className={classes.gridItem}>
          <Field
            type='number'
            name='room_quantity'
            labelText='Números de habitaciones'
            id='room_quantity'
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

export default reduxForm({
  validate,
  form: 'hotelForm'
})(HotelForm);

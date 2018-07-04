import React from 'react';
import HotelForm from './sections/HotelForm';
import RestaurantForm from './sections/RestaurantForm';
import AgencyForm from './sections/AgencyForm';
import { connect } from 'react-redux'

const SpecificForm = ({
  businessType,
  classes,
  completed,
  hotelServices,
  canNext,
  dispatch,
  currentServices,
  foodTypes,
  currentFoodTypes,
  restaurantForm,
  ...props
}) => {
  switch (businessType) {
    case 'hotel': {
      return (
        <HotelForm
          completed={completed}
          dispatch={dispatch}
          canNext={canNext}
          hotelServices={hotelServices}
          classes={classes}
          currentServices={currentServices}
        />
      );
    }
    case 'restaurant': {
      return (
        <RestaurantForm
          completed={completed}
          classes={classes}
          dispatch={dispatch}
          canNext={canNext}
          foodTypes={foodTypes}
          currentFoodTypes={currentFoodTypes}
          restaurantForm={restaurantForm}
        />
      );
    }
    case 'travel_agency': {
      return (
        <AgencyForm completed={completed} classes={classes} />
      );
    }
    default:
      return null;
  }
}

const mapStateToProps = ({ business, form }) => {
  const {
    hotelServices,
    canNext,
    businessType,
    completed,
    currentServices,
    foodTypes,
    currentFoodTypes
  } = business;
  return {
    restaurantForm: form.restaurantForm ? form.restaurantForm.values || {} : {},
    hotelServices,
    canNext,
    businessType,
    completed,
    currentServices,
    foodTypes,
    currentFoodTypes
  }
}

export default connect(mapStateToProps)(SpecificForm);

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
        <RestaurantForm completed={completed} classes={classes} />
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

const mapStateToProps = ({ business }) => {
  const {
    hotelServices,
    canNext,
    businessType,
    completed,
    currentServices
  } = business;
  return {
    hotelServices,
    canNext,
    businessType,
    completed,
    currentServices
  }
}

export default connect(mapStateToProps)(SpecificForm);

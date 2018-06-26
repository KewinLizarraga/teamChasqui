import React from 'react';
import { connect } from 'react-redux';
import SearchBoxComponent from './SearchBoxComponent';
import { setCurrentLocation } from '../../actions/businessActions';

class CustomSearchBox extends React.Component {

  render = () => {
    const { onPlacesChange, ...rest } = this.props;
    return (
      <SearchBoxComponent 
        onPlacesChange={this.props.onPlacesChange}
        {...rest}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlacesChange: position => {
      dispatch(setCurrentLocation(position))
    }
  }
}

export default connect(() => ({}), mapDispatchToProps)(CustomSearchBox);

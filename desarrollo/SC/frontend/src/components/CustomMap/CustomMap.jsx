import React from 'react';
import MapComponent from './MapComponent';
import CustomMarker from './CustomMarker';
import { connect } from 'react-redux';
import { setCurrentLocation } from '../../actions/businessActions';
import _ from 'lodash';

class CustomMap extends React.Component {
  componentDidMount = () => {
    if (_.isEmpty(this.props.markers)) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          this.props.dispatch(setCurrentLocation({
            lat: latitude,
            lng: longitude
          }));
        })
      }
    }
  }
  onDragEnd = (ev) => {
    const lat = ev.latLng.lat();
    const lng = ev.latLng.lng();
    this.props.dispatch(setCurrentLocation({
      lat,
      lng
    }));
  }
  render = () => {
    if (_.isEmpty(this.props.markers)) {
      const { currentLocation } = this.props;
      return (
        <MapComponent
          defaultCenter={currentLocation}
        >
          <CustomMarker
            draggable
            position={currentLocation}
            onDragEnd={this.onDragEnd}
          />
        </MapComponent>
      )
    }
    return (
      <MapComponent >
      </MapComponent>
    );
  }
}



const mapStateToProps = ({ business }) => {
  const { currentLocation, markers } = business;
  return {
    currentLocation,
    markers
  }
}

export default connect(mapStateToProps)(CustomMap);

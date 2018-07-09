import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const MapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_dXJsnG3-SiRAAVwdUDqHJje8GFSZ5lU&libraries=places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `600px` }} />
  }),
  withScriptjs,
  withGoogleMap
)(({ children, defaultCenter, defaultZoom, ...props }) => {
  console.log(defaultZoom)
  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      center={defaultCenter}
    >
      {children}
    </GoogleMap>

  );
});

MapComponent.defaultProps = {
  defaultZoom: 18,
  defaultCenter: { lat: -12.053417, lng: -77.085560 }
}

export default MapComponent;

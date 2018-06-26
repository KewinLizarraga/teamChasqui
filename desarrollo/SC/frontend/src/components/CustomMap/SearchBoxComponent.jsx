import React from 'react';
import _ from 'lodash';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import CustomInput from '../CustomInput/CustomInput';
const SearchBoxComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_dXJsnG3-SiRAAVwdUDqHJje8GFSZ5lU&libraries=places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      // const geocoder = new window.google.maps.Geocoder();
      const refs = {}

      this.setState({
        onSearchBoxMounted: ref => {
          refs.searchBox = ref
        },
        onEnter: (geocoder, ev) => {
          if (ev.keyCode === 13) {
            geocoder.geocode({
              address: ev.target.value
            }, (results, status) => {
              if (status === 'OK') {
                const { location } = results[0].geometry;
                const lat = location.lat();
                const lng = location.lng();
                this.props.onPlacesChange({
                  lat,
                  lng
                });
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
          }
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          if (!_.isEmpty(places)) {
            const { location } = places[0].geometry;
            const lat = location.lat();
            const lng = location.lng();
            this.props.onPlacesChange({
              lat,
              lng
            })
          }
        }
      });
    }
  }),
  withScriptjs
)(({
  onSearchBoxMounted,
  bounds,
  onPlacesChanged,
  onEnter,
  customInputProps,
  input,
  meta,
  ...props
}) => {
  const geocoder = new window.google.maps.Geocoder();
  return (
    <StandaloneSearchBox
      ref={onSearchBoxMounted}
      bounds={bounds}
      onPlacesChanged={onPlacesChanged}
    >
      <CustomInput
        onKeyUp={onEnter.bind(null, geocoder)}
        input={input}
        meta={meta}
        {...customInputProps}
      />
    </StandaloneSearchBox>
  );
})

export default SearchBoxComponent;

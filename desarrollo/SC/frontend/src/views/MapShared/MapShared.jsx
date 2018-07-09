import React from 'react';
import MapComponent from '../../components/CustomMap/MapComponent';
import CustomMarker from '../../components/CustomMap/CustomMarker';
import { Polyline } from 'react-google-maps';
import { fetchPath, setLocation } from '../../actions/mapActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import io from 'socket.io-client';
class MapShared extends React.Component {
  constructor(props) {
    super(props);

    this.socket = io('http://206.189.175.34:8000');
    
    this.socket.on('addLocation', data => {
      console.log(data);
      const { location } = data;
      this.props.setLocation(location);
    });
  }
  componentDidMount = () => {
    const { direction_id } = this.props.match.params;
    this.props.fetchPath(direction_id);
    this.socket.emit('join', { room: direction_id });
  }
  getPath = (path) => {
    return _.map(path, location => ({
      lat: location.lat,
      lng: location.lng
    }));
  }
  render = () => {
    const { currentLocation, path, initialLocation } = this.props.map;
    console.log(this.props.map)
    if (!currentLocation) {
      return null;
    }

    return (
      <div>
        <MapComponent
          defaultCenter={initialLocation}
        >
          <CustomMarker
            position={currentLocation || { lat: -12.053417, lng: -77.085560 }}
          />
          <Polyline
            path={this.getPath(path)}
          />

        </MapComponent>
      </div>
    );
  }
}

const mapStateToProps = ({ map }) => ({ map });
const mapObjectToDispatch = {
  fetchPath,
  setLocation
}

export default connect(mapStateToProps, mapObjectToDispatch)(MapShared);

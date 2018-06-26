import React from 'react';
import { Marker } from 'react-google-maps';

class CustomMarker extends React.Component {
  
  render = () => {
    const { draggable, position, onDragEnd } = this.props;
    return (
      <Marker
        draggable={draggable}
        position={position}
        onDragEnd={onDragEnd}
      />
    );
  }
}

export default CustomMarker;

import _ from 'lodash';
import { FETCH_PATH_SUCCESS, SET_LOCATION } from "../actions/mapActions";

const initialState = {
  loading: false,
  currentLocation: null,
  initialLocation: null,
  path: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION: {
      const currentPath = state.path;
      const { lat, lng } = action.payload;
      return {
        ...state, 
        path: Object.assign([], currentPath, [...currentPath, action.payload]),
        currentLocation: {
          lat,
          lng
        }
      }
    }
    case FETCH_PATH_SUCCESS: {
      const { lat, lng } = _.last(action.payload);
      const latlng = _.first(action.payload);
      return {
        ...state,
        loading: false,
        currentLocation: {
          lat,
          lng
        },
        initialLocation: {
          lat: latlng.lat,
          lng: latlng.lng
        },
        path: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

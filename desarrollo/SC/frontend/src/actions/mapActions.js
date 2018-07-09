import { tinkuyAxios } from "../services/axios";

export const FETCH_PATH_SUCCESS = 'FETCH_PATH_SUCCESS';
export const SET_LOCATION = 'SET_LOCATION';

export const setLocation = location => {
  return {
    type: SET_LOCATION,
    payload: location
  }
}
export const fetchPathSuccess = (path) => {
  return {
    type: FETCH_PATH_SUCCESS,
    payload: path
  }
}

export const fetchPath = direction_id => dispatch => {
  tinkuyAxios({
    method: 'get',
    url: `/directions/${direction_id}/locations`
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(fetchPathSuccess(response.data));
    }
  })
}

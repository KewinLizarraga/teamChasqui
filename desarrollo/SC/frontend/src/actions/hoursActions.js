export const CHANGE_OPEN = 'CHANGE_OPEN';
export const ADD_HOUR = 'ADD_HOUR';
export const CHANGE_DAYS = 'CHANGE_DAYS';
export const CLEAR_STATE = 'CLEAR_STATE';
export const CHANGE_TIME = 'CHANGE_TIME';
export const DELETE_HOUR= 'DELETE_HOUR';

export const deleteHour = (idx) => {
  return {
    type: DELETE_HOUR,
    payload: idx
  }
}
export const changeTime = (idx, type, value) => {
  return {
    type: CHANGE_TIME,
    payload: {
      idx,
      type,
      value
    }
  }
}
export const clearState = () => {
  return {
    type: CLEAR_STATE
  }
}
export const changeDays = (idx, days) => {
  return {
    type: CHANGE_DAYS,
    payload: {
      idx,
      days
    }
  }
}
export const addHour = () => {
  return {
    type: ADD_HOUR
  }
}
export const changeOpen = (open) => {
  return {
    type: CHANGE_OPEN,
    payload: open
  }
}

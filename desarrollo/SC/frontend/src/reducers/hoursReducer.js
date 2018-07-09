import _ from 'lodash';
import { List, Map as _Map } from 'immutable';
import {
  CHANGE_OPEN,
  ADD_HOUR,
  CHANGE_DAYS,
  CLEAR_STATE,
  CHANGE_TIME,
  DELETE_HOUR
} from "../actions/hoursActions";

const initialState = {
  open: false,
  hours: List(),
  selected: []
}
const OPTIONS = {
  'L': 'Lunes',
  'M': 'Martes',
  'W': 'Mierocles',
  'J': 'Jueves',
  'V': 'Viernes',
  'S': 'Sabado',
  'D': 'Domingo'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_HOUR: {
      const idx = action.payload;
      const { hours } = state;
      const newHours = hours.delete(idx);
      return {
        ...state,
        hours: newHours
      }
    }
    case CHANGE_TIME: {
      const { idx, type, value } = action.payload;
      const { hours } = state;
      const newHours = hours.update(idx, hour => {
        const hourObject = hour.toJS();
        return _Map({
          ...hourObject,
          [type]: value
        });
      })
      return {
        ...state,
        hours: newHours
      }
    }
    case CHANGE_DAYS: {
      const { idx, days } = action.payload;
      const { hours } = state;
      const newHours = hours.update(idx, hour => {
        const hourObject = hour.toJS()
        return _Map({
          ...hourObject,
          days: List(days)
        });
      })
      let selected = [];
      _.each(newHours.toJS(), hour => {
        selected = _.union(selected, hour.days);
      });
      return {
        ...state,
        hours: newHours,
        selected
      }
    }
    case CLEAR_STATE: {
      return {
        ...initialState
      }
    }
    case ADD_HOUR: {
      const hours = state.hours.toJS();
      const last = _.last(hours);
      const oldOptions = last ? last.options : OPTIONS;
      const oldDays = last ? last.days : [];
      const newOptions = {};
      _.each(oldOptions, (option, key) => {
        if (oldDays.indexOf(key) === -1) {
          newOptions[key] = option;
        }
      });

      const newHour = _Map({
        days: List(),
        start: '12:00 PM',
        end: '12:00 PM',
        options: newOptions
      });
      return {
        ...state,
        hours: state.hours.push(newHour)
      }
    }
    case CHANGE_OPEN: {
      return {
        ...state,
        open: action.payload
      }
    }
    default:
      return {
        ...state
      }
  }
}


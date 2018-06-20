import {
  FETCH_PLANS_BEGIN,
  FETCH_PLANS_SUCCESS,
  FETCH_PLANS_FAILED,
  CHANGE_CURRENT_PLAN
} from '../actions/businessActions';

const initialState = {
  loading: false,
  plans: [],
  error: null,
  currentPlan: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_PLAN: {
      return {
        ...state,
        currentPlan: action.payload
      }
    }
    case FETCH_PLANS_BEGIN: {
      return {
        ...state,
        loading: true,
      }
    }
    case FETCH_PLANS_SUCCESS: {
      return {
        ...state,
        loading: false,
        plans: action.payload
      }
    }
    case FETCH_PLANS_FAILED: {
      return {
        ...initialState,
        error: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

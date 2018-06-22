import {
  FETCH_BEGIN,
  FETCH_PLANS_SUCCESS,
  FETCH_FAILED,
  CHANGE_CURRENT_PLAN,
  SET_PRODUCT,
  CHANGE_NEXT,
  BACK_STEP,
  SET_GENERAL_INFO,
  FETCH_RC_SUCCESS,
  FETCH_DEPARTMENTS_SUCCESS
} from '../actions/businessActions';

const initialState = {
  plans: [],
  userRoles: {},
  countries: {},
  departments: {},
  provinces: {},
  districts: {},
  data: {},
  loading: false,
  error: null,
  currentPlan: {},
  activeStep: 0,
  canNext: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    // no se que pasaaaaa no entra a este action
    case FETCH_DEPARTMENTS_SUCCESS: {
      console.log('adsasd')
      return {
        ...state
      }
    }
    case FETCH_RC_SUCCESS: {
      const { userRoles, countries } = action.payload;
      return {
        ...state,
        loading: false,
        userRoles,
        countries
      }
    }
    case SET_GENERAL_INFO: {
      const { data, activeStep } = state;
      const { payload } = action;
      return {
        ...state,
        canNext: false,
        activeStep: activeStep + 1,
        data: {
          ...data,
          user: {
            ...data.user,
            role_id: payload.role_id,
            type: 'businessman',
            subscribed: true
          },
          business: {
            ...data.business,
            ...payload
          }
        }
      }
    }
    case BACK_STEP: {
      const { activeStep } = state;
      return {
        ...state,
        activeStep: activeStep - 1,
        canNext: true
      }
    }
    case CHANGE_NEXT: {
      return {
        ...state,
        canNext: action.payload
      }
    }
    case SET_PRODUCT: {
      const { currentPlan, data, activeStep } = state;
      return {
        ...state,
        canNext: false,
        activeStep: activeStep + 1,
        data: {
          ...data,
          producto: currentPlan
        }
      }
    }
    case CHANGE_CURRENT_PLAN: {
      return {
        ...state,
        currentPlan: action.payload,
        canNext: true
      }
    }
    case FETCH_BEGIN: {
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
    case FETCH_FAILED: {
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

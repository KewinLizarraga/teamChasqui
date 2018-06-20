import {
  LOADING_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT,
  CLEAR_ERROR
} from '../actions/authActions'

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload
      }
    }
    case LOGIN_FAILED: {
      console.log(action) 
      return {
        ...initialState,
        error: action.payload
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case LOGOUT: {
      return {
        ...initialState,
      }
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        error: null
      }
    }
    default:
      return state;
  }
}

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
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_PROVINCES_SUCCESS,
  FETCH_DISTRICTS_SUCCESS,
  SET_CURRENT_LOCATION,
  SET_CURRENT_IMAGE,
  SET_BUSINESS_TIME,
  FETCH_MONEY_TYPES_SUCCESS,
  FETCH_SERVICES_SUCCESS,
  CHANGE_COMPLETED,
  SET_DETAILED_INFO,
  SET_CURRENT_SERVICES,
  SET_CURRENT_MONEY_TYPES,
  BUSINESS_PAYMENT_SUCCESS,
  CLOSE_DIALOG,
  OPEN_DIALOG,
  FETCH_FOOD_TYPES_SUCCESS,
  SET_CURRENT_FOOD_TYPES,
  SET_BUSINESS_HOURS
} from '../actions/businessActions';

const initialState = {
  plans: [],
  userRoles: {},
  countries: {},
  departments: {},
  provinces: {},
  districts: {},
  moneyTypes: {},
  hotelServices: {},
  foodTypes: {},
  // falta crear la consulta asincronica para los tipos de comida y guardar al success
  // tambien falta cuando elija una opcion y cambiar el current food typesx 
  data: {},
  currentLocation: { lat: -12.053417, lng: -77.085560 },
  currentImage: null,
  markers: [],
  loading: false,
  error: null,
  currentPlan: {},
  currentServices: [],
  currentMoneyTypes: [],
  currentFoodTypes: [],
  businessHours: [],
  activeStep: 0,
  canNext: false,
  completed: null,
  dialogInfo: {
    open: false,
    type: '',
    title: '',
    message: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUSINESS_HOURS: {
      return {
        ...state,
        businessHours: action.payload
      }
    }
    case SET_CURRENT_FOOD_TYPES: {
      return {
        ...state,
        currentFoodTypes: action.payload
      }
    }
    case FETCH_FOOD_TYPES_SUCCESS: {
      return {
        ...state,
        loading: false,
        foodTypes: action.payload
      }
    }
    case OPEN_DIALOG: {
      const { type, title, message } = action.payload;
      return {
        ...state,
        dialogInfo: {
          open: true,
          type,
          title,
          message
        }
      }
    }
    case CLOSE_DIALOG: {
      console.log('asdas')
      return {
        ...state,
        dialogInfo: {
          open: false,
          type: '',
          title: '',
          message: ''
        }
      }
    }
    case BUSINESS_PAYMENT_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }
    case SET_CURRENT_MONEY_TYPES: {
      return {
        ...state,
        currentMoneyTypes: action.payload
      }
    }
    case SET_CURRENT_SERVICES: {
      return {
        ...state,
        currentServices: action.payload
      }
    }
    case SET_DETAILED_INFO: {
      const { data, activeStep } = state;
      let newState = initialState;
      switch (state.businessType) {
        case 'hotel':
          const { business, hotel_detail } = action.payload;
          newState = {
            ...state,
            canNext: true,
            completed: null,
            activeStep: activeStep + 1,
            data: {
              ...data,
              business: {
                ...data.business,
                ...business,
                hotel_detail
              }
            }
          }
          break;
        case 'restaurant': {
          const { business, restaurant_detail } = action.payload;
          newState = {
            ...state,
            canNext: true,
            completed: null,
            activeStep: activeStep + 1,
            data: {
              ...data,
              business: {
                ...data.business,
                ...business,
                restaurant_detail
              }
            }
          }
          break;
        }
        default:
          break;
      }
      return newState;
    }
    case CHANGE_COMPLETED: {
      return {
        ...state,
        completed: action.payload
      }
    }
    case FETCH_SERVICES_SUCCESS: {
      return {
        ...state,
        loading: false,
        hotelServices: action.payload
      }
    }
    case FETCH_MONEY_TYPES_SUCCESS: {
      return {
        ...state,
        loading: false,
        moneyTypes: action.payload
      }
    }
    case SET_BUSINESS_TIME: {
      return {
        ...state,
        businessType: action.payload
      }
    }
    case SET_CURRENT_IMAGE: {
      return {
        ...state,
        currentImage: action.payload
      }
    }
    case SET_CURRENT_LOCATION: {
      return {
        ...state,
        currentLocation: action.payload
      }
    }
    case FETCH_DISTRICTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        districts: action.payload
      }
    }
    case FETCH_PROVINCES_SUCCESS: {
      return {
        ...state,
        loading: false,
        provinces: action.payload,
        districts: {}
      }
    }
    case FETCH_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        departments: action.payload,
        provinces: {},
        districts: {}
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
      const {
        data,
        activeStep,
        userRoles,
        countries,
        departments,
        provinces,
        districts,
        businessType
      } = state;

      const { payload: { values, geo_location } } = action;
      const {
        businessName,
        country_id,
        department_id,
        province_id,
        district_id,
        address,
        city_code,
        reference,
        role_id
      } = values;

      const user = {
        role: {
          role_id,
          name: userRoles[role_id]
        },
        type: 'businessman',
        subscribed: true
      }

      const business = {
        name: businessName,
        type: businessType,
        country: {
          name: countries[country_id]
        },
        department: {
          name: departments[department_id]
        },
        province: {
          name: provinces[province_id]
        },
        district: {
          district_id,
          name: districts[district_id]
        },
        address: {
          details: address,
          reference
        },
        city_code,
        geo_location
      }
      return {
        ...state,
        canNext: false,
        activeStep: activeStep + 1,
        data: {
          ...data,
          user: {
            ...user
          },
          business: {
            ...business
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
          product: currentPlan
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



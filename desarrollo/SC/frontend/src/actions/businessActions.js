import { tinkuyAxios, stripeAxios } from '../services/axios';
import { getToken } from '../services/AuthService';
import _ from 'lodash';
import async from 'async';
const CLOUDINARY_PRESET = 'kfz8wwny';
export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_PLANS_SUCCESS = 'FETCH_PLANS_SUCCESS';
export const FETCH_FAILED = 'FETCH_FAILED';
export const CHANGE_CURRENT_PLAN = 'CHANGE_CURRENT_PLAN';
export const SET_PRODUCT = 'SET_PRODUCT';
export const CHANGE_NEXT = 'CHANGE_NEXT';
export const SET_GENERAL_INFO = 'SET_GENERAL_INFO';
export const BACK_STEP = 'SET_BACK_STEP';
export const FETCH_RC_SUCCESS = 'FETCH_RC_SUCCESS';
export const FETCH_DEPARTMENTS_SUCCESS = 'FETCH_DEPARTMENTS_SUCCESS';
export const FETCH_PROVINCES_SUCCESS = 'FETCH_PROVINCES_SUCCESS';
export const FETCH_DISTRICTS_SUCCESS = 'FETCH_DISTRICTS_SUCCESS';
export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export const SET_CURRENT_IMAGE = 'SET_CURRENT_IMAGE';
export const SET_BUSINESS_TIME = 'SET_BUSINESS_TIME';
export const FETCH_MONEY_TYPES_SUCCESS = 'FETCH_MONEY_TYPES_SUCCESS';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const CHANGE_COMPLETED = 'CHANGE_COMPLETED';
export const SET_DETAILED_INFO = 'SET_DETAILED_INFO';
export const SET_CURRENT_SERVICES = 'SET_CURRENT_SERVICES';
export const SET_CURRENT_MONEY_TYPES = 'SET_CURRENT_MONEY_TYPES';
export const BUSINESS_PAYMENT = 'BUSINESS_PAYMENT';

const getIds = (data, idLabel) => {
  if (_.isObject(data)) {
    return data[idLabel]
  }
}

export const businessPayment = (data) => dispatch => {

  async.waterfall([(cb) => {
    const { photos } = data.business;
    const formData = new FormData();
    formData.append('file', photos[0]);
    formData.append('upload_preset', CLOUDINARY_PRESET);

    stripeAxios({
      method: 'post',
      url: '/upload',
      data: formData
    }).then(response => {
      cb(null, response.data);
    }).catch(err => {
      cb(err);
    })
  }, (image, cb) => {
    const { secure_url } = image;
    const { user, product, business, stripe_token } = data;
    const { role, ...restUser } = user;
    const { name, ...restProduct } = product;
    const { country, department, province, district, ...restBusiness } = business;
    const specificData = business[`${business.type}_detail`]; 
    const newUser = {
      ...restUser,
      role_id: getIds(role, 'role_id')
    }
    const newProduct = {
      ...restProduct
    }
    
    let newSpecificData = {}
    switch (business.type) {
      case 'hotel': {
        const { services, ...restSpecificData } = specificData;
         newSpecificData = {
           hotel_detail: {
             ...restSpecificData,
             services: services.map(service => service.id)
           }
         }
        break;
      }
    
      default:
        break;
    }
    const newBusiness = {
      ...restBusiness,
      district_id: district.district_id,
      money_types: business.money_types.map(type => type.id),
      photos: [secure_url],
      ...newSpecificData
    }
    tinkuyAxios({
      method: 'post',
      url: '/stripe',
      headers: {
        'x-access-token': getToken()
      },
      data: {
        stripe_token,
        user: newUser,
        product: newProduct,
        business: newBusiness
      }
    }).then(response => {
      if (response.statusText === 'OK') {
        cb(null, response.data);
      } else {
        cb (response.data)
      }
    }) 
  }], (err, result) => {
    console.log(result);
  })

  return {
    type: BUSINESS_PAYMENT
  }
}
export const setCurrentMoneyTypes = moneyTypes => {
  return {
    type: SET_CURRENT_MONEY_TYPES,
    payload: moneyTypes
  }
}
export const setCurrentServices = services => {
  return {
    type: SET_CURRENT_SERVICES,
    payload: services
  }
}
export const setDetailedInfo = values => {
  return {
    type: SET_DETAILED_INFO,
    payload: values
  }
}
export const changeCompleted = status => {
  return {
    type: CHANGE_COMPLETED,
    payload: status
  }
}
export const fetchServicesSuccess = data => {
  const hotelServices = dataToSelect(data);
  return {
    type: FETCH_SERVICES_SUCCESS,
    payload: hotelServices
  }
}
export const fetchMoneyTypesSuccess = data => {
  const moneyTypes = dataToSelect(data);
  return {
    type: FETCH_MONEY_TYPES_SUCCESS,
    payload: moneyTypes
  }
}
export const setBusinessType = businessType => {
  return {
    type: SET_BUSINESS_TIME,
    payload: businessType
  }
}
export const setCurrentImage = file => {
  return {
    type: SET_CURRENT_IMAGE,
    payload: file
  }
}
export const setCurrentLocation = currentLocation => {
  return {
    type: SET_CURRENT_LOCATION,
    payload: currentLocation
  }
}

export const fetchDistrictsSuccess = data => {
  const districts = dataToSelect(data);
  return {
    type: FETCH_DISTRICTS_SUCCESS,
    payload: districts
  }
}
export const fetchProvincesSuccess = (data) => {
  const provinces = dataToSelect(data);
  return {
    type: FETCH_PROVINCES_SUCCESS,
    payload: provinces
  }
}
export const fetchDepartmentsSuccess = (data) => {
  const departments = dataToSelect(data);
  return {
    type: FETCH_DEPARTMENTS_SUCCESS,
    payload: departments
  }
}
export const fetchRCSuccess = (data) => {
  const userRoles = dataToSelect(data[0]);
  const countries = dataToSelect(data[1]);
  return {
    type: FETCH_RC_SUCCESS,
    payload: {
      userRoles,
      countries
    }
  }
}
export const setGeneralInfo = (values, geo_location) => {

  return {
    type: SET_GENERAL_INFO,
    payload: {
      values,
      geo_location
    }
  }
};
export const bacoStep = () => ({
  type: BACK_STEP
});
export const changeNext = (newStatus) => ({
  type: CHANGE_NEXT,
  payload: newStatus
});
export const changeCurrentPlan = (data) => ({
  type: CHANGE_CURRENT_PLAN,
  payload: data
});
export const fetchPlansSuccess = (plans) => {
  const filteredPlans = filterPlans(plans);
  return ({
    type: FETCH_PLANS_SUCCESS,
    payload: filteredPlans
  });
}
export const fetchBegin = () => ({
  type: FETCH_BEGIN
});
export const fetchFailed = (error) => ({
  type: FETCH_FAILED,
  payload: error
});
export const setProduct = () => ({
  type: SET_PRODUCT
});


export const fetchPlans = () => dispatch => {
  dispatch(fetchBegin());
  return tinkuyAxios({
    method: 'get',
    url: '/products',
    params: {
      'filter[type]': 'plan',
      'mode': 'populated'
    }
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(fetchPlansSuccess(response.data));
    } else {
      dispatch(fetchFailed(response.data))
    }
    return response;
  }, err => Promise.reject(err.response));
}
export const fetchUserRoles = (type) => dispatch => {
  dispatch(fetchBegin());

  async.parallel([(cb) => {
    tinkuyAxios({
      method: 'get',
      url: `/roles`,
      params: {
        'filter[belong_to]': type
      }
    }).then(response => {
      if (response.statusText === 'OK') {
        cb(null, response.data);
      } else {
        cb(response.data);
      }
    })
  }, (cb) => {
    tinkuyAxios({
      method: 'get',
      url: '/countries'
    }).then(response => {
      if (response.statusText === 'OK') {
        cb(null, response.data);
      } else {
        cb(response.data);
      }
    })
  }], (err, results) => {
    if (err) return dispatch(fetchFailed(err));
    dispatch(fetchRCSuccess(results));
  });
}
export const fetchDepartments = (country_id) => dispatch => {
  dispatch(fetchBegin());
  tinkuyAxios({
    method: 'get',
    url: '/departments',
    params: {
      'filter[country_id]': country_id
    }
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(fetchDepartmentsSuccess(response.data));
    } else {
      dispatch(fetchFailed(response.data));
    }
  }, error => Promise.reject(error));
}
export const fetchProvinces = (department_id) => dispatch => {
  dispatch(fetchBegin());
  tinkuyAxios({
    method: 'get',
    url: '/provinces',
    params: {
      'filter[department_id]': department_id
    }
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(fetchProvincesSuccess(response.data));
    } else {
      dispatch(fetchFailed(response.data));
    }
  })
}
export const fetchDistricts = (province_id) => dispatch => {
  dispatch(fetchBegin());
  tinkuyAxios({
    method: 'get',
    url: '/districts',
    params: {
      'filter[province_id]': province_id
    }
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(fetchDistrictsSuccess(response.data));
    } else {
      dispatch(fetchFailed(response.data));
    }
  });
}
export const fetchMoneyTypes = () => dispatch => {
  dispatch(fetchBegin());
  return tinkuyAxios({
    method: 'get',
    url: '/money-types'
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(fetchMoneyTypesSuccess(response.data));
    } else {
      dispatch(fetchFailed(response.data));
    }
  });
}
export const fetchServices = () => dispatch => {
  dispatch(fetchBegin());
  return tinkuyAxios({
    method: 'get',
    url: '/services'
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(fetchServicesSuccess(response.data));
    } else {
      dispatch(fetchFailed(response.data));
    }
  });
}

const filterPlans = (plans) => {
  return _.map(plans, plan => {
    if (!plan.deleted) {
      const { plan_detail, name, _id } = plan;
      const { price_per_month } = plan_detail;
      const service_plans = _.map(plan_detail.service_plans, service => {
        if (!service.deleted) {
          const { _id, description, order } = service;
          return {
            id: _id,
            description,
            order
          };
        }
      });

      return {
        id: _id,
        name,
        price_per_month,
        service_plans
      }
    }
  })
}

const dataToSelect = (array) => {
  let options = {};
  _.each(array, data => {
    if (!data.deleted) {
      options[data._id] = data.name;
    }
  });
  return options;
}

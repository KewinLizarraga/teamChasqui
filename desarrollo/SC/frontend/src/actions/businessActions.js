import _axios from 'axios';
import axios from '../services/axios';
import _ from 'lodash';
import async from 'async';
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
export const setGeneralInfo = (values) => {
  const {
    businessName,
    district_id,
    address,
    city_code,
    reference,
    role_id
  } = values;

  const user = {
    role_id,
    type: 'businessman',
    subscribed: true
  }

  const business = {
    name: businessName,
    district_id,
    address: {
      details: address,
      reference
    },
    city_code
  }
  return {
    type: SET_GENERAL_INFO,
    payload: {
      user,
      business
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
  return axios({
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
    axios({
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
    axios({
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
  axios({
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
  axios({
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
  axios({
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

import axios from 'axios';
import _ from 'lodash';
export const FETCH_PLANS_BEGIN = 'FETCH_PLANS_BEGIN';
export const FETCH_PLANS_SUCCESS = 'FETCH_PLANS_SUCCESS';
export const FETCH_PLANS_FAILED = 'FETCH_PLANS_FAILED';
export const CHANGE_CURRENT_PLAN = 'CHANGE_CURRENT_PLAN';

export const changeCurrentPlan = (data) => ({
  type: CHANGE_CURRENT_PLAN,
  payload: data
});
export const fetchPlansBegin = () => ({
  type: FETCH_PLANS_BEGIN
});
export const fetchPlansSuccess = (plans) => {
  const filteredPlans = filterPlans(plans);
  return ({
    type: FETCH_PLANS_SUCCESS,
    payload: filteredPlans
  });
}
export const fetchPlansFailed = (error) => ({
  type: FETCH_PLANS_FAILED,
  payload: error
});

export const fetchPlans = () => dispatch => {
  dispatch(fetchPlansBegin());
  return axios({
    method: 'get',
    url: 'http://206.189.175.34:8000/api/v1/products?filter[type]=plan&mode=populated',
    validateStatus: (status) => {
      return status < 500
    }
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(fetchPlansSuccess(response.data));
    } else {
      dispatch(fetchPlansFailed(response.data))
    }
    return response;
  }, err => Promise.reject(err.response))
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

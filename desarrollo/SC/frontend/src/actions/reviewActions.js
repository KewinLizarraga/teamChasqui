import { tinkuyAxios } from '../services/axios';
import _ from 'lodash';
import async from 'async';
import { getToken } from '../services/AuthService';

export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_FAILED = 'FETCH_FAILED';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const SET_CURRENT_REVIEW = 'SET_CURRENT_REVIEW';
export const CLOSE_REVIEW_DIALOG = 'CLOSE_REVIEW_DIALOG';
export const OPEN_REVIEW_DIALOG = 'OPEN_REVIEW_DIALOG';
export const SUBMIT_REPLY_SUCCESS = 'SUBMIT_REPLY_SUCCESS';

export const submitReplySucces = (data) => {
  const review = modifyReview(data);
  return {
    type: SUBMIT_REPLY_SUCCESS,
    payload: review
  }
}
export const openReviewDialog = () => {
  return {
    type: OPEN_REVIEW_DIALOG
  }
}
export const closeReviewDialog = () => {
  return {
    type: CLOSE_REVIEW_DIALOG
  }
}
export const setCurrentReview = (review, admin_reply) => {
  return {
    type: SET_CURRENT_REVIEW,
    payload: {
      review,
      admin_reply
    }
  }
}
export const fetchBegin = () => {
  return {
    type: FETCH_BEGIN
  }
}
export const fetchFailed = error => {
  return {
    type: FETCH_FAILED,
    payload: error
  }
}
export const fetchReviewsSuccess = data => {
  const reviews = sortReviews(data);
  return {
    type: FETCH_REVIEWS_SUCCESS,
    payload: reviews
  }
}

export const fetchReviews = userId => dispatch => {
  dispatch(fetchBegin());

  async.waterfall([cb => {
    tinkuyAxios({
      method: 'get',
      url: '/businesses',
      params: {
        'filter[user_id]': userId
      }
    }).then(response => {
      if (response.statusText === 'OK') {
        cb(null, response.data);
      } else {
        cb(response.data);
      }
    });
  }, (business, cb) => {
    if (_.isEmpty(business)) {
      cb({
        success: false,
        message: 'There is no business with the user_id provided.'
      });
    }
    const { _id } = business[0];
    tinkuyAxios({
      method: 'get',
      url: `businesses/${_id}/reviews`,
      params: {
        mode: 'populated'
      }
    }).then(response => {
      if (response.statusText === 'OK') {
        cb(null, response.data);
      } else {
        cb(response.data);
      }
    })
  }], (err, results) => {
    if (err) {
      dispatch(fetchFailed(err));
    } else {
      dispatch(fetchReviewsSuccess(results));
    }
  });
}
export const submitReply = (message, reviewId) => dispatch => {
  dispatch(fetchBegin());
  tinkuyAxios({
    method: 'put',
    url: `reviews/${reviewId}`,
    headers: {
      'x-access-token': getToken()
    },
    data: {
      admin_reply: message
    }
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(submitReplySucces(response.data))
    } else {
      dispatch(fetchFailed(response.data));
    }
  });
}

const modifyReview = review => {
  const { _id, stars, user_id, body, createdAt, admin_reply } = review;
  const { photo, first_name, last_name } = user_id
  return {
    _id,
    user_id: {
      first_name,
      last_name,
      photo
    },
    stars,
    body,
    createdAt,
    admin_reply
  }
}

const sortReviews = (data) => {
  const reviews = _.map(data, review => {
    return modifyReview(review)
  });
  return _.sortBy(reviews, ['admin_reply','createdAt']).reverse();
}

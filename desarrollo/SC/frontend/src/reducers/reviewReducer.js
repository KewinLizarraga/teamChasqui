import _ from 'lodash';
import {
  FETCH_BEGIN,
  FETCH_FAILED,
  FETCH_REVIEWS_SUCCESS,
  SET_CURRENT_REVIEW,
  CLOSE_REVIEW_DIALOG,
  OPEN_REVIEW_DIALOG,
  SUBMIT_REPLY_SUCCESS
} from "../actions/reviewActions";

const initialState = {
  loading: false,
  error: null,
  reviews: [],
  disabledButton: true,
  currentReview: null,
  open: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_REPLY_SUCCESS: {
      return {
        ...state,
        loading: false,
        open: false,
        currentReview: null,
        reviews: _.map(state.reviews, review => {
          if (review._id === action.payload._id) {
            return action.payload;
          }
          return review;
        })
      }
    }
    case OPEN_REVIEW_DIALOG: {
      return {
        ...state,
        open: true
      }
    }
    case CLOSE_REVIEW_DIALOG: {
      return {
        ...state,
        open: false
      }
    }
    case SET_CURRENT_REVIEW: {
      const { review, admin_reply } = action.payload;
      return {
        ...state,
        currentReview: review,
        disabledButton: admin_reply ? true : false
      }
    }
    case FETCH_REVIEWS_SUCCESS: {
      return {
        ...state,
        loading: false,
        reviews: action.payload
      }
    }
    case FETCH_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case FETCH_BEGIN: {
      return {
        ...state,
        loading: true
      }
    }
    default: {
      return state
    }
  }
}

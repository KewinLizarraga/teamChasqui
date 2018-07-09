import { tinkuyAxios } from '../services/axios';
import _ from 'lodash';
import async from 'async';
import { getProfile } from '../services/AuthService';

export const CHAT_FETCH_BEGIN = 'CHAT_FETCH_BEGIN';
export const CHAT_FETCH_FAILED = 'CHAT_FETCH_FAILED';
export const FETCH_CHATS_SUCCESS = 'FETCH_CHATS_SUCCESS';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS'
export const SET_CHAT = 'SET_CHAT';
export const SET_MESSAGE = 'SET_MESSAGE';

export const setMessage = message => {
  return {
    type: SET_MESSAGE,
    payload: message
  }
}
export const setChat = chat => {
  return {
    type: SET_CHAT,
    payload: chat
  }
}
export const postMessageSucces = (data) => {
  return {
    type: POST_MESSAGE_SUCCESS,
    payload: data
  }
}
export const setCurrentChat = chatId => {
  return {
    type: SET_CURRENT_CHAT,
    payload: chatId
  }
}
export const fetchMessagesSucces = messages => {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: messages
  }
}
export const fetchChatsSuccess = chats => {
  return {
    type: FETCH_CHATS_SUCCESS,
    payload: chats
  }
}
export const chatFetchFailed = data => {
  return {
    type: CHAT_FETCH_FAILED,
    payload: data
  }
}
export const chatFetchBegin = () => {
  return {
    type: CHAT_FETCH_BEGIN
  }
}

export const postMessage = (data, destroy, socket) => dispatch => {
  dispatch(chatFetchBegin());
  
  tinkuyAxios({
    method: 'post',
    url: '/messages',
    data
  }).then(response => {
    if (response.statusText === 'OK') {
      console.log(response);
      const {chat, message} = response.data;
      dispatch(postMessageSucces(response.data));
      socket.emit('updateChat', {
        chat,
        room: getProfile()._id
      });
      console.log('cuantas veces paso por aqui')
      socket.emit('addMessage', {
        message,
        room: chat._id
      });
      destroy('chatForm')
    } else {
      dispatch(chatFetchFailed(response.data));
    }
  });
}
export const fetchMessages = chatId => dispatch => {
  dispatch(chatFetchBegin());

  tinkuyAxios({
    method: 'get',
    url: `/chats/${chatId}/messages`,
  }).then(response => {
    if (response.statusText === 'OK') {
      dispatch(fetchMessagesSucces(response.data));
    } else {
      dispatch(chatFetchFailed(response.data));
    }
  })
}
export const fetchChats = userId => dispatch => {
  dispatch(chatFetchBegin());

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
      url: `chats`,
      params: {
        'filter[business_id]': _id,
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
      dispatch(chatFetchFailed(err));
    } else {
      dispatch(fetchChatsSuccess(results));
    }
  });
}

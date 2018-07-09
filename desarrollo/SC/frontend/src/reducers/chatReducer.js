import {
  CHAT_FETCH_BEGIN,
  CHAT_FETCH_FAILED,
  FETCH_CHATS_SUCCESS,
  FETCH_MESSAGES_SUCCESS,
  SET_CURRENT_CHAT,
  POST_MESSAGE_SUCCESS,
  SET_CHAT,
  SET_MESSAGE
} from "../actions/chatActions";
import _ from 'lodash';
const initialState = {
  chats: [],
  messages: [],
  currentChat: '',
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE: {
      const message = action.payload;
      // const finded = _.find(state.messages, ['_id', message._id]);
      const newMessages = Object.assign([], state.messages, [...state.messages, message]);
      return {
        ...state,
        // messages: finded ? state.messages : newMessages
        messages: newMessages
      }
    }
    case SET_CHAT: {
      const chat = action.payload;
      const newChats = _.map(state.chats, stateChat => {
        if (stateChat._id === chat._id) {
          return chat;
        }
        return stateChat;
      });

      return {
        ...state,
        chats: newChats
      }
    }
    case POST_MESSAGE_SUCCESS: {
      console.log('Payload ->', action.payload)
      const { chat, message } = action.payload;
      const newMessages = Object.assign([], state.messages, [...state.messages, message]);
      const newChats = _.map(state.chats, stateChat => {
        if (stateChat._id === chat._id) {
          return chat;
        }
        return stateChat;
      });
      return {
        ...state,
        loading: false,
        chats: newChats,
        messages: newMessages
      }
    }
    case SET_CURRENT_CHAT: {
      return {
        ...state,
        currentChat: action.payload
      }
    }
    case FETCH_MESSAGES_SUCCESS: {
      return {
        ...state,
        loading: false,
        messages: action.payload
      }
    }
    case FETCH_CHATS_SUCCESS: {
      return {
        ...state,
        loading: false,
        chats: action.payload
      }
    }
    case CHAT_FETCH_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case CHAT_FETCH_BEGIN: {
      return {
        ...state,
        loading: true
      }
    }
    default: {
      return state;
    }
  }
}

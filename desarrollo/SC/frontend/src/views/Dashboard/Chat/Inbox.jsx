import React from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import ListChats from './ListChats';
import ListMessages from './ListMessages'
import { connect } from 'react-redux';
import { getProfile } from '../../../services/AuthService';
import { destroy } from 'redux-form';
import io from 'socket.io-client';
import {
  fetchChats,
  fetchMessages,
  setCurrentChat,
  postMessage,
  setChat,
  setMessage
} from '../../../actions/chatActions';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io('http://206.189.175.34:8000');
  }
  componentDidMount = () => {
    const { _id } = getProfile();
    this.props.fetchChats(_id);
  }

  render = () => {
    const {
      fetchMessages,
      setCurrentChat,
      postMessage,
      setChat,
      destroy,
      setMessage
    } = this.props;

    const {
      chats,
      messages,
      currentChat,
      loading,
    } = this.props.chat;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <ListChats
            chats={chats}
            loading={loading}
            currentChat={currentChat}
            actions={{
              fetchMessages,
              setCurrentChat,
              setChat
            }}
            socket={this.socket}
          />
        </GridItem>
        <br />
        <GridItem xs={12} sm={12} md={8}>
          {currentChat && <ListMessages
            messages={messages}
            loading={loading}
            currentChat={currentChat}
            actions={{
              postMessage,
              setChat,
              destroy,
              setMessage
            }}
            socket={this.socket}
          />}
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = ({ chat }) => ({ chat });
const mapObjectToDispatch = {
  fetchChats,
  fetchMessages,
  setCurrentChat,
  postMessage,
  setChat,
  destroy,
  setMessage
}

export default connect(mapStateToProps, mapObjectToDispatch)(Inbox);

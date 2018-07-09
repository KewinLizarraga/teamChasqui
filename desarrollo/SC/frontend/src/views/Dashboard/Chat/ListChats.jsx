import React from 'react';
import _ from 'lodash';
import Chat from './Chat';
import Progress from '../../../components/Progress/Progress';
import { getProfile } from '../../../services/AuthService';

class ListChats extends React.Component {
  componentDidMount = () => {
    this.props.socket.emit('join', {
      room: getProfile()._id
    });
    this.props.socket.on('updateChat', data => {
      this.props.actions.setChat(data.chat);
    })
  }
  renderChats = chats => {
    return _.map(chats, chat => {
      return (
        <Chat
          key={chat._id}
          chat={chat}
          actions={this.props.actions}
          currentChat={this.props.currentChat}
        />
      )
    })
  }
  render = () => {
    const { chats, loading } = this.props;
    return (
      <div>
        {this.renderChats(chats)}
        {loading && <Progress />}
      </div>
    )
  }
}

export default ListChats;

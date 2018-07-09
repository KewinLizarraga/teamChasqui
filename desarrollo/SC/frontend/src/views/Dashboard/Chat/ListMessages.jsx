import React from 'react';
import Message from './Message';
import _ from 'lodash';
import { Paper, Input, Button } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';
import CustomInput from '../../../components/CustomInput/CustomInput';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Progress from '../../../components/Progress/Progress';
import { getProfile } from '../../../services/AuthService';

class ListMessages extends React.Component {
  constructor(props) {
    super(props);
    const { socket, currentChat, actions } = this.props;
    this.paperRef = React.createRef();
    this.divRef = React.createRef();
    socket.emit('join', {
      room: currentChat._id
    });
    socket.on('addMessage', data => {
      actions.setMessage(data.message);
    });
  }

  componentDidUpdate = (previousProps, previousState) => {
    console.log(this.paperRef.current)
    this.paperRef.current.scrollTop = this.paperRef.current.scrollHeight
    console.log(this.divRef.current)
  }

  renderMessages = messages => {
    return _.map(messages, message => (
      <Message key={message._id} message={message} />
    ));
  }
  sendMessage = values => {
    const { message } = values;
    const { _id } = getProfile();
    const { currentChat, actions, socket } = this.props;
    actions.postMessage({
      message,
      from: _id,
      to: currentChat.user_id._id,
      chat_id: currentChat._id
    }, actions.destroy, socket);
  }
  render = () => {
    const { messages, loading, currentChat } = this.props;
    if (!currentChat) {
      return null;
    }
   
    return (
      <div ref={this.divRef} style={{ maxWidth: '1000px' }}>
        <div ref={(this.paperRef)} style={{ minHeight: '300px', maxHeight: '500px', overflowY: 'scroll' }}>
          <Paper style={{ display: 'table', width: '100%', padding: '20px'}}>
            {this.renderMessages(messages)}
          </Paper>
        </div>
        <form onSubmit={this.props.handleSubmit(this.sendMessage)}>
          <GridContainer justify='flex-end'>
            <GridItem xs={9} sm={9} md={10}>
              <Field
                type='text'
                name='message'
                labelText='Mensaje'
                id='message'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'text',
                  autoComplete: 'off'
                }}
                required
                component={CustomInput}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={2}>
              <Button type='submit' style={{ marginTop: '10px' }} variant='contained'>Send</Button>
            </GridItem>
          </GridContainer>
        </form>
        {loading && <Progress />}
      </div>
    )
  }
}

export default reduxForm({
  form: 'chatForm'
})(ListMessages);

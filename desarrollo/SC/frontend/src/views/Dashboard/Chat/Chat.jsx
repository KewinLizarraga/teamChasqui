import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Avatar, CardContent, Typography } from '@material-ui/core';
import moment from 'moment'
import 'moment/locale/es'
const style = {
  card: {
    maxWidth: '350px',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.02)'
    }
  },
  selected: {
    backgroundColor: 'rgba(0,0,0,0.1) !important'
  },
  avatar: {
    backgroundColor: '#3e51b5'
  },
  subHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  aReview: {
    cursor: 'pointer'
  },
  cardContent: {
    paddingTop: '0px'
  }
}

class Message extends React.Component {
  getDate = (date) => {
    if (moment().diff(moment(date), 'hours') < 24) {
      return moment(date).format('hh:mm A');
    }
    const localLocale = moment(date);
    return localLocale.format('ddd')
  }
  renderSubHeader = (message, date) => {
    const { classes } = this.props;
    return (
      <div className={classes.subHeader}>
        <span className={classes.date}>{`${message.substr(0, 24)}${message.length < 25 ? '' : '...'}`}</span>
        <span style={{ textAlign: 'right', marginLeft: 'auto' }}>{this.getDate(date)}</span>
      </div>
    );
  }
  handleClick = () => {
    const { actions, chat: { _id } } = this.props;
    actions.fetchMessages(_id);
    actions.setCurrentChat(this.props.chat)
  }
  render = () => {
    const { classes, chat, currentChat } = this.props;
    const cardClass = classNames({
      [classes.card]: true,
      [classes.selected]: currentChat._id === chat._id
    });
    console.log(chat);
    const { user_id: { first_name, last_name, photo }, updatedAt, last_message } = chat;

    if (!last_message) {
      return null;
    }
    return (
      <a onClick={this.handleClick} className={classes.aReview}>
        <Card className={cardClass}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {`${first_name[0]}${last_name[0]}`}
              </Avatar>
            }
            title={`${first_name} ${last_name}`}
            subheader={this.renderSubHeader(last_message, updatedAt)}
          />
        </Card>
      </a>
    );
  }
}

export default withStyles(style)(Message);

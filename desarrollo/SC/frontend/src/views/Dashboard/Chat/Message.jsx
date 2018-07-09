import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Avatar } from '@material-ui/core';
import classNames from 'classnames';
import { getProfile } from '../../../services/AuthService';
const style = {
  card: {
    width: '70%',
    maxWidth: '70%',
    borderRadius: '30px',
    margin: '10px 0px 10px 0px'
  },
  right: {
    float: 'right'
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
  render = () => {
    const { classes, message } = this.props;
    const cardClass = classNames({
      [classes.card]: true,
      [classes.right]: getProfile()._id === message.from,
    })
    return (
      <Card className={cardClass}>
        <CardHeader
          subheader={message.message}
        />
      </Card>
    )
  }
}

export default withStyles(style)(Message);

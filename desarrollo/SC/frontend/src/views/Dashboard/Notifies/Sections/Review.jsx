import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Card, CardHeader, Avatar, CardContent, Typography, Icon } from '@material-ui/core';
import classNames from 'classnames';
import moment from 'moment';
import _ from 'lodash';

const styles = {
  card: {
    maxWidth: 'auto',
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
  date: {
    marginLeft: '10px'
  },
  aReview: {
    cursor: 'pointer'
  },
  cardContent: {
    paddingTop: '0px'
  }
}
class Review extends React.Component {
  renderSubHeader = (stars, createdAt) => {
    const { classes } = this.props;
    
    return (
      <div className={classes.subHeader}>
        {_.map([1, 2, 3, 4, 5], key => (
          <Icon style={{ color: `${key <= stars ? '#3e51b5' : 'rgba(0,0,0,0.2)'}`}} key={key}>star_rate</Icon>
        ))}
        <span className={classes.date}>{moment(createdAt).format('MMM. DD, YYYY hh:mm A')}</span>
      </div>
    )
  }
  // todo: pasar todo a style
  // al dar click hacer rgba(0,0,0,0.5)
  handleClick = () => {
    const { review, currentReview, actions } = this.props;
    if (review._id !== currentReview) {
      actions.setCurrentReview(review._id, review.admin_reply)
    }
  }
  render = () => {
    const { classes, review, currentReview } = this.props;
    const cardClass = classNames({
      [classes.card]: true,
      [classes.selected]: currentReview === review._id
    });
    return (
      <a onClick={this.handleClick} className={classes.aReview}>
        <Card className={cardClass}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {`${review.user_id.first_name[0]}${review.user_id.last_name[0]}`}
              </Avatar>
            }
            title={`"${review.body.title}"`}
            subheader={this.renderSubHeader(review.stars, review.createdAt)}
          />
          <CardContent className={classes.cardContent}>
            <Typography component="p">
              {review.body.message}
            </Typography>
          </CardContent>
        </Card>
      </a>
    );
  }
}

export default withStyles(styles)(Review);

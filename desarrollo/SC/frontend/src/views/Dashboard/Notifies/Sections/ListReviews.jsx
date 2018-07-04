import React from 'react';
import _ from 'lodash';
import Review from './Review';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Progress from '../../../../components/Progress/Progress';

const styles = {
  container: {
    width: '500px'
  },
  listContainer: {
    maxHeight: 520,
    overflowY: 'scroll',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
  }
}

class ListReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  }
  handleChange = (ev, index) => {
    this.setState({
      index
    });
  }
  renderReviews = (reviews, index) => {
    const { currentReview, reviewActions } = this.props;
    let filterReviews = []
    switch (index) {
      case 2: {
        filterReviews = reviews;
        break;
      }
      case 0: {
        filterReviews = _.filter(reviews, review => !review.admin_reply);
        break;
      }
      case 1: {
        filterReviews = _.filter(reviews, review => review.admin_reply);
        break;
      }
      default:
        break;
    }
    return _.map(filterReviews, review => (
      <Review
        key={review._id}
        review={review}
        currentReview={currentReview}
        actions={reviewActions}
      />
    ))
  }
  render = () => {
    const { loading, reviews, classes } = this.props;
    return (
      <div className={classes.container}>
        <AppBar position='static' color='default'>
          <Tabs
            value={this.state.index}
            onChange={this.handleChange}
            indicatorColor='primary'
            textColor='primary'
            fullWidth
          >
            <Tab label='No respondidos' />
            <Tab label='respondidos' />
            <Tab label='Todos' />
          </Tabs>
        </AppBar>
        <div className={classes.listContainer}>
          {this.renderReviews(reviews, this.state.index)}
        </div>
        {loading && <Progress />}
      </div>
    );
  }
}

export default withStyles(styles)(ListReviews);

import React from 'react';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import GridItem from '../../../components/Grid/GridItem';
import { withStyles } from '@material-ui/core/styles';
import planStyle from '../../../assets/jss/material-kit-react/components/planStyle';
import _ from 'lodash';
import classNames from 'classnames';
import { changeCurrentPlan } from '../../../actions/businessActions';

class Plan extends React.Component {
  renderServices = (services) => {
    return _.map(services, service => (
      <li key={service.id}>
        <Typography variant="body1" component="p">
          {`${service.description}.`}
        </Typography>
      </li>
    ))
  }
  handleClick = () => {
    const { id, price_per_month } = this.props.plan;
    this.props.dispatch(changeCurrentPlan({ id, amount: price_per_month }));
  }
  render = () => {
    const { plan, classes, currentPlan } = this.props;
    const cardClass = classNames({
      [classes.planContainer]: true,
      [classes.focus]: currentPlan.id === plan.id
    });
    return (
      <GridItem xs={12} sm={8} md={4} className={classes.focus}>
        <a className={cardClass} onClick={this.handleClick}>
          <Card className={classes.card}>
            <CardContent>
              <Typography color="primary" variant="display2" component="h1">
                {plan.name}
              </Typography>
              <hr />
              <ul style={{ paddingLeft: '10px', height: '196px' }}>
                {this.renderServices(plan.service_plans)}
              </ul>
            </CardContent>
            <hr />
            <CardActions>
              <Typography variant="display1" color="primary" component="h3">
                {`Precio: $${plan.price_per_month.toFixed(2)}`}
              </Typography>
            </CardActions>
          </Card>
        </a>
      </GridItem>
    )
  }
}

export default withStyles(planStyle)(Plan);

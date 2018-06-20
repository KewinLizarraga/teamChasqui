import React from 'react';
import _ from 'lodash';

import Plan from './Plan'
import GridContainer from '../../../components/Grid/GridContainer';
import { fetchPlans } from '../../../actions/businessActions';

class PlanForm extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(fetchPlans())
  }
  renderPlans = (plans, currentPlan, dispatch) => {
    return _.map(plans, plan => (
      <Plan key={plan.id} currentPlan={currentPlan} dispatch={dispatch} plan={plan}/>
    ))
  }
  render = () => {
    // eslint-disable-next-line
    const { dispatch, plans, currentPlan } = this.props;
    return (
      <GridContainer
        style={{
          padding: '10px'
        }}
        justify="center"
      >
        {this.renderPlans(plans, currentPlan, dispatch)}
      </GridContainer>
    )
  }
}

export default PlanForm;

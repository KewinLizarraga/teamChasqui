import React from 'react';

import StripeCheckout from 'react-stripe-checkout';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux';
import { businessPayment } from '../../actions/businessActions';

class Payments extends React.Component {
  handleToken = (token) => {
    this.props.dispatch(businessPayment({
      ...this.props.data,
      stripe_token: token
    }));
  }
  render() {
    return (
      <StripeCheckout
        name='Tinkuy'
        description='Llene sus datos para finalizar el pago'
        amount={this.props.amount*100}
        token={this.handleToken}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Button variant='contained' color='primary'>Pagar</Button>
      </StripeCheckout>
    );
  }
}

const mapStateToProps = ({ business }) => {
  const { currentPlan: { amount }, data } = business;
  return {
    amount,
    data
  }
}

export default connect(mapStateToProps)(Payments);

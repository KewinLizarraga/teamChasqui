import React from 'react';

import StripeCheckout from 'react-stripe-checkout';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux';
import { businessPayment, openDialog } from '../../actions/businessActions';
import { updateToken } from '../../services/AuthService';

class Payments extends React.Component {
  handleToken = (token) => {
    this.props.dispatch(businessPayment({
      ...this.props.data,
      stripe_token: token
    })
    ).then(result => {
      if (result.success) {
        updateToken(result.result.user.token)
        this.props.dispatch(openDialog({
          type: 'success',
          title: 'Informacion',
          message: 'Su negocio se ha registrado con exito.'
        }))
      }
    });
  }
  render() {
    return (
      <StripeCheckout
        name={process.env.REACT_APP_BRAND || 'Tinkuy'}
        description='Llene sus datos para finalizar el pago'
        amount={this.props.amount * 100}
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

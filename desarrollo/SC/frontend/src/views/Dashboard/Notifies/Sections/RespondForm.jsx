import React from 'react';
import { reduxForm, Field, destroy } from 'redux-form';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CustomInput from '../../../../components/CustomInput/CustomInput';

class RespondForm extends React.Component {
  submitReply = (values) => {
    const { currentReview, actions } = this.props;
    actions.submit(values, currentReview);
    // this.props.actions.close();
  }
  render = () => {
    const { open, disabled, actions, handleSubmit } = this.props;
    if (!open) {
      return (
        <div>
          <Button
            variant='contained'
            aria-label='respond'
            color='primary'
            style={{ marginTop: 10 }}
            disabled={disabled}
            onClick={() => actions.open()}
          >
            Responder
          </Button>
        </div>
      )
    }
    return (
      <div>
        <Button
          variant='contained'
          aria-label='respond'
          color='primary'
          style={{ marginTop: 10 }}
          disabled={disabled}
          onClick={() => actions.open()}
        >
          Responder
        </Button>
        <Dialog
          open={open}
          onClose={() => actions.close()}
          fullWidth
        >
          <DialogTitle>Responder</DialogTitle>
          <form onSubmit={handleSubmit(this.submitReply)}>
            <DialogContent>
              <DialogContentText>Escriba el mensaje para la review seleccionada.</DialogContentText>
              <Field
                type='text'
                name='message'
                labelText='Respuesta'
                id='businessName'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'text'
                }}
                required
                component={CustomInput}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => actions.close()} color='primary' >Cancelar</Button>
              <Button type='submit' color='primary' >Enviar</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default reduxForm({
  form: 'reviewForm'
})(RespondForm);

import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions } from '@material-ui/core';
import * as actions from '../../actions/hoursActions';
import { setBusinessHours } from '../../actions/businessActions';
import ListSelectHours from '../SelectHours/ListSelectHours';
import _ from 'lodash';

class CustomDialogForm extends React.Component {

  handleClose = () => {
    this.props.changeOpen(false);
  }
  handleClick = () => {
    this.props.changeOpen(true);
  }
  handleSave = () => {
    const { hours } = this.props.hoursForm;
    const formatedHours = _.map(hours, ({ days, start, end }) => {
      if (!_.isEmpty(days)) {
        return {
          days,
          time: {
            start,
            end
          }
        }
      }
    });
    this.props.setBusinessHours(_.compact(formatedHours));
    this.props.changeOpen(false)
  }

  render = () => {
    const {
      hoursForm,
      title,
      content,
      addHour,
      changeDays,
      changeTime,
      deleteHour,
      buttonText
    } = this.props;
    const { open, hours, selected } = hoursForm;
    return (
      <div >
        <Button onClick={this.handleClick} variant='contained' color='primary' >{buttonText}</Button>
        <Dialog
          fullWidth={true}
          open={open}
          onClose={this.handleClose}
          disableBackdropClick={true}
        >
          <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ marginBottom: '20px' }}>{content}</DialogContentText>
            <ListSelectHours
              hours={hours}
              selected={selected}
              actions={{
                addHour,
                changeDays,
                changeTime,
                deleteHour
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>Cancelar</Button>
            <Button onClick={this.handleSave} color='primary'>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ hoursForm }) => {
  const { hours } = hoursForm;

  return {
    hoursForm: {
      ...hoursForm,
      hours: hours.toJS(),
    }
  }
};

const mapDispatchToProps = {
  ...actions,
  setBusinessHours
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDialogForm);

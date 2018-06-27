import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Icon } from '@material-ui/core';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { closeDialog } from '../../actions/businessActions';
import Button from '@material-ui/core/Button';
import customDialogStyle from '../../assets/jss/material-kit-react/components/customDialogStyle';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';

class CustomDialog extends React.Component {
  handleClose = () => {
    this.props.dispatch(closeDialog());
    if (this.props.redirect) {
      window.location.replace(this.props.redirect);
    }
  }
  render = () => {
    const { classes, dialogInfo } = this.props;
    const { open, message, type, title } = dialogInfo;
    const iconClass = classNames({
      [classes.icon]: true,
      [classes.iconError]: type === 'error',
      [classes.iconSuccess]: type === 'success'
    });
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
        >
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogContent style={{ paddingBottom: '0px' }} >
            <GridContainer >
              <GridItem md={8}>
                <DialogContentText style={{ maxWidth: '100%' }}>{message}</DialogContentText>
              </GridItem>
              <GridItem md={4}>
                <Icon style={{margin: 'auto'}} className={iconClass}>{type === 'success' ? 'check_circle' : 'cancel'}</Icon>
              </GridItem>
            </GridContainer>
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cerrar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ business }) => {
  const { dialogInfo } = business;
  return {
    dialogInfo
  }
}

export default connect(mapStateToProps)(withStyles(customDialogStyle)(CustomDialog));

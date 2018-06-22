import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { clearError } from '../../actions/authActions';

class CustomSnackbar extends React.Component {
  handleClose = () => {
    this.props.dispatch(clearError());
  }

  render = () => {
    const { open, message } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              // className={classes.close}
              onClick={this.handleClose}
            >
              <Icon>close</Icon>
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default CustomSnackbar;

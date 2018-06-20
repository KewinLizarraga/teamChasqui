import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';

import progressStyle from '../../assets/jss/material-kit-react/components/progressStyle';

const Progress = ({ classes, ...props }) => {
  return (
    <div className={classNames(classes.progress, classes.centerItem)}>
      <CircularProgress size={50} />
    </div>
  );
};

export default withStyles(progressStyle)(Progress);

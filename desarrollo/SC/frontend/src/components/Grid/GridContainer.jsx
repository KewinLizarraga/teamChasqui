import React from 'react';

// Thrid party library used by this component.
// import ProtTypes from 'prop-types';
// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// Components used by this component

// Styles for this component
const style = {
  grid: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: 'auto'
  }
};
// Sections for this component

// Component class
const GridContainer = ({ ...props }) => {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid + " " + className} >
      {children}
    </Grid>
  )
}

// ProtTypes for this component
GridContainer.defaultProps = {
  className: ''
}
// Export component
export default withStyles(style)(GridContainer);

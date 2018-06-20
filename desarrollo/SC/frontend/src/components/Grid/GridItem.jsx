import React from 'react';

// Thrid party library used by this component.
// import PropTypes from 'prop-types';
// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// Components used by this component

// Styles for this component
const style = {
  grid: {
    position: 'relative',
    width: '100%',
    minHeigh: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
    flexBasis: 'auto'
  }
};
// Sections for this component

// Component class
const GridItem = ({ ...props }) => {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  )
}

// ProtTypes for this component
GridItem.defaultProps = {
  className: ''
}
// Export component
export default withStyles(style)(GridItem);

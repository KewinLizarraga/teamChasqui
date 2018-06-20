import React from 'react';

// Thrid party library used by this component.

// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

// Components used by this component

// Styles for this component
import iconButtonStyle from '../../assets/jss/material-kit-react/components/iconButtonStyle';
// Sections for this component

// Component class
const IconCustomButton = ({ ...props }) => {
  const { classes, color, children, className, ...rest } = props;
  return (
    <IconButton
      {...rest}
      className={
        classes.button +
        (color ? ' ' + classes[color] : '') +
        (className ? ' ' + className : '')
      }
    >
      {children}
    </IconButton>
  )
}

// ProtTypes for this component

// Export component
export default withStyles(iconButtonStyle)(IconCustomButton);

import React from 'react';

// Thrid party library used by this component.
import classNames from 'classnames';

// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Components used by this component

// Styles for this component
import buttonStyle from '../../assets/jss/material-kit-react/components/buttonStyle';

// Sections for this component

// Component class
const RegularButton = ({ ...props }) => {
  const {
    classes,
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });
  return (
    <Button {...rest} className={btnClasses}>
      {children}
    </Button>
  )

}

// ProtTypes for this component

// Export component
export default withStyles(buttonStyle)(RegularButton);

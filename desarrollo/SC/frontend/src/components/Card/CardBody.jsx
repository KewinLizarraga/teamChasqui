import React from 'react';

// Thrid party library used by this component.
import classNames from 'classnames';
// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
// Components used by this component

// Styles for this component
import cardBodyStyle from '../../assets/jss/material-kit-react/components/cardBodyStyle';
// Sections for this component

// Component class
const CardBody = ({ ...props }) => {
  const { classes, className, children, ...rest } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [className]: className !== undefined
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  )
}

// ProtTypes for this component

// Export component
export default withStyles(cardBodyStyle)(CardBody);

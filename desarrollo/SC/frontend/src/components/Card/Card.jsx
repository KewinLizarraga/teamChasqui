import React from 'react';

// Thrid party library used by this component.
import classNames from 'classnames';
// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
// Components used by this component

// Styles for this component
import cardStyle from '../../assets/jss/material-kit-react/components/cardStyle';
// Sections for this component

// Component class
const Card = ({ ...props }) => {
  const { classes, className, children, plain, carousel, ...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardCarousel]: carousel,
    [className]: className !== undefined
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  )
}

// ProtTypes for this component

// Export component
export default withStyles(cardStyle)(Card);

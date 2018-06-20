import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import cardFooterStyle from '../../assets/jss/material-kit-react/components/cardFooterStyle';

const CardFooter = ({ ...props }) => {
  const { classes, className, children, ...rest } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [className]: className !== undefined
  })
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  )
}

export default withStyles(cardFooterStyle)(CardFooter);

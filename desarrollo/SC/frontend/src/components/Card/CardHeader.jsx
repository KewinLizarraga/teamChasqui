import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import cardHeaderStyle from '../../assets/jss/material-kit-react/components/cardHeaderStyle';

const CardHeader = ({ ...props }) => {
  const { classes, className, children, color, plainCard, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + 'CardHeader']]: color,
    [classes.cardHeaderPlain]: plainCard,
    [className]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

export default withStyles(cardHeaderStyle)(CardHeader);

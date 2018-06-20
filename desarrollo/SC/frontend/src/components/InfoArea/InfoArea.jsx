import React from 'react';

// Thrid party library used by this component.
// import PropTypes from 'prop-types';
import classNames from 'classnames';
// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

// Components used by this component

// Styles for this component
import infoStyle from '../../assets/jss/material-kit-react/components/infoStyle';

// Sections for this component

// Component class
const InfoArea = ({ ...props }) => {
  const { classes, title, description, iconColor, vertical } = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical
  });
  return (
     <div className={classes.infoArea}>
      <div className={iconWrapper}>
        <Icon className={iconClasses}>{props.icon}</Icon>
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  )
}

// ProtTypes for this component
InfoArea.defaultProps = {
  iconColor: 'gray'
};


// Export component
export default withStyles(infoStyle)(InfoArea);

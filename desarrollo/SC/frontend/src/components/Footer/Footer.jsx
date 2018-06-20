import React from 'react';

// Thrid party library used by this component.
import classNames from 'classnames';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
// Components used by this component

// Styles for this component
import footerStyle from '../../assets/jss/material-kit-react/components/footerStyle';

// Sections for this component

//content
import footerContent from './content';

// Component class
const Footer = ({ ...props }) => {
  const { links, data } = footerContent;
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {links.map(link => (
              <ListItem key={link.id} className={classes.inlineBlock}>
                <Link to={link.to} className={classes.block}>
                  {data[link.id]}
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , {`${data.madewith} `}
          <Icon className={classes.icon} >favorite</Icon> {`${data.by} `}
          <Link to={links[0].to} className={aClasses}>
            {data.team}
          </Link>
          {` ${data.for}.`}
        </div>
      </div>
    </footer>
  )
}

// ProtTypes for this component

// Export component
export default withStyles(footerStyle)(Footer);

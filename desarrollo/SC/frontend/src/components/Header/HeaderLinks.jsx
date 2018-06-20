import React from 'react';

// Thrid party library used by this component.
import { Link as Linker } from 'react-router-dom';
import { connect } from 'react-redux';

import {loggedIn} from '../../services/AuthService';

// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';

// Components used by this component
import Button from '../CustomButtons/Button';
import IconButton from '../CustomButtons/IconButton';
import CustomDropdown from '../CustomDropdown/CustomDropdown';

import { logout } from '../../actions/authActions';

// Styles for this component
import headerLinksStyle from '../../assets/jss/material-kit-react/components/headerLinksStyle';

// Sections for this component

// Component class
const HeaderLinks = ({ ...props }) => {
  const links = [
    { type: 'iconButton', id: 'facebook', name: 'facebook', icon: 'fab fa-facebook', to: 'https://facebook.com', onlyWhen: 'disconnected' },
    { type: 'iconButton', id: 'instagram', name: 'instagram', icon: 'fab fa-instagram', to: 'https://instagram.com', onlyWhen: 'disconnected' },
    { type: 'iconButton', id: 'twitter', name: 'twitter', icon: 'fab fa-twitter', to: 'https://twitter.com', onlyWhen: 'disconnected' },
    { type: 'iconTextButton', id: 'login', name: 'Iniciar sesion', icon: 'person', to: '/login', onlyWhen: 'disconnected' },
    { type: 'iconTextButton', id: 'register', name: 'Registrarse', icon: 'person_add', to: '/register', onlyWhen: 'disconnected' },
    {
      type: 'iconButton',
      id: 'notify',
      name: 'Notificaciones',
      icon: 'fas fa-bell',
      to: '#',
      onlyWhen: 'connected'
    }, {
      type: 'dropdownButton',
      id: 'registerBusiness',
      name: 'Registrar Negocio',
      icon: 'business',
      onlyWhen: 'connected',
      options: [{
        id: 'hotel',
        name: 'HOTEL',
        type: 'link',
        to: '/registerBusiness/hotel'
      }, {
        id: 'restaurant',
        name: 'RESTAURANTE',
        type: 'link',
        to: '/registerBusiness/restaurant'
      }, {
        id: 'travel_agency',
        name: 'AGENCIA DE VIAJE',
        type: 'link',
        to: '/registerBusiness/travel_agency'
      }]
    }, {
      type: 'dropdownButton',
      id: 'profile',
      name: 'Perfil',
      icon: 'face',
      options: [{
        id: 'profile',
        name: 'PERFIL',
        type: 'link',
        to: '/profile'
      }, {
        id: 'logout',
        name: 'Cerrar sesión',
        type: 'action',
        action: (dispatch, event) => {
          dispatch(logout());
        }
      }],
      onlyWhen: 'connected'
    }
  ]
  const userStatus = loggedIn() ? 'connected': 'disconnected';
  const { classes } = props;

  const makeIconButton = (link) => {
    return (
      <IconButton
        href={link.to}
        target="_blank"
        color="transparent"
        className={classes.navLink + ' ' + classes.socialIconsButton}
      >
        <i className={classes.socialIcons + ` ${link.icon}`} />
        <Hidden mdUp>
          &nbsp;{link.id}
        </Hidden>
      </IconButton>
    )
  }
  const makeIconTextButton = (link) => {
    return (
      <Button
        href={link.to}
        color="transparent"
        className={classes.navLink}
      >
        <Icon>{link.icon}</Icon>{link.name}
      </Button>
    )
  }
  const makeDropdownList = (options, dispatch) => {
    return options.map(option => {
      if (option.type === 'link') {
        return (
          <Linker style={{
            display: 'block',
            width: '160px',
            padding: '10px 0px',
            textAlign: 'center'
          }} to={option.to} className={classes.dropdownLink} >{option.name}</Linker>
        )
      }
      return (
        <Button
          style={{ padding: '0', margin: '0' }}
          color='transparent'
          className={classes.navLink}
          onClick={option.action.bind(this, dispatch)}
        >
          {option.name}
        </Button>
      )
    })
  }
  const makeDropdownButton = (link, dispatch) => {
    return (
      <CustomDropdown
        buttonText={link.name}
        buttonProps={{
          className: classes.navLink,
          color: "transparent"
        }}
        buttonIcon={link.icon}
        dropdownList={makeDropdownList(link.options, dispatch)}
      />
    )
  }
  return (
    <List className={classes.list}>
      {links.map(link => {
        if (link.onlyWhen === userStatus) {
          return (
            <ListItem key={link.id} className={classes.listItem}>
              {
                link.type === 'iconTextButton' ? (
                  makeIconTextButton(link)
                ) : (
                  link.type === 'iconButton' ? (
                    makeIconButton(link)
                  ) : (
                    makeDropdownButton(link, props.dispatch)
                  )
                )
              }
            </ListItem>
          )
        }
        return null;
      })}
    </List>
  )
}

// ProtTypes for this component

// Export component
export default connect(({ auth }) => ({ auth }))(withStyles(headerLinksStyle)(HeaderLinks));

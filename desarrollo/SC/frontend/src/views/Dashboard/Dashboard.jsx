import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem, ListItemText, ListItemIcon, Icon } from '@material-ui/core';
import HeaderLinks from '../../components/Header/HeaderLinks';
import Header from '../../components/Header/Header';
import links from './links';
import _ from 'lodash';
import { loggedIn } from '../../services/AuthService';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './Home'
import Profile from './Profile';
import Notifies from './Notifies/Notifies';
import Footer from '../../components/Footer/Footer';
import Progress from '../../components/Progress/Progress';

// import ListItem from '@material-ui/core/ListItem'

class Dashboard extends React.Component {
  componentWillMount = () => {
    if (!loggedIn()) {
      this.props.history.push('/login')
    }
  }
  handleClick = (to) => {
    this.props.history.push(to)
  }

  renderListLinks = (links) => {
    return _.map(links, ({ id, name, icon, to }) => (
      <ListItem key={id} button onClick={this.handleClick.bind(null, to)} divider>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    ))
  }
  render = () => {
    if (!loggedIn()) {
      return null;
    }
    return (
      <div style={{
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
      }}>
        <Header
          brand={process.env.REACT_APP_BRAND || 'Tinkuy'}
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: 'white'
          }}
        />
        <Drawer
          variant='permanent'
          style={{
            zIndex: 1,
            position: 'relative',
            width: 240
          }}
        >
          <div style={{ height: '84px', width: 240 }} />
          <List>
            {this.renderListLinks(links)}
          </List>
        </Drawer>
        <main style={{ width: '100%', padding: '20px' }}>
          <div style={{ height: '84px' }} />
          <Switch>
            <Route path='/dashboard/home' component={Home} />
            <Route path='/dashboard/profile' component={Profile} />
            <Route path='/dashboard/notifies' component={Notifies} />
            <Redirect from='/dashboard/' to={loggedIn() ? '/dashboard/home' : '/login'} />
          </Switch>
          <Footer />
        </main>
      </div>
    )
  }
}

export default Dashboard;

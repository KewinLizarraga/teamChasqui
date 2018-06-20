import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import indexRoutes from '../../routes/index';
import Header from '../Header/Header';
import HeaderLinks from '../Header/HeaderLinks';

const Root = ({ store }) => {
  return (
    <Provider store={store} >
      <Router>
        <div>
          <Header
            color="transparent"
            brand={process.env.REACT_APP_BRAND || 'Chasqui'}
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
              height: 200,
              color: 'white'
            }}
          />
          <Switch>
            {indexRoutes.map((prop, key) => {
              return <Route key={key} {...prop} />
            })}
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;

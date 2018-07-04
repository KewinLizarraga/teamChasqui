import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import indexRoutes from '../../routes';

const Root = ({ store }) => {
  return (
    <Provider store={store} >
      <Router>
        <div>
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

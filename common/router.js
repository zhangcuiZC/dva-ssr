import React from 'react';
import { Router, Route } from 'dva/router';
import App from './routes/App';
import User from './routes/User';
import About from './routes/About';
import user from './models/user';
import group from './models/group';

function RegisterModel(model) {
	if (!global.DvaApp) {
		return;
	}
	if (!(global.DvaApp._models.filter(m => m.namespace === model.namespace).length === 1)) { //eslint-disable-line
		global.DvaApp.model(model);
	}
}

if (typeof require.ensure !== 'function') {
  require.ensure = function(dependencies, callback) {
    callback(require)
  }
}

export const routes = [{
  path: '/',
  getChildRoutes(location, callback) {
    callback(null, [
      {
        path: 'about',
        getComponent(location, callback) {
          callback(null, About);
        },
      },
    ]);
  },
  getIndexRoute(location, callback) {
  	RegisterModel(user);
    RegisterModel(group);
    require.ensure([], (require) => {
    	callback(null, {component: User});
    }, 'user');	
  },
  getComponent(location, callback) { 
      callback(null, App);
  },
}];

export default function({ history }) {
  return (
    <Router history={history}>
      { routes }
    </Router>
  );
}

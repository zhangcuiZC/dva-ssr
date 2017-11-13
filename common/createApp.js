import React from 'react';
import dva from 'dva';
import { RouterContext } from 'dva/router';
import router from './router';

export default function createApp(opts, models) {
  const app = dva(opts);
  if (models) {
  	models.map(function(item, index) {
  		app.model(item);
  	})
  }

  app.router(({ history, renderProps}) => {
    return <RouterContext {...renderProps} />;
  });
  return app;
}

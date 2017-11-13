import { browserHistory } from 'dva/router';
import dva from 'dva';
// import createLoading from 'dva-loading';
import router from '../common/router';

const app = dva({
	history: browserHistory,
	initialState: window.__INITIAL_STATE__
});

global.DvaApp = app;

// app.use(createLoading());

app.router(router);

app.start('#root');

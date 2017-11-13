import { match, RoutingContext, createMemoryHistory } from 'dva/router';
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { fetchList } from '../common/services/user';
import { routes } from '../common/router';
import createApp from '../common/createApp';
import initialStateMap from './initialStateMap';

export default function(req, res) {
  match({
    routes,
    location: req.url,
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const pathname = renderProps.location.pathname;
      if (initialStateMap[pathname]) {
        const initMap = [];
        initialStateMap[pathname].map(function(item, index) {
          if (item.getInitialState) {
            initMap.push(item.getInitialState());
          }
        });
        Promise.all(initMap).then((data) => {
          const initialState = Object.assign({}, ...data);
          const app = createApp({
            history: createMemoryHistory(),
            initialState: initialState,
          }, initialStateMap[pathname]);
          const html = renderToString(app.start()({ renderProps }));
          res.end(renderFullPage(html, initialState));
        }, (err) => {
          res.status(500).end(`Error`);
        })
      }else {
        res.status(500).end(`Uncaught pathname: ${renderProps.location.pathname}`);
      }
    } else {
      res.status(404).send('Not found')
    }
  });
}

function renderFullPage(html, initialState) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="/static/index.css" />
</head>
<body>
  <div id="root">
    <div>
      ${html}
    </div>
  </div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
  </script>
  <script src="/static/index.js"></script>
</body>
</html>
  `;
}

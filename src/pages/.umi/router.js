import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/dashboard/analysis",
        "exact": true,
        "component": require('../dashboard/analysis.js').default
      },
      {
        "path": "/dashboard/card",
        "exact": true,
        "component": require('../dashboard/card/index.js').default
      },
      {
        "path": "/dashboard/order",
        "exact": true,
        "component": require('../dashboard/order/index.js').default
      },
      {
        "path": "/dashboard/product",
        "exact": true,
        "component": require('../dashboard/product/index.js').default
      },
      {
        "path": "/dashboard/stores",
        "exact": true,
        "component": require('../dashboard/stores/index.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "component": () => React.createElement(require('C:/Users/zzp/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('C:/Users/zzp/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];

export default function() {
  return (
<Router history={window.g_history}>
      <Route render={({ location }) =>
        renderRoutes(routes, {}, { location })
      } />
    </Router>
  );
}

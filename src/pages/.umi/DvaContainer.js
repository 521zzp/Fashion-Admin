import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());
app.use(require('D:/Developer/project/Fashion-Admin/node_modules/dva-immer/lib/index.js').default());
app.model({ namespace: 'global', ...(require('D:/Developer/project/Fashion-Admin/src/models/global.js').default) });
app.model({ namespace: 'analysis', ...(require('D:/Developer/project/Fashion-Admin/src/pages/dashboard/models/analysis.js').default) });
app.model({ namespace: 'stores', ...(require('D:/Developer/project/Fashion-Admin/src/pages/dashboard/stores/models/stores.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;

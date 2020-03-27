import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './helpers';

import NotFound from './views/pages/notFound';
import Dashboard from './views/pages/dashboard';
import Upload from './views/pages/upload';

export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/upload" component={Upload}></Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;

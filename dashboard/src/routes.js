import React from 'react';
import { Switch, Route, Redirect, HashRouter as Router } from 'react-router-dom';

import HomePage from 'containers/Home';
import TaskPage from './views/Task';

const supportsHistory = 'pushState' in window.history;

const AppRouter = () => (
  <Router basename="/" forceRefresh={!supportsHistory}>
		<Switch>
			<Route exact path="/" render={() => <Redirect to="/task" />} />
			<Route path="/home" component={HomePage} />
      <Route path="/task" component={TaskPage} />
      {/* <Route path="/center" component={CenterPage} /> */}
    </Switch>
  </Router>
);

export default AppRouter;

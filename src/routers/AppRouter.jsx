import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/:builderId/:projectId/:layoutName" exact component={App} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;

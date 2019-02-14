import React from 'react';
import { Router } from '@reach/router';
import { hot } from 'react-hot-loader';
import TaskPage from './Task';
import ProjectPage from './Project';
import HomePage from './Home';

const AppRouter = () => (
  <Router>
    <HomePage path="/">
      <TaskPage path="task" />
      <ProjectPage path="project" default />
    </HomePage>
  </Router>
);

export default hot(module)(AppRouter);

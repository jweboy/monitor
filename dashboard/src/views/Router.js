import React from 'react';
import { Router } from '@reach/router';

import TaskPage from './Task';
import ProjectPage from './Project';
import HomePage from './Home';

const AppRouter = () => (
  <Router>
    <HomePage path="/" />
    <ProjectPage path="project" />
    <TaskPage path="task" />
  </Router>
);

export default AppRouter;

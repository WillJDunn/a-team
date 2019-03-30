import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from './login/LoginPage';
import HomePage from './HomePage';
import ProjectsPage from './projects/ProjectsPage';
import BoardPage from './boards/BoardPage';


const Routes = () => (
  <Router>
    <div>
      <Route path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/projects" component={ProjectsPage} />
      <Route exact path="/projects/:projectId/boards/:boardId" component={BoardPage} />
    </div>
  </Router>
);

export default Routes;

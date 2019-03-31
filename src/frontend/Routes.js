import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import ProjectsPage from './projects/ProjectsPage';
import BoardContainer from './boards/BoardContainer';


const Routes = () => (
  <Router>
    <div>
      <Route path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/projects" component={ProjectsPage} />
      <Route exact path="/projects/:projectId" component={ProjectsPage} />
      <Route exact path="/projects/:projectId/boards/:boardId" component={BoardContainer} />
    </div>
  </Router>
);

export default Routes;

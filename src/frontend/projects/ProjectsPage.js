import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsPage = () => (
  <React.Fragment>
    <Link to="/">Back to Home</Link>
    <div>Projects Page</div>
    {[1, 2, 3, 4, 5].map(i => <div><Link to={`/projects/${i}`}>{`Project ${i}`}</Link></div>)}
  </React.Fragment>
);

export default ProjectsPage;

import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsPage = () => (
  <React.Fragment>
    <Link to="/">Back to Home</Link>
    <div>Projects Page</div>
    {[1, 2, 3, 4, 5].map(i => {
      const link = `/projects/${i}`;
      return <div key={link}><Link to={link}>{`Project ${i}`}</Link></div>
    })}
  </React.Fragment>
);

export default ProjectsPage;

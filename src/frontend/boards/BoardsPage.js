import React from 'react';
import { Link } from 'react-router-dom';

const BoardsPage = props => {
  const projectId = props.match.params.projectId;
  return (
    <React.Fragment>
      <Link to="/projects/">Projects</Link>
      <div>Project {projectId}</div>
      <div>Boards Page</div>
      {[1, 2, 3, 4, 5].map(i => {
        const link = `/projects/${projectId}/boards/${i}`;
        return <div key={link}><Link to={link}>{`Board ${i}`}</Link></div>;
      })}
    </React.Fragment>
  )
};

export default BoardsPage;

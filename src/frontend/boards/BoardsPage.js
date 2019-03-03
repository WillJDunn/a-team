import React from 'react';
import { Link } from 'react-router-dom';

const BoardsPage = props => {
  const projectId = props.match.params.projectId;
  return (
    <React.Fragment>
      <Link to="/projects/">Projects</Link>
      <div>Boards Page</div>
      {[1, 2, 3, 4, 5].map(i => <div><Link to={`/projects/${projectId}/boards/${i}`}>{`Board ${i}`}</Link>
      </div>)}
    </React.Fragment>
  )
};

export default BoardsPage;

import React from 'react';
import { Link } from 'react-router-dom';

const BoardPage = props => {
  const projectId = props.match.params.projectId;
  const boardId = props.match.params.boardId;
  return (
    <React.Fragment>
      <Link to={`/projects/${projectId}/boards`}>Back to Boards</Link>
      <div>Board {boardId} Page for Project {projectId}</div>
    </React.Fragment>
  );
}

export default BoardPage;

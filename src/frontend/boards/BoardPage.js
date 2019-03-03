import React from 'react';

const BoardPage = props => {
  const projectId = props.match.params.projectId;
  const boardId = props.match.params.boardId;
  return (
    <div>Board {boardId} Page for Project {projectId}</div>
  );
}

export default BoardPage;

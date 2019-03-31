import React, { useState, useEffect } from 'react';
import BoardPage from './BoardPage';
import PropTypes from 'prop-types';

const useProject = projectId => {
  const [project, setProject] = useState(undefined);
  useEffect(() => {
    console.log('fetching project');
    fetch(`/api/projects/${projectId}`)
      .then(res => {
        if (res.status / 100 !== 2) {
          throw new Error('Retrieve project failed!');
        }
        return res.json();
      })
      .then(project => {
        console.log(project);
        return project;
      })
      .then(project => setProject({ ...project }))
      .catch(console.error);
  }, [projectId]);
  return [project];
};

const useBoard = (projectId, boardId) => {
  const [board, setBoard] = useState(undefined);
  useEffect(() => {
    console.log('fetching board');
    fetch(`/api/projects/${projectId}/boards/${boardId}`)
      .then(res => {
        if (res.status / 100 !== 2) {
          throw new Error('Retrieve board failed!');
        }
        return res.json();
      })
      .then(board => {
        console.log(board);
        return board;
      })
      .then(board => setBoard({ ...board }))
      .catch(console.error);
  }, [projectId, boardId]);
  return [board];
};

const BoardContainer = props => {
  const { projectId, boardId } = props.match.params;
  console.log(projectId, boardId);
  const [board] = useBoard(projectId, boardId);
  const [project] = useProject(projectId);
  console.log(project, board);
  return (board && project) ? <BoardPage board={board} project={project} /> : null;
};

BoardContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string.isRequired,
      boardId: PropTypes.string.isRequired,
    }),
  }),
};

export default BoardContainer;

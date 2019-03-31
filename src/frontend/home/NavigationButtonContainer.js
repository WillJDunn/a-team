import React from 'react';
import { withRouter } from 'react-router-dom';
import { useBoards } from '../hooks/boards';
import { useProjects } from '../hooks/projects';
import NavigationButton from './NavigationButton';

const NavigationButtonContainer = props => {
  const pathname = props.location.pathname;
  const isHomePage = pathname !== '/projects';
  const projectsPattern = new RegExp('/projects/\\d+$');
  const isProjects = projectsPattern.test(pathname);
  const boardPattern = new RegExp('/projects/(\\d+)/boards/(\\d+)');
  const isBoard = boardPattern.test(pathname);
  let projectId = undefined;
  let boardId = undefined;
  if (isBoard) {
    const matches = pathname.match(boardPattern);
    projectId = matches[1];
    boardId = matches[2];
  }
  const [projects] = useProjects();
  const [boards] = useBoards(projectId);
  const board = (boardId && boards) ?
    boards.find(board => board.id.toString() === boardId) :
    undefined;
  const project = (projectId && projects) ?
    projects.find(project => project.id.toString() === projectId) :
    undefined;
  return (
    <NavigationButton board={board} project={project}/>
  )
};

export default withRouter(NavigationButtonContainer);

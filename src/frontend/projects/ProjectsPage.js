import React, { useState } from 'react';
import ProjectsList from './ProjectsList';
import CreateProjectWidget from './CreateProjectWidget';
import BoardsList from '../boards/BoardsList';
import CreateBoardWidget from '../boards/CreateBoardWidget';
import Row from '../common/Row';
import Column from '../common/Column';
import Paper from '@material-ui/core/Paper';
import { useProjects } from '../hooks/projects';
import { useBoards } from '../hooks/boards';

const _style = {
  root: {
    margin: '32px 0 0 32px',
  },
  column: {
    padding: 12,
    width: 250,
  },
  list: {
    height: 500,
    overflowY: 'auto',
  },
};

const getProjectNameFromId = (projects, id) => {
  if (!projects || projects.length === 0 || !id) {
    return '';
  }
  return projects.find(p => p.id === id).name;
};

const ProjectsPage = props => {
  const [projects, createProject] = useProjects();
  const [selectedProject, setSelectedProject] = useState(undefined);
  const [boards, createBoard] = useBoards(selectedProject);
  const handleProjectClick = id => {
    setSelectedProject(id);
  };
  const handleBoardClick = projectId => boardId =>
    props.history.push(`/projects/${projectId}/boards/${boardId}`);
  return (
    <React.Fragment>
      <Row style={_style.root}>
        <Paper>
            <Column style={_style.column}>
              <div style={_style.list}>
                <ProjectsList onClick={handleProjectClick} projects={projects} />
              </div>
              <CreateProjectWidget onSubmit={createProject} />
            </Column>
        </Paper>
        <Paper>
          <Column style={_style.column}>
            <div style={_style.list}>
              <BoardsList boards={boards} onClick={handleBoardClick(selectedProject)}/>
            </div>
          <CreateBoardWidget
            onSubmit={createBoard(selectedProject)}
            projectName={getProjectNameFromId(projects, selectedProject)}
            disabled={selectedProject === undefined}
          />
          </Column>
        </Paper>
      </Row>
    </React.Fragment>
  );
};

export default ProjectsPage;

import React, { useState, useEffect } from 'react';
import ProjectsList from './ProjectsList';
import CreateProjectWidget from './CreateProjectWidget';
import BoardsList from '../boards/BoardsList';
import CreateBoardWidget from '../boards/CreateBoardWidget';
import Button from '@material-ui/core/Button';
import Row from '../common/Row';
import Column from '../common/Column';
import Paper from '@material-ui/core/Paper';

const _style = {
  column: {
    padding: 12,
    width: 250,
  },
  list: {
    height: 500,
    overflowY: 'auto',
  },
};

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(setProjects);
  }, []);
  const createProject = (name, description) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    };
    fetch('/api/projects', options)
      .then(response => {
        console.log(response);
        if (response.status / 100 !== 2) {
          throw new Error('Create project failed!')
        }
        return response;
      })
      .then(res => res.text())
      .then(id => setProjects([...projects, { id, name, description }]))
      .catch(console.error);
  };
  return [projects, createProject];
};

const useBoards = projectId => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    if (!projectId) {
      return;
    }
    fetch(`/api/projects/${projectId}/boards`)
      .then(res => res.json())
      .then(setBoards);
  }, [projectId]);
  const createBoard = projectId => (name, description) => {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    };
    fetch(`/api/projects/${projectId}/boards`, opts)
      .then(res => {
        if (res.status / 100 !== 2) {
          throw new Error('Create new board failed!');
        }
        return res.text();
      })
      .then(id => setBoards([...boards, { id, name, description }]))
      .catch(console.error);
  };
  return [boards, createBoard];
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
      <Button onClick={() => props.history.push('/')}>
        Back to Home
      </Button>
      <Row>
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

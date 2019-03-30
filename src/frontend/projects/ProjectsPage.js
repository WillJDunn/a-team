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
        if (response.status / 100 !== 2) {
          console.log('Create project failed!');
        } else {
          console.log('Create project succeeded!');
        }
        return response;
      })
      .then(res => res.text())
      .then(id => setProjects([...projects, { id, name, description }]));
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
      .then(res => res.text())
      .then(id => setBoards([...boards, { id, name, description }]));
  };
  return [boards, createBoard];
};

// FIXME make the create project and create board buttons more intelligent.  If the user clicks
// somewhere outside of the dialog it should just close, not submit anything
const ProjectsPage = props => {
  const [projects, createProject] = useProjects();
  const [selectedProject, setSelectedProject] = useState(undefined);
  const [boards, createBoard] = useBoards(selectedProject);
  const handleClick = id => {
    setSelectedProject(id);
  };
  return (
    <React.Fragment>
      <Button onClick={() => props.history.push('/')}>
        Back to Home
      </Button>
      <Row>
        <Paper>
            <Column style={_style.column}>
              <div style={_style.list}>
                <ProjectsList onClick={handleClick} projects={projects} />
              </div>
              <CreateProjectWidget onSubmit={createProject} />
            </Column>
        </Paper>
        <Paper>
          <Column style={_style.column}>
            <div style={_style.list}>
              <BoardsList boards={boards} />
            </div>
          <CreateBoardWidget onSubmit={createBoard(selectedProject)} />
          </Column>
        </Paper>
      </Row>
    </React.Fragment>
  );
};

export default ProjectsPage;

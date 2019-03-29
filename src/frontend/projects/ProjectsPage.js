import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectsList from './ProjectsList';
import CreateProjectWidget from './CreateProjectWidget';
import BoardsList from '../boards/BoardsList';
import CreateBoardWidget from '../boards/CreateBoardWidget';

const _style = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: 250,
  },
  projects: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
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
const ProjectsPage = () => {
  const [projects, createProject] = useProjects();
  const [selectedProject, setSelectedProject] = useState(undefined);
  const [boards, createBoard] = useBoards(selectedProject);
  const handleClick = id => {
    console.log(`Project id ${id} clicked on`);
    setSelectedProject(id);
  };
  return (
    <React.Fragment>
      <Link to="/">Back to Home</Link>
      <div style={_style.root}>
        <div>
            <div style={_style.projects}>
              <ProjectsList onClick={handleClick} projects={projects} />
            </div>
          <CreateProjectWidget onSubmit={createProject} />
        </div>
        <div>
          <div style={_style.boards}>
            <BoardsList boards={boards} />
          </div>
          <CreateBoardWidget onSubmit={createBoard(selectedProject)} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectsPage;

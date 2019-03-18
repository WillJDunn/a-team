import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectsList from './ProjectsList';
import CreateProjectWidget from './CreateProjectWidget';

const _style = {
  root: {
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

const useBoards = () => {
  const [boards, setBoards] = useState([]);
  const getBoards = projectId => {
    fetch(`/api/${projectId}/boards`)
      .then(res => res.json())
      .then(setBoards);
  };
  const createBoard = (projectId, name, description) => {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(name, description),
    };
    fetch(`/api/${projectId}/boards`, opts)
      .then(res => res.text())
      .then(id => setBoards([...boards, { id, name, description }]));
  };
  return [boards, createBoard];
};

const ProjectsPage = () => {
  const [projects, createProject] = useProjects();
  const [boards, createBoard] = useBoards();
  return (
    <React.Fragment>
      <Link to="/">Back to Home</Link>
      <div>Projects Page</div>
      <div>
        <div style={_style.root}>
          <ProjectsList projects={projects} />
        </div>
      </div>
      <CreateProjectWidget onSubmit={createProject} />
    </React.Fragment>
  );
};

export default ProjectsPage;

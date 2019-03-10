import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const _style = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
  },
};

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
        console.log('FAILURE');
      } else {
        console.log('SUCCESS!');
      }
      return response;
    })
    .then(response => response.text())
    .then(projectId => console.log(projectId));
};

const ProjectsPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState([]);
  const getProjects = () => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(projects => setProjects(projects));
  };
  return (
    <React.Fragment>
      <Link to="/">Back to Home</Link>
      <div>Projects Page</div>
      <div style={_style.root}>
        <TextField
          label="Project Name"
          value={name}
          onChange={evt => setName(evt.target.value)}
        />
        <TextField
          label="Project Description"
          multiline
          rowsMax="4"
          value={description}
          onChange={evt => setDescription(evt.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          disabled={!Boolean(name && description)}
          onClick={() => createProject(name, description)}
          color="primary"
        >
          SUBMIT
        </Button>
      </div>
      <div>
        <div style={_style.root}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => getProjects()}
            color="primary"
          >
            RETRIEVE PROJECTS
          </Button>
          <div>Projects</div>
          {projects.map(project => <div>{project.name}</div>)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectsPage;

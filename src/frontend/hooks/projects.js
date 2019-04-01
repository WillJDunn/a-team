import { useState, useEffect } from 'react';

export const useProjects = () => {
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


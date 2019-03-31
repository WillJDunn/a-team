import { useState, useEffect } from 'react';

export const useBoards = projectId => {
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

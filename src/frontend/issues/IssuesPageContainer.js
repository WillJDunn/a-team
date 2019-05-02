import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IssuesPage from './IssuesPage';

const useItems = (project, board) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`/api/projects/${project.id}/boards/${board.id}/items?type=issue`)
      .then(res => res.json())
      .then(items => setItems([...items]));
  }, []);
  const createItem = item => {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    };
    fetch(`/api/projects/${item.projectId}/boards/${item.boardId}/items`, opts)
      .then(res => res.text())
      .then(() => setItems([...items, item]))
  };
  return [items, setItems, createItem];
};

const useStatuses = (project, board) => {
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    fetch(`/api/projects/${project.id}/boards/${board.id}/statuses`)
      .then(res => res.json())
      .then(statuses => setStatuses([...statuses]))
  }, []);
  return [statuses, setStatuses];
};

const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users/')
      .then(res => res.json())
      .then(users => setUsers([...users]))
  }, []);
  return [users];
};

const usePriorities = projectId => {
  const [priorities, setPriorities] = useState([]);
  useEffect(() => {
    fetch(`/api/projects/${projectId}/priorities`)
      .then(res => res.json())
      .then(priorities => setPriorities([...priorities]));
  }, []);
  return [priorities];
};


const IssuesPageContainer = props => {
  const { project, board } = props;
  const [items, _, createItem] = useItems(project, board);
  const [statuses] = useStatuses(project, board);
  const [users] = useUsers();
  const [priorities] = usePriorities(project.id);
  return (
    <IssuesPage
      statuses={statuses}
      items={items}
      project={project}
      board={board}
      priorities={priorities}
      users={users}
      onCreateItem={createItem}
    />
  )
};

IssuesPageContainer.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
  }),
  board: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
  }),
};

export default IssuesPageContainer;

import React, { useState, useEffect } from 'react';
import Item from './Item';
import PropTypes from 'prop-types';

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

const ItemContainer = props => {
  const [users] = useUsers();
  const [priorities] = usePriorities(props.project.id);
  return (
    <Item {...props} users={users} statuses={props.statuses} priorities={priorities} />
  )
};

ItemContainer.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
  }),
};

export default ItemContainer;

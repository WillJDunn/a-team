import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RequirementsPage from './RequirementsPage';

const RequirementsPageContainer = props => {
  const { project, board } = props;
  const [statuses, setStatuses] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`/api/projects/${project.id}/boards/${board.id}/statuses`)
      .then(res => res.json())
      .then(statuses => setStatuses([...statuses]))
  }, []);
  useEffect(() => {
    fetch(`/api/projects/${project.id}/boards/${board.id}/items`)
      .then(res => res.json())
      .then(items => setItems([...items]));
  }, []);
  console.log(items);
  return (
    <RequirementsPage statuses={statuses} items={items} />
  )
};

RequirementsPageContainer.propTypes = {
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

export default RequirementsPageContainer;

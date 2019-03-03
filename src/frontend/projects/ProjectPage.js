import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProjectPage = props => (
  <React.Fragment>
    <Link to="/projects/">Projects</Link>
    <div>Project {props.match.params.projectId}</div>
    <Link to={`/projects/${props.match.params.projectId}/boards`}>Boards</Link>
  </React.Fragment>
);

ProjectPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string.isRequired,
    }),
  }),
};

export default ProjectPage;

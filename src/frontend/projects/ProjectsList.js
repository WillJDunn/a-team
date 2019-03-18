import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ProjectsList = props => {
  return (
    <React.Fragment>
      <div>Projects</div>
      <List>
        {props.projects.map(project => (
          <ListItem button key={`project_${project.id}`}>
            <ListItemText primary={project.name} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.array,
};

export default ProjectsList;

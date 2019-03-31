import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const _style = {
  text: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 16,
  },
};

const NavigationButton = props => {
  const { project, board, history } = props;
  const components = [];
  if (project) {
    components.push(
      <Button key='projectsButton' onClick={() => history.push('/projects')}>
        Projects
      </Button>
    );
    components.push('>');
    components.push(
      <Button key='projectButton' disabled style={{ color: 'black' }}>
        {project.name}
      </Button>
    );
  }
  if (board) {
    components.push('>');
    components.push(
      <Button key='boardButton' disabled style={{ color: 'black' }}>
        {board.name}
      </Button>
    );
  }
  return (
    <div style={_style.text}>
      {components}
    </div>
  );
};

NavigationButton.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  board: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default withRouter(NavigationButton);

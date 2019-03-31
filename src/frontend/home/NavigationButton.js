import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const _style = {
  loginButton: {
    color: 'white',
  },
};
const NavigationButton = props => {
  const { project, board, history } = props;
  const components = [
    <Button
      key="homeButton"
      style={_style.loginButton}
      onClick={() => props.history.push('/')}
    >
      A Team
    </Button>
  ];
  components.push('>');
  components.push(
    <Button
      key="projectButton"
      style={_style.loginButton}
      onClick={() => props.history.push('/projects')}
    >
      Projects
    </Button>
  );
  if (project) {
    components.push('>');
    components.push(
      <Button
        key='projectNameButton'
        disabled
        style={{ color: 'white' }}
      >
        {project.name}
      </Button>
    );
  }
  if (board) {
    components.push('>');
    components.push(
      <Button
        key='boardButton'
        disabled
        style={{ color: 'white' }}
      >
        {board.name}
      </Button>
    );
  }
  return (
    <React.Fragment>
      {components}
    </React.Fragment>
  );
};

NavigationButton.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

export default withRouter(NavigationButton);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RequirementsPage from '../requirements/RequirementsPage';
import ChatPage from '../chat/ChatPage';
import IssuesPage from '../issues/IssuesPage';
import Row from '../common/Row';
import Paper from '@material-ui/core/Paper';

const _style = {
  root: {
    margin: '0 auto 0 auto',
  },
  appBarContent: {
    alignItems: 'center',
  },
};


const BoardPage = props => {
  const { project, board } = props;
  const [tabValue, setTabValue] = useState(0);
  return (
    <div style={_style.root}>
      <div>Board {board.name} Page for Project {project.name}</div>
      <Row style={_style.appBarContent}>
        <Paper square>
          <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)}>
            <Tab label="Requirements" />
            <Tab label="Chat" />
            <Tab label="Issues" />
          </Tabs>
        </Paper>
      </Row>
      {tabValue === 0 && <RequirementsPage />}
      {tabValue === 1 && <ChatPage />}
      {tabValue === 2 && <IssuesPage />}
    </div>
  );
};

BoardPage.propTypes = {
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

export default BoardPage;

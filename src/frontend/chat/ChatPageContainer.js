import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux-starter-kit';
import * as selectors from '../reducers/rootReducer';
import ChatPage from './ChatPage';
import { withRouter } from 'react-router-dom';

const ChatPageContainer = props => (
  <ChatPage username={props.username} onNoUsername={() => props.history.push('/login')}/>
);

const mapStateToProps = state => ({
  username: selectors.getUsername(state),
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps),
);

export default enhance(ChatPageContainer);

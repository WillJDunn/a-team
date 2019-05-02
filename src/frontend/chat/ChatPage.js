import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatScreen from './ChatScreen';


class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen'
    };
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    fetch('/api/chat/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    .then(() => {
      this.setState({
        currentUsername: username,
        currentScreen: 'ChatScreen'
      })
    })
    .catch(error => console.error('error', error))
  }

  render() {
    if (!this.props.username) {
      console.log('no username', this.props.username);
      this.props.onNoUsername();
      return null;
    }
    this.onUsernameSubmitted(this.props.username);
    return <ChatScreen currentUsername={this.props.username} />
  }
}

ChatPage.propTypes = {
  username: PropTypes.string,
  onNoUsername: PropTypes.func.isRequired,
};

export default ChatPage;


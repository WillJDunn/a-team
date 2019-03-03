import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LoginWidget from './LoginWidget';
import CreateUserWidget from './CreateUserWidget';

const LoginPage = props => {
  const [value, setValue] = useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Login" />
            <Tab label="Create User" />
          </Tabs>
        </AppBar>
        {value === 0 && <LoginWidget />}
        {value === 1 && <CreateUserWidget />}
      </div>
    );
};

export default LoginPage;

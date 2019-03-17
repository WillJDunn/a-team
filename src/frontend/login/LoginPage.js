import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import LoginWidgetContainer from './LoginWidgetContainer';
import CreateUserWidgetContainer from './CreateUserWidgetContainer';

const styles = () => ({
  paperRoot: {
    width: 320,
  },
});

const _style = {
  root: {
    display: 'flex',
    height: 400,
    width: '100%',
    marginTop: 36,
    justifyContent: 'center',
  },
  centered: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
};

const LoginPage = props => {
  const [value, setValue] = useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

    return (
      <div style={_style.root}>
        <Paper className={props.classes.paperRoot}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab label="Login" />
              <Tab label="Create User" />
            </Tabs>
          </AppBar>
          {value === 0 && <div style={_style.centered}><LoginWidgetContainer /></div>}
          {value === 1 && <div style={_style.centered}><CreateUserWidgetContainer /></div>}
        </Paper>
      </div>
    );
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);

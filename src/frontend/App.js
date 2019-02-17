import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from './AppBar';
import Tabs from './Tabs';
import Card from './Card';

const App = (props) => (
  <React.Fragment>
    <AppBar />
    <Tabs />
    <Button variant="contained" color="primary">
      Welcome to Material-UI
    </Button>
    <Card />
  </React.Fragment>
);

export default App;

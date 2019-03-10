import React from 'react';
import { Provider } from 'react-redux'
import configureAppStore from './store/store'
import Routes from './Routes';


const App = () => (
  <Provider store={configureAppStore()}>
    <Routes />
  </Provider>
);

export default App;

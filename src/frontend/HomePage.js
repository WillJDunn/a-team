import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <React.Fragment>
    <div>Home Page</div>
    <div><Link to="/login">Login</Link></div>
    <Link to="/projects">Projects</Link>
  </React.Fragment>

);

export default HomePage;

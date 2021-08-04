import React from 'react';
import { shape } from 'prop-types';
import ThreeSixtyPage from './pages/ThreeSixtyPage';
import { ENV, logger } from './config/main';
import './components/Loader.scss';
import './App.css';

localStorage.setItem('ENV', ENV);
localStorage.setItem('logger', logger);

const App = ({ match }) => <ThreeSixtyPage builderInfo={match} />;

App.propTypes = {
  match: shape({}).isRequired
};

export default App;

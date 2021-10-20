import React from 'react';
import { shape } from 'prop-types';
import ThreeSixtyPage from './pages/ThreeSixtyPage';
import { ENV, logger, threeSixtyBuilder } from './config/main';
import './components/Loader.scss';
import './App.css';
import { setLocalStorage } from './utils';

setLocalStorage('ENV', ENV);
setLocalStorage('logger', logger);
setLocalStorage('three-sixty-builder', threeSixtyBuilder);

const App = ({ match }) => <ThreeSixtyPage builderInfo={match} />;

App.propTypes = {
  match: shape({}).isRequired
};

export default App;

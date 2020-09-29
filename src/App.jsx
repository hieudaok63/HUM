import React from 'react';
import { shape } from 'prop-types';
import ThreeSixtyPage from './pages/ThreeSixtyPage';
import './components/Loader.scss';
import './App.css';

const App = ({ match }) => <ThreeSixtyPage builderInfo={match} />;

App.propTypes = {
  match: shape({}).isRequired
};

export default App;

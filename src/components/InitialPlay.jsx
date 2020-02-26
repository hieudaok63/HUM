import React from 'react';
import { func } from 'prop-types';
import athumLogo from '../assets/atHum-logo.svg';
import './InitialPlay.css';

const InitialPlay = ({ onClick }) => (
  <div id="initial-play">
    <img onClick={onClick} src={athumLogo} alt="athum logo" />
  </div>
);

InitialPlay.propTypes = {
  onClick: func.isRequired
};

export default InitialPlay;

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { bool } from 'prop-types';

const Autoplay = ({
  inactiveCardboardMessage,
  showCardboardActivateMessage
}) => (
  <div
    className={`cardboard-tooltip d-flex justify-content-center align-items-center ${inactiveCardboardMessage &&
      'inactive'} ${showCardboardActivateMessage && 'active'}`}
  >
    <span>
      Your accelerometer is inactive. Activate it in your device settings to use
      the VR Mode.
    </span>
  </div>
);

Autoplay.propTypes = {
  inactiveCardboardMessage: bool.isRequired,
  showCardboardActivateMessage: bool.isRequired
};

export default Autoplay;

import React from 'react';
import { string, bool } from 'prop-types';

const FeatureTooltip = ({ message, status, showStatus }) => (
  <div
    className={`feature-tooltip ${
      showStatus ? 'active' : 'inactive'
    }  d-flex justify-content-center align-items-center`}
  >
    <span>
      {message} {status ? 'ON' : 'OFF'}
    </span>
  </div>
);

FeatureTooltip.propTypes = {
  message: string.isRequired,
  status: bool.isRequired,
  showStatus: bool.isRequired
};

export default FeatureTooltip;

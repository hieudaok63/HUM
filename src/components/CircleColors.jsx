import React from 'react';
import { string } from 'prop-types';

const CircleColor = ({ color }) => (
  <div
    className="d-flex justify-content-center align-items-center color-circle-container"
    key={`container=${color}`}
  >
    <div
      style={{
        borderRadius: '50%',
        width: '14px',
        height: '14px',
        backgroundColor: color
      }}
    />
  </div>
);

CircleColor.propTypes = {
  color: string.isRequired
};

export default CircleColor;

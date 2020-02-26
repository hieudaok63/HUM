import React from 'react';
import { bool } from 'prop-types';
import './Instructions.css';

const Instructions = ({ loading }) => (
  <div
    className={`${loading &&
      'display-none'} instructions-container d-flex justify-content-center align-items-center`}
  >
    <span className="d-flex justify-content-center align-items-center">
      Start the instructions by clicking on the highlighted icon
      <span className="circle" />.
    </span>
  </div>
);

Instructions.propTypes = {
  loading: bool.isRequired
};
export default Instructions;

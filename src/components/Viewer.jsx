import React from 'react';
import { string, bool, func } from 'prop-types';

const Viewer = ({
  error,
  rotationModal,
  selectedMenuOption,
  loading,
  onClick
}) => (
  <div
    id="viewer"
    className={`${
      error || rotationModal || selectedMenuOption || loading ? 'blur' : ''
    }`}
    onClick={onClick}
  />
);

Viewer.propTypes = {
  error: string.isRequired,
  rotationModal: string.isRequired,
  selectedMenuOption: string.isRequired,
  loading: bool.isRequired,
  onClick: func.isRequired
};

export default Viewer;

import React from 'react';
import { bool } from 'prop-types';
import loader from '../assets/home-white.gif';
import './Loader.scss';

const Loader = (props) => {
  const { loading } = props;
  return (
    <div
      id="loader"
      className={`${loading ? '' : 'none'} loader white-background`}
    >
      <div className="loader-image-container">
        <img src={loader} alt="athum loader" />
      </div>
    </div>
  );
};

Loader.propTypes = {
  loading: bool.isRequired
};

export default Loader;

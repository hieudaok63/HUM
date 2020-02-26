import React from 'react';
import { bool } from 'prop-types';
import loader from '../assets/home-white.gif';
import './Loader.scss';

const Loader = (props) => {
  const { loading, firstLoad } = props;
  return (
    <div
      id="loader"
      className={`${loading ? '' : 'hide'} ${
        firstLoad ? 'white-background' : ''
      }`}
    >
      <div className="loader-image-container">
        <img src={loader} alt="athum loader" />
      </div>
    </div>
  );
};

Loader.propTypes = {
  loading: bool.isRequired,
  firstLoad: bool.isRequired
};

export default Loader;

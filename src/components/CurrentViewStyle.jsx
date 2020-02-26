import React from 'react';
import { string, bool } from 'prop-types';
import './CurrentViewStyle.css';

const CurrentViewStyle = ({
  layoutName,
  decorationStyle,
  loading,
  error,
  hide,
  blur
}) => (
  <div
    className={`d-lg-block ${
      loading || error || hide ? 'display-none' : ''
    } ${blur && 'blur'}`}
  >
    <div className="indicator-container d-flex flex-row justify-content-center align-items-center">
      <span className="layout-name">{layoutName}</span>
      <span className="decoration-style">{`- ${decorationStyle}`}</span>
    </div>
  </div>
);

CurrentViewStyle.propTypes = {
  layoutName: string.isRequired,
  decorationStyle: string.isRequired,
  loading: bool.isRequired,
  error: string.isRequired,
  hide: bool.isRequired,
  blur: bool.isRequired
};

export default CurrentViewStyle;

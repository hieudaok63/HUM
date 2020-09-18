import React from 'react';
import { string, bool } from 'prop-types';
import AthumLogo from '../assets/athum.png';
import './CurrentViewStyle.scss';

const CurrentViewStyle = ({
  layoutName,
  decorationStyle,
  loading,
  error,
  hide,
  blur
}) => (
  <div
    className={`indicator-container d-flex flex-row align-items-center ${
      loading || error || hide ? 'hide' : ''
    } ${blur && 'blur'}`}
    style={{ width: (layoutName.length + decorationStyle.length) * 17 }}
  >
    <img className="logo" src={AthumLogo} alt="athum logo" />
    <div className="layout-decoration-container">
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

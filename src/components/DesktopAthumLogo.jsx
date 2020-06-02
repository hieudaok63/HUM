import React from 'react';
import { bool, string } from 'prop-types';
import AthumLogo from '../assets/athum.png';
import './AthumLogo.scss';

const DesktopAthumLogo = ({
  loading,
  error,
  hide,
  blur,
  showTabletPortrait
}) => (
  <div
    className={`d-none d-lg-block icon flex-column justify-content-center align-items-center athum-logo${
      loading || error || hide ? 'hide' : ''
    } ${blur && 'blur'} ${showTabletPortrait ? 'd-md-block' : 'd-md-none'}`}
  >
    <img
      src={AthumLogo}
      alt="athum"
      style={{ width: '100%', height: '100%' }}
    />
  </div>
);

DesktopAthumLogo.propTypes = {
  loading: bool.isRequired,
  error: string.isRequired,
  hide: bool.isRequired,
  blur: bool.isRequired,
  showTabletPortrait: bool.isRequired
};

export default DesktopAthumLogo;

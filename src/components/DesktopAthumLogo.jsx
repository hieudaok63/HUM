import React from 'react';
import { bool, string } from 'prop-types';
import './AthumLogo.scss';

const DesktopAthumLogo = ({
  loading,
  error,
  hide,
  blur,
  showTabletPortrait,
  img
}) => (
  <div
    className={`athum-logo${loading || error || hide ? 'hide' : ''} ${blur &&
      'blur'} ${showTabletPortrait ? 'd-md-block' : 'd-md-none'}`}
  >
    <div className="icon">
      <img src={img} alt="builder logo" />
    </div>
  </div>
);

DesktopAthumLogo.propTypes = {
  loading: bool.isRequired,
  error: string.isRequired,
  hide: bool.isRequired,
  blur: bool.isRequired,
  showTabletPortrait: bool.isRequired,
  img: string.isRequired
};

export default DesktopAthumLogo;

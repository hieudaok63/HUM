/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { bool, func } from 'prop-types';
import autoplayIcon from '../assets/Icons/icon-play.svg';
import activeAutoplayIcon from '../assets/Icons/icon-play-active.svg';
import FeatureTooltip from './FeatureTooltip';

const Autoplay = ({
  isPreview,
  activateAutoplayMode,
  loading,
  autoPlayStatus,
  blur,
  onMouseOver,
  showStatus,
  inactive
}) => (
  <React.Fragment>
    <div
      className={`feature-container autoplay d-flex justify-content-start align-items-center ${isPreview &&
        'display-none'} ${loading && 'display-none'} ${blur && 'blur'}`}
    >
      <div
        className="autoplay-icon"
        onFocus={() => {}}
        onMouseOver={() => {
          onMouseOver('autoplay');
        }}
        onClick={() => {
          onMouseOver('autoplay');
        }}
      >
        <img
          src={autoPlayStatus ? activeAutoplayIcon : autoplayIcon}
          alt="autoplay"
          style={{ width: '100%', height: '100%' }}
          onClick={activateAutoplayMode}
        />
      </div>
      <FeatureTooltip
        message="Auto-play is"
        status={autoPlayStatus}
        showStatus={showStatus}
        inactive={inactive}
      />
    </div>
  </React.Fragment>
);

Autoplay.propTypes = {
  isPreview: bool.isRequired,
  activateAutoplayMode: func.isRequired,
  loading: bool.isRequired,
  autoPlayStatus: bool.isRequired,
  blur: bool.isRequired,
  onMouseOver: func.isRequired,
  showStatus: bool.isRequired,
  inactive: bool.isRequired
};

export default Autoplay;

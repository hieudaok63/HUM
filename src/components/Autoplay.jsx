/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import autoplayIcon from '../assets/Icons/icon-play.svg';
import activeAutoplayIcon from '../assets/Icons/icon-play-active.svg';
import FeatureTooltip from './FeatureTooltip';
import { loadingSelector } from '../selectors/loading';
import { blurSelector } from '../selectors/HideBlur';
import { isPreview } from '../utils';

const Autoplay = ({ loading, blur }) => {
  const [status, setStatus] = useState(false);
  const [showAutoplaydMessage, setAutoplaydMessage] = useState(false);
  return (
    <>
      <div
        className={`feature-container autoplay d-flex justify-content-start align-items-center ${isPreview() &&
          'display-none'} ${loading && 'hide'} ${blur && 'blur'}`}
      >
        <div
          className="autoplay-icon"
          onFocus={() => {}}
          onClick={() => {
            setStatus((prevStatus) => !prevStatus);
            setAutoplaydMessage(true);
            setTimeout(() => {
              setAutoplaydMessage(false);
            }, 8000);
          }}
        >
          <img
            src={status ? activeAutoplayIcon : autoplayIcon}
            alt="autoplay"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <FeatureTooltip
          message="Auto-play is"
          status={status}
          showStatus={showAutoplaydMessage}
        />
      </div>
    </>
  );
};

Autoplay.propTypes = {
  loading: bool.isRequired,
  blur: bool.isRequired
};

const stateMapToProps = (state) => ({
  loading: loadingSelector(state),
  blur: blurSelector(state)
});

export default connect(stateMapToProps)(Autoplay);

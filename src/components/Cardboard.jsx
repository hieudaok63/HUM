/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import cardboardIcon from '../assets/Icons/Icon_cardboard.svg';
import cardboardActive from '../assets/Icons/Icon_cardboard_active.svg';
import FeatureTooltip from './FeatureTooltip';
import CardboardTooltip from './Tooltip/CardboardTooltip';
import { hasGyroscope, isPreview } from '../utils';
import { loadingSelector } from '../selectors/Loading';
import { blurSelector } from '../selectors/HideBlur';

const Cardboard = ({ loading, blur }) => {
  const [status, setStatus] = useState(false);
  const [showCardboardMessage, setCardboardMessage] = useState(false);
  const [showCardboardTooltip, setCardboardTooltip] = useState(false);

  useEffect(() => {
    function handleDeviceOrientation(event) {
      if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
        setCardboardMessage(false);
        setCardboardTooltip(true);
      } else {
        setCardboardTooltip(false);
      }
    }
    window.addEventListener('deviceorientation', handleDeviceOrientation);
  });
  return (
    <>
      <div
        className={`feature-container cardboard d-flex justify-content-start align-items-center ${isPreview() &&
          'display-none'} ${loading && 'hide'} ${!hasGyroscope() &&
          'display-none'} ${blur && 'blur'}`}
      >
        <div
          className="cardboard-icon"
          onFocus={() => {}}
          onClick={() => {
            setStatus((prevStatus) => !prevStatus);
            setCardboardMessage(true);
            setTimeout(() => {
              setCardboardMessage(false);
            }, 8000);
          }}
        >
          <img
            src={status ? cardboardActive : cardboardIcon}
            alt="cardboard"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <FeatureTooltip
          message="VR Mode is"
          status={status}
          showStatus={showCardboardMessage}
        />
      </div>
      {showCardboardTooltip && <CardboardTooltip />}
    </>
  );
};

Cardboard.propTypes = {
  loading: bool.isRequired,
  blur: bool.isRequired
};

const stateMapToProps = (state) => ({
  loading: loadingSelector(state),
  blur: blurSelector(state)
});

export default connect(stateMapToProps)(Cardboard);

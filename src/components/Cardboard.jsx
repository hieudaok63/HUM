/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { bool, func } from 'prop-types';
import cardboardIcon from '../assets/Icons/Icon_cardboard.svg';
import cardboardActive from '../assets/Icons/Icon_cardboard_active.svg';
import FeatureTooltip from './FeatureTooltip';

const Cardboard = ({
  isPreview,
  cardBoardMode,
  activateCardBoardMode,
  loading,
  blur,
  onMouseOver,
  showStatus,
  show,
  cardboardMessage,
  inactive
}) => (
  <React.Fragment>
    <div
      className={`feature-container cardboard d-flex justify-content-start align-items-center ${isPreview &&
        'display-none'} ${loading && 'display-none'} ${!show &&
        'display-none'} ${blur && 'blur'}`}
    >
      <div
        className="cardboard-icon"
        onFocus={() => {}}
        onMouseOver={() => {
          onMouseOver('cardboard');
        }}
        onClick={() => {
          onMouseOver('cardboard');
        }}
      >
        <img
          src={cardBoardMode ? cardboardActive : cardboardIcon}
          alt="cardboard"
          style={{ width: '100%', height: '100%' }}
          onClick={activateCardBoardMode}
        />
      </div>
      {!cardboardMessage && (
        <FeatureTooltip
          message="VR Mode is"
          status={cardBoardMode}
          showStatus={showStatus}
          inactive={inactive}
        />
      )}
    </div>
  </React.Fragment>
);

Cardboard.propTypes = {
  isPreview: bool.isRequired,
  cardBoardMode: bool,
  activateCardBoardMode: func.isRequired,
  loading: bool.isRequired,
  blur: bool.isRequired,
  onMouseOver: func.isRequired,
  showStatus: bool.isRequired,
  show: bool.isRequired,
  cardboardMessage: bool.isRequired,
  inactive: bool.isRequired
};

Cardboard.defaultProps = {
  cardBoardMode: false
};

export default Cardboard;

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import autoplayIcon from '../assets/Icons/icon-play.svg';
import activeAutoplayIcon from '../assets/Icons/icon-play-active.svg';
import FeatureTooltip from './FeatureTooltip';
import { loadingSelector } from '../selectors/loading';
import { blurSelector } from '../selectors/HideBlur';
import { isPreview } from '../utils';
import PanoramaAction from '../stores/panorama/actions';

class Autoplay extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      showAutoplaydMessage: false,
      interval: () => {}
    };
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress, false);
  }

  setStatus = () => {
    this.setState((prevStatus) => ({
      status: !prevStatus.status
    }));
  };

  setAutoplaydMessage = (showAutoplaydMessage) => {
    this.setState({ showAutoplaydMessage });
  };

  startInterval = () => {
    const { dispatch } = this.props;
    /* const interval = setInterval(() => {
      this.startTour();
    }, 15000); */
    dispatch(PanoramaAction.activateAutoRotate(true));
    // this.setState({ interval });
  };

  stopInterval = () => {
    const { interval } = this.state;
    const { dispatch } = this.props;
    // clearInterval(interval);
    dispatch(PanoramaAction.activateAutoRotate(false));
  };

  handleKeyPress = (event) => {
    if (event.keyCode === 32) {
      const { status } = this.state;
      if (status) {
        this.stopInterval();
      } else {
        this.startInterval();
      }
      this.setStatus();
      this.messageHandler();
    }
  };

  messageHandler = () => {
    this.setAutoplaydMessage(true);
    setTimeout(() => {
      this.setAutoplaydMessage(false);
    }, 8000);
  };

  render() {
    const { loading, blur } = this.props;
    const { status, showAutoplaydMessage } = this.state;
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
              this.setStatus();
              this.messageHandler();
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
  }
}

Autoplay.propTypes = {
  loading: bool.isRequired,
  blur: bool.isRequired,
  dispatch: func.isRequired
};

const stateMapToProps = (state) => ({
  loading: loadingSelector(state),
  blur: blurSelector(state)
});

export default connect(stateMapToProps)(Autoplay);

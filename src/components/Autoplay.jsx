/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, func, string, shape } from 'prop-types';
import autoplayIcon from '../assets/Icons/icon-play.svg';
import activeAutoplayIcon from '../assets/Icons/icon-play-active.svg';
import FeatureTooltip from './FeatureTooltip';
import { loadingSelector } from '../selectors/loading';
import { blurSelector } from '../selectors/HideBlur';
import { isPreview } from '../utils';
import PanoramaAction from '../stores/panorama/actions';
import ThreeSixtyAction from '../stores/threeSixty/actions';
import { getSelectedScene } from '../selectors/menu';
import { sceneSelector } from '../selectors/ThreeSixty';

class Autoplay extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      showAutoplaydMessage: false,
      interval: () => {},
      autoTourScene: 0
    };
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress, false);
    window.addEventListener('mousedown', this.onBodyClick);
    window.addEventListener('touchstart', this.onBodyClick);
  }

  onBodyClick = (event) => {
    const { status } = this.state;
    const elementClass = event.target.getAttribute('class') || '';
    if (status && !elementClass.includes('autoplay-button')) {
      console.log('BODY');
      this.stopInterval();
      this.setStatus();
      this.messageHandler();
    }
  };

  setStatus = () => {
    this.setState((prevStatus) => ({
      status: !prevStatus.status
    }));
  };

  setAutoplaydMessage = (showAutoplaydMessage) => {
    this.setState({ showAutoplaydMessage });
  };

  startTour = async () => {
    const { dispatch, scenes, selectedScene } = this.props;
    const { autoTourScene } = this.state;
    if (
      scenes[autoTourScene].key !== selectedScene &&
      scenes.length > autoTourScene
    ) {
      dispatch(ThreeSixtyAction.setSelectedScene(scenes[autoTourScene].key));
      dispatch(ThreeSixtyAction.getStyles());
      await dispatch(ThreeSixtyAction.changeSceneSphere());
    }

    if (autoTourScene === scenes.length - 1) {
      this.setState({
        autoTourScene: 0
      });
    } else {
      this.setState({
        autoTourScene: autoTourScene + 1
      });
    }
  };

  startInterval = () => {
    const { dispatch } = this.props;
    const interval = setInterval(() => {
      this.startTour();
    }, 15000);
    dispatch(PanoramaAction.activateAutoRotate(true));
    this.setState({ interval });
  };

  stopInterval = () => {
    const { interval } = this.state;
    const { dispatch } = this.props;
    clearInterval(interval);
    dispatch(PanoramaAction.activateAutoRotate(false));
  };

  handleKeyPress = (event) => {
    if (event.keyCode === 32) {
      this.handleInterval();
      this.setStatus();
      this.messageHandler();
    }
  };

  handleInterval = () => {
    const { status } = this.state;
    if (status) {
      this.stopInterval();
    } else {
      this.startInterval();
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
          className={`feature-container autoplay autoplay-button d-flex justify-content-start align-items-center ${isPreview() &&
            'display-none'} ${loading && 'hide'} ${blur && 'blur'}`}
        >
          <div
            className="autoplay-icon autoplay-button"
            onFocus={() => {}}
            onClick={() => {
              this.handleInterval();
              this.setStatus();
              this.messageHandler();
            }}
          >
            <img
              className="autoplay-button"
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
  dispatch: func.isRequired,
  scenes: arrayOf(shape({})).isRequired,
  selectedScene: string.isRequired
};

const stateMapToProps = (state) => ({
  loading: loadingSelector(state),
  blur: blurSelector(state),
  scenes: sceneSelector(state),
  selectedScene: getSelectedScene(state)
});

export default connect(stateMapToProps)(Autoplay);

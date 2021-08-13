/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, func, string, shape } from 'prop-types';
import { loadingSelector } from '../selectors/loading';
import { blurSelector } from '../selectors/HideBlur';
import PanoramaAction from '../stores/panorama/actions';
import ThreeSixtyAction from '../stores/threeSixty/actions';
import { getAutoTourSelector, getSelectedScene } from '../selectors/menu';
import { sceneSelector } from '../selectors/ThreeSixty';
import { ReactComponent as SlowMoIcon } from '../assets/Icons/icon_slow_motion.svg';

class Autoplay extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      interval: () => {},
      autoTourScene: 0
    };
  }

  componentDidMount() {
    // window.addEventListener('keypress', this.handleKeyPress, false);
    window.addEventListener('mousedown', this.onBodyClick);
    window.addEventListener('touchstart', this.onBodyClick);
  }

  onBodyClick = (event) => {
    const { status } = this.state;
    const elementClass =
      event.target.getAttribute('class') ||
      event.target.getAttribute('fill') ||
      '';

    if (
      status &&
      !elementClass.includes('slow-mo-action') &&
      !elementClass.includes('slow-mo-icon') &&
      !elementClass.includes('currentColor')
    ) {
      this.stopInterval();
      this.setStatus();
    }
  };

  setStatus = () => {
    this.setState((prevStatus) => ({
      status: !prevStatus.status
    }));
  };

  startTour = async () => {
    const { dispatch, scenes, selectedScene } = this.props;
    const { autoTourScene } = this.state;
    if (
      scenes[autoTourScene].key !== selectedScene &&
      scenes.length > autoTourScene
    ) {
      await dispatch(
        ThreeSixtyAction.setSelectedScene(scenes[autoTourScene].key)
      );
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

  startInterval = async () => {
    const { dispatch } = this.props;
    const interval = setInterval(() => {
      this.startTour();
    }, 15000);
    await dispatch(PanoramaAction.activateAutoRotate(true));
    this.setState({ interval });
  };

  stopInterval = async () => {
    const { interval } = this.state;
    const { dispatch } = this.props;
    clearInterval(interval);
    await dispatch(PanoramaAction.activateAutoRotate(false));
  };

  handleKeyPress = (event) => {
    if (event.keyCode === 32) {
      this.handleInterval();
      this.setStatus();
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
    const { status } = this.state;
    return (
      <div
        className={`menu-action secondary-action menu-action slow-mo-action ${
          status ? 'menu-action-active' : ''
        }`}
        onClick={async () => {
          await this.handleInterval();
          await this.setStatus();
        }}
      >
        <SlowMoIcon className="slow-mo-icon" />
      </div>
    );
  }
}

Autoplay.propTypes = {
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

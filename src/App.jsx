/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { string, func, shape, number } from 'prop-types';
import { connect } from 'react-redux';
import './components/Loader.scss';
import './App.css';
import ThreeSixtyAction from './stores/threeSixty/actions';
import Menu from './components/Menu/Menu';

class App extends Component {
  componentDidMount() {
    this.loadContent();
  }

  async loadContent() {
    const {
      match,
      currentLevel,
      selectedStyleName,
      selectedScene,
      selectedFinish,
      mode,
      dispatch
    } = this.props;

    const { builderId, projectId, layoutName } = match.params;

    const scenes = await dispatch(
      ThreeSixtyAction.getScenes(
        builderId,
        projectId,
        layoutName,
        currentLevel,
        selectedStyleName,
        mode
      )
    );

    const styles = await dispatch(
      ThreeSixtyAction.getStyles(
        builderId,
        projectId,
        layoutName,
        currentLevel,
        selectedScene,
        mode
      )
    );

    const roomUseWithFInishes = await dispatch(
      ThreeSixtyAction.getRoomUseWithFinishes(
        builderId,
        projectId,
        layoutName,
        currentLevel,
        selectedStyleName,
        selectedScene,
        [],
        mode,
        selectedFinish
      )
    );

    console.log(scenes, styles, roomUseWithFInishes);
  }

  render() {
    return <Menu />;
  }
}

const mapStateToProps = (state) => {
  const {
    currentLevel,
    selectedStyleName,
    selectedScene,
    selectedFinish,
    mode
  } = state.threeSixty;
  const { loading } = state.loading;
  return {
    currentLevel,
    selectedStyleName,
    selectedScene,
    selectedFinish,
    mode,
    loading
  };
};

App.propTypes = {
  match: shape({}).isRequired,
  currentLevel: number.isRequired,
  selectedStyleName: string.isRequired,
  selectedScene: string.isRequired,
  selectedFinish: string.isRequired,
  mode: string.isRequired,
  dispatch: func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

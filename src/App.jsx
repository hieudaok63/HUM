/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import ThreeSixtyAction from './stores/threeSixty/actions';
import Menu from './components/Menu/Menu';
import './components/Loader.scss';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.loadContent();
  }

  async loadContent() {
    const { match, dispatch } = this.props;

    const setBuilder = await dispatch(
      ThreeSixtyAction.setBuilder({ ...match.params })
    );

    const scenes = await dispatch(ThreeSixtyAction.getScenes());

    const styles = await dispatch(ThreeSixtyAction.getStyles());

    const roomUseWithFInishes = await dispatch(
      ThreeSixtyAction.getRoomUseWithFinishes()
    );

    console.log(setBuilder, scenes, styles, roomUseWithFInishes);
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
  dispatch: func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

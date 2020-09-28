/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import ThreeSixtyAction from './stores/threeSixty/actions';
import DesktopAthumLogo from './components/DesktopAthumLogo';
import Menu from './components/Menu/Menu';
import MiniMap from './components/MiniMap';
import CurrentViewStyle from './components/CurrentViewStyle';
import Cardboard from './components/Cardboard';
import Autoplay from './components/Autoplay';
import ErrorModal from './components/ErrorModal';
import RotationModal from './components/RotationModal';
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
    return (
      <>
        <div className="w-100 h-100">
          <DesktopAthumLogo />
          <Menu />
          <MiniMap />
          <CurrentViewStyle />
          <Cardboard />
          <Autoplay />
          <ErrorModal />
          {/* add viewer add mobile menu stuff */}
        </div>
        <RotationModal />
      </>
    );
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

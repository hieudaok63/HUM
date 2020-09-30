/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { arrayOf, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import ThreeSixtyAction from '../stores/threeSixty/actions';
import DesktopAthumLogo from '../components/DesktopAthumLogo';
import Menu from '../components/Menu/Menu';
import MiniMap from '../components/MiniMap';
import CurrentViewStyle from '../components/CurrentViewStyle';
import Viewer from '../components/Viewer';
import Cardboard from '../components/Cardboard';
import Autoplay from '../components/Autoplay';
import ErrorModal from '../components/ErrorModal';

class ThreeSixtyPage extends Component {
  componentDidMount() {
    this.loadContent();
  }

  async loadContent() {
    const { builderInfo, dispatch } = this.props;

    await dispatch(ThreeSixtyAction.setBuilder({ ...builderInfo.params }));

    await dispatch(ThreeSixtyAction.getScenes());

    await dispatch(ThreeSixtyAction.getStyles());

    await dispatch(ThreeSixtyAction.getRoomUseWithFinishes());

    // add LOG Actions
  }

  render() {
    const { levels } = this.props;
    return (
      <>
        <div className="w-100 h-100">
          <DesktopAthumLogo />
          <Menu />
          <MiniMap />
          {levels.length > 0 && <Viewer />}
          <CurrentViewStyle />
          <Cardboard />
          <Autoplay />
          <ErrorModal />
        </div>
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
    mode,
    levels
  } = state.threeSixty;
  const { loading } = state.loading;
  return {
    currentLevel,
    selectedStyleName,
    selectedScene,
    selectedFinish,
    mode,
    loading,
    levels
  };
};

ThreeSixtyPage.propTypes = {
  builderInfo: shape({}).isRequired,
  levels: arrayOf(shape({})).isRequired,
  dispatch: func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreeSixtyPage);

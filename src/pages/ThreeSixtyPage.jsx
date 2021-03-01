/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { arrayOf, bool, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import ThreeSixtyAction from '../stores/threeSixty/actions';
import Loader from '../components/Loader';
import DesktopAthumLogo from '../components/DesktopAthumLogo';
import Menu from '../components/Menu/Menu';
import MiniMap from '../components/MiniMap';
import CurrentViewStyle from '../components/CurrentViewStyle';
import Viewer from '../components/Viewer';
import Cardboard from '../components/Cardboard';
import Autoplay from '../components/Autoplay';
import ErrorModal from '../components/ErrorModal';
import SessionAction from '../stores/session/actions';
import SocketAction from '../stores/socket/actions';
import LoadingAction from '../stores/loading/actions';
import { SOCKET } from '../config/endpoints';

class ThreeSixtyPage extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(SocketAction.disconnect());
  }

  componentDidMount() {
    this.loadContent();
  }

  async loadContent() {
    const { builderInfo, dispatch } = this.props;

    await dispatch(LoadingAction.setLoader(true));

    await dispatch(SocketAction.initSocket(SOCKET));

    await dispatch(ThreeSixtyAction.setBuilder({ ...builderInfo.params }));

    await dispatch(ThreeSixtyAction.getScenes());

    await dispatch(ThreeSixtyAction.getStyles());

    await dispatch(ThreeSixtyAction.getScenesByStyles());

    await dispatch(SessionAction.log([]));
  }

  render() {
    const { levels, loader } = this.props;
    return (
      <>
        <div className="w-100 h-100">
          {loader && <Loader loading={loader} />}
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
  const { loader } = state.loading;
  return {
    currentLevel,
    selectedStyleName,
    selectedScene,
    selectedFinish,
    mode,
    loader,
    levels
  };
};

ThreeSixtyPage.propTypes = {
  builderInfo: shape({}).isRequired,
  levels: arrayOf(shape({})).isRequired,
  dispatch: func.isRequired,
  loader: bool.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreeSixtyPage);

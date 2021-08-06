/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useParams } from 'react-router-dom';
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
import TourAction from '../stores/tour/actions';
import LanguageAction from '../stores/language/actions';
import { levelsSelector } from '../selectors/Tour';
import { loadingSelector } from '../selectors/loading';

const ThreeSixtyPage = ({ levels, loader, dispatch }) => {
  const { builderId, projectId, layoutName } = useParams();
  React.useEffect(() => {
    const loadContent = async () => {
      await dispatch(LoadingAction.setLoader(true));
      await dispatch(TourAction.getData(builderId, projectId));
      await dispatch(LanguageAction.setLanguageFromTour());
      const floorplanIndex = await dispatch(
        TourAction.getFloorplanIndex(layoutName)
      );

      if (floorplanIndex !== -1) {
        await dispatch(TourAction.selectFloorplan(floorplanIndex));
        await dispatch(ThreeSixtyAction.setThreeSixtyData());
      }
    };
    loadContent();
    return () => {
      dispatch(SocketAction.disconnect());
    };
  }, []);
  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
      <Loader loading={loader} />
      {/* <DesktopAthumLogo />
        <Menu />
        <MiniMap /> */}
      {levels.length > 0 && <Viewer type="three-sixty" />}
      {/* <CurrentViewStyle />
        <Cardboard />
        <Autoplay />
        <ErrorModal /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loader: loadingSelector(state),
  levels: levelsSelector(state)
});

ThreeSixtyPage.propTypes = {
  levels: arrayOf(shape({})).isRequired,
  dispatch: func.isRequired,
  loader: bool.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreeSixtyPage);

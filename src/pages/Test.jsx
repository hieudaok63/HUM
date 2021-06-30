/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useParams } from 'react-router-dom';
import { arrayOf, func, shape, bool, number } from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import Viewer from '../components/Viewer';
import TourAction from '../stores/tour/actions';
// import ThreeSixtyAction from '../stores/threeSixty/actions';
import LoadingAction from '../stores/loading/actions';
import {
  floorplansSelector,
  levelsSelector,
  logoSelector,
  selectedFloorplanSelector
} from '../selectors/Tour';
import { loadingSelector } from '../selectors/loading';
import ThreeSixtyAction from '../stores/threeSixty/actions';
// import SocketAction from '../stores/socket/actions';
// import { SOCKET } from '../config/endpoints';
import LeftMenu from '../components/NewMenus/LeftMenu';
import ActionsMenu from '../components/NewMenus/ActionsMenu';
import { stylesSelector } from '../selectors/ThreeSixty';
import InfoPage from '../components/InfoPage/InfoPage';

const ThreeSixtyPage = ({
  floorplans,
  dispatch,
  loader,
  levels,
  logo,
  styles
}) => {
  const { builderId, projectId } = useParams();
  const [infoPage, setInfoPage] = React.useState(null);

  React.useEffect(() => {
    async function getData() {
      await dispatch(LoadingAction.setLoader(true));
      // await dispatch(SocketAction.initSocket(SOCKET));
      await dispatch(TourAction.getData(builderId, projectId));
      await dispatch(TourAction.selectFloorplan(0));
      await dispatch(ThreeSixtyAction.setThreeSixtyData());
    }
    getData();
  }, []);

  return (
    <>
      <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
        {loader && <Loader loading={loader} />}
        {levels.length > 0 && <Viewer />}
        <LeftMenu
          {...logo}
          floorplans={floorplans}
          // amenities={amenities.content}
          // exterior={exterior.content}
        />
        <ActionsMenu styles={styles} setInfoPage={setInfoPage} />
        {infoPage && <InfoPage infoPage={infoPage} setInfoPage={setInfoPage} />}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  floorplans: floorplansSelector(state),
  loader: loadingSelector(state),
  levels: levelsSelector(state),
  logo: logoSelector(state),
  selectedFloorplan: selectedFloorplanSelector(state),
  styles: stylesSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

ThreeSixtyPage.propTypes = {
  dispatch: func.isRequired,
  floorplans: arrayOf(shape({})).isRequired,
  loader: bool.isRequired,
  levels: arrayOf(shape({})).isRequired,
  logo: shape({}).isRequired,
  selectedFloorplan: number.isRequired,
  styles: arrayOf(shape({})).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreeSixtyPage);

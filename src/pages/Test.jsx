/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useParams } from 'react-router-dom';
import { arrayOf, func, shape, bool } from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import Viewer from '../components/Viewer';
import TourAction from '../stores/tour/actions';
// import ThreeSixtyAction from '../stores/threeSixty/actions';
import LoadingAction from '../stores/loading/actions';
import { floorplansSelector, levelsSelector } from '../selectors/Tour';
import { loadingSelector } from '../selectors/loading';
import ThreeSixtyAction from '../stores/threeSixty/actions';

const ThreeSixtyPage = ({ floorplans, dispatch, loader, levels }) => {
  const { builderId, projectId } = useParams();

  React.useEffect(() => {
    async function getData() {
      await dispatch(LoadingAction.setLoader(true));
      await dispatch(TourAction.getData(builderId, projectId));
      await dispatch(TourAction.selectFloorplan(0));
      await dispatch(ThreeSixtyAction.setThreeSixtyData());
    }
    getData();
  }, []);

  return (
    <div className="w-100 h-100">
      {loader && <Loader loading={loader} />}
      <div>Test Data</div>
      {floorplans.map((floorplan, index) => (
        <button
          key={`button-${index.toString()}`}
          type="button"
          className="btn"
          onClick={async () => {
            await dispatch(TourAction.selectFloorplan(floorplan));
          }}
        >
          {floorplan.displayName}
        </button>
      ))}
      {levels.length > 0 && <Viewer />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  floorplans: floorplansSelector(state),
  loader: loadingSelector(state),
  levels: levelsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

ThreeSixtyPage.propTypes = {
  dispatch: func.isRequired,
  floorplans: arrayOf(shape({})).isRequired,
  loader: bool.isRequired,
  levels: arrayOf(shape({})).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreeSixtyPage);

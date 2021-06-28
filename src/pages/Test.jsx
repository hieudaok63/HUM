/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useParams } from 'react-router-dom';
import { arrayOf, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import TourAction from '../stores/tour/actions';
import { floorplansSelector } from '../selectors/Tour';

const ThreeSixtyPage = ({ floorplans, dispatch }) => {
  const { builderId, projectId } = useParams();

  React.useEffect(() => {
    async function getData() {
      await dispatch(TourAction.getData(builderId, projectId));
    }
    getData();
  });

  return (
    <>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  floorplans: floorplansSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

ThreeSixtyPage.propTypes = {
  dispatch: func.isRequired,
  floorplans: arrayOf(shape({})).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreeSixtyPage);

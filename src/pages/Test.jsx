/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { arrayOf, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import TourAction from '../stores/tour/actions';
import { floorplansSelector } from '../selectors/Tour';

class ThreeSixtyPage extends Component {
  componentDidMount() {
    this.loadContent();
  }

  async setFloorplan(floorplan) {
    const { dispatch } = this.props;
    await dispatch(TourAction.selectFloorplan(floorplan));
  }

  async loadContent() {
    const { dispatch } = this.props;
    await dispatch(TourAction.getMockData());
  }

  render() {
    const { floorplans } = this.props;
    return (
      <>
        <div>Test Data</div>
        {floorplans.map((floorplan, index) => (
          <button
            key={`button-${index.toString()}`}
            type="button"
            className="btn"
            onClick={() => {
              this.setFloorplan(floorplan);
            }}
          >
            {floorplan.displayName}
          </button>
        ))}
      </>
    );
  }
}

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

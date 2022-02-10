import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func, arrayOf, shape } from 'prop-types';
import { errorSelector } from '../selectors/error';
import { menuOptionSelector } from '../selectors/menu';
import { panoramaSelector } from '../selectors/Panorama';
import AmenitiesActions from '../stores/amenities/actions';

class PanoViewer extends Component {
  constructor() {
    super();
    this.panoViewer = null;
  }

  componentDidMount = () => {
    this.reset();
  };

  async componentDidUpdate(prevProps) {
    const { image, dispatch } = this.props;
    if (prevProps.image !== image) {
      this.panoViewer.removeChild(this.panoViewer.firstChild);
      await dispatch(AmenitiesActions.setContainer(null));
      this.reset();
    }
  }

  reset = async () => {
    const { dispatch, image, spots } = this.props;

    await dispatch(AmenitiesActions.setContainer(this.panoViewer));
    await dispatch(AmenitiesActions.setAmenityImage(image));
    await dispatch(AmenitiesActions.setSpots(spots));
    await dispatch(AmenitiesActions.createPanorama());
  };

  render() {
    const { error, type } = this.props;
    return (
      <div
        id="viewer-pano"
        ref={(ref) => {
          this.panoViewer = ref;
        }}
        className={`${error ? 'blur' : ''} ${type !== 'pano' ? 'hide' : ''}`}
      />
    );
  }
}

PanoViewer.propTypes = {
  error: string.isRequired,
  dispatch: func.isRequired,
  type: func.isRequired,
  image: string.isRequired,
  spots: arrayOf(shape({})).isRequired
};

const mapStateToProps = (state) => ({
  error: errorSelector(state),
  selectedMenuOption: menuOptionSelector(state),
  panorama: panoramaSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(PanoViewer);

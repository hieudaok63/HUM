import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import PanoramaAction from '../stores/panorama/actions';
import { errorSelector } from '../selectors/error';
import { menuOptionSelector } from '../selectors/menu';
import { panoramaSelector } from '../selectors/Panorama';

class Viewer extends Component {
  constructor() {
    super();
    this.atHUMViewer = null;
  }

  componentDidMount = () => {
    this.reset();
  };

  reset = async () => {
    const { dispatch } = this.props;

    await dispatch(PanoramaAction.setContainer(this.atHUMViewer));

    const panoramaInfo = await dispatch(PanoramaAction.createPanoramaInfo());

    if (!panoramaInfo.isError) {
      await dispatch(PanoramaAction.setPanorama());
    }
  };

  render() {
    const { error, type } = this.props;
    return (
      <div
        id="viewer"
        ref={(ref) => {
          this.atHUMViewer = ref;
        }}
        className={`${error ? 'blur' : ''} ${
          type !== 'three-sixty' ? 'hide' : ''
        }`}
      />
    );
  }
}

Viewer.propTypes = {
  error: string.isRequired,
  dispatch: func.isRequired,
  type: func.isRequired
};

const mapStateToProps = (state) => ({
  error: errorSelector(state),
  selectedMenuOption: menuOptionSelector(state),
  panorama: panoramaSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);

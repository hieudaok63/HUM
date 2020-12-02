import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import PanoramaAction from '../stores/panorama/actions';
import { errorSelector } from '../selectors/error';
import { menuOptionSelector } from '../selectors/menu';

class Viewer extends Component {
  constructor() {
    super();
    this.atHUMViewer = null;
  }

  async componentDidMount() {
    const { dispatch } = this.props;

    await dispatch(PanoramaAction.setContainer(this.atHUMViewer));

    const panoramaInfo = await dispatch(PanoramaAction.createPanoramaInfo());

    if (!panoramaInfo.isError) {
      dispatch(PanoramaAction.setPanorama());
    }
  }

  render() {
    const { error, selectedMenuOption } = this.props;
    return (
      <div
        id="viewer"
        ref={(ref) => {
          this.atHUMViewer = ref;
        }}
        className={`${
          error || selectedMenuOption === 'mini-map' ? 'blur' : ''
        }`}
      />
    );
  }
}

Viewer.propTypes = {
  error: string.isRequired,
  selectedMenuOption: string.isRequired,
  dispatch: func.isRequired
};

const mapStateToProps = (state) => ({
  error: errorSelector(state),
  selectedMenuOption: menuOptionSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);

import React from 'react';
import { connect } from 'react-redux';
import { string, func, number } from 'prop-types';
import PanoramaAction from '../stores/panorama/actions';
import LoadingAction from '../stores/loading/actions';
import { errorSelector } from '../selectors/error';
import { menuOptionSelector } from '../selectors/menu';
import { panoramaSelector } from '../selectors/Panorama';
import { selectedFloorplanSelector } from '../selectors/Tour';

const Viewer = ({ selectedFloorplan, error, type, dispatch }) => {
  const atHUMViewer = React.useRef(null);
  React.useEffect(() => {
    async function buildViewer() {
      if (atHUMViewer.current.children.length > 0) {
        await dispatch(LoadingAction.setLoader(true));
      }

      await dispatch(PanoramaAction.setContainer(atHUMViewer.current));
      const panoramaInfo = await dispatch(PanoramaAction.createPanoramaInfo());
      if (!panoramaInfo.isError) {
        await dispatch(PanoramaAction.setPanorama());
      }
    }

    if (atHUMViewer.current) {
      buildViewer();
    }
  }, [selectedFloorplan]);

  return (
    <div
      id="viewer"
      ref={atHUMViewer}
      className={`${error ? 'blur' : ''} ${
        type !== 'three-sixty' ? 'hide' : ''
      }`}
    />
  );
};

Viewer.propTypes = {
  error: string.isRequired,
  dispatch: func.isRequired,
  type: func.isRequired,
  selectedFloorplan: number.isRequired
};

const mapStateToProps = (state) => ({
  error: errorSelector(state),
  selectedMenuOption: menuOptionSelector(state),
  selectedFloorplan: selectedFloorplanSelector(state),
  panorama: panoramaSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, string, func, shape, bool, number } from 'prop-types';
import Hotspot from './Hotspot';
import { deleteWhiteSpaces } from '../utils';
import FloorsMenuMobile from './FloorsMenuMobile';
import './MiniMap.scss';
import ThreeSixtyAction from '../stores/threeSixty/actions';
import {
  currentFloorSelector,
  getSelectedScene,
  imageMapSelector,
  mapScenesSelector,
  mapSizeSelector,
  menuOptionSelector,
  showMiniMapSelector,
  sizeSelectorMobile,
  totalLevelsSelector
} from '../selectors/menu';
import { loadingSelector } from '../selectors/loading';
import PanoramaAction from '../stores/panorama/actions';
import SocketAction from '../stores/socket/actions';

class MiniMap extends Component {
  constructor() {
    super();
    this.state = {
      isPortrait: window.innerWidth < window.innerHeight
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize, true);
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.handleResize, true);
  }

  changeScene = async (e, targetName) => {
    const { dispatch } = this.props;
    const name = targetName || e.target.name || e.target.getAttribute('name');
    dispatch(ThreeSixtyAction.setSelectedScene(name));
    dispatch(ThreeSixtyAction.getStyles());
    await dispatch(ThreeSixtyAction.changeSceneSphere());
    dispatch(
      SocketAction.socketMessage({
        event: 'CHANGE-SCENE',
        data: {
          type: 'CHANGE-SCENE',
          name
        }
      })
    );
  };

  upOneFloor = () => {
    const { currentFloor, totalFloors } = this.props;
    if (currentFloor < totalFloors) {
      this.updateLevels(currentFloor + 1, 1);
    }
  };

  downOneFloor = () => {
    const { currentFloor } = this.props;
    if (currentFloor > 1) {
      this.updateLevels(currentFloor - 1, 1);
    }
  };

  updateLevels = async (newLevel) => {
    const { dispatch } = this.props;

    await dispatch(ThreeSixtyAction.setCurrentLevel(newLevel));

    await dispatch(ThreeSixtyAction.getScenes());

    await dispatch(ThreeSixtyAction.getRoomUseWithFinishes());

    await dispatch(PanoramaAction.createPanoramaInfo());

    dispatch(PanoramaAction.setPanorama());
  };

  handleResize = () => {
    this.setState({ isPortrait: window.innerWidth < window.innerHeight });
  };

  render() {
    const {
      scenes = [],
      selectedScene,
      loading,
      closeMenu,
      getPosition,
      url,
      layoutName,
      mapSize,
      totalFloors,
      currentFloor,
      size
    } = this.props;
    const { isPortrait } = this.state;
    return (
      <>
        <div className="mobile-submenu-title-container">
          <div className="mobile-submenu-title">MINIMAP</div>
          <div className="mobile-submenu-floorplan">{layoutName}</div>
        </div>
        <div
          className="mobile-minimap-container d-flex flex-column justify-content-center align-items-center"
          style={{
            height:
              isPortrait && mapSize.desktop.width > mapSize.desktop.height
                ? size.width
                : size.height
          }}
        >
          <div
            id="minimap"
            className={`map-mobile-menu map-mobile-container sub-mobile-menu d-flex flex-column justify-content-center align-items-center ${
              loading ? 'display-none' : ''
            } ${isPortrait &&
              mapSize.desktop.width > mapSize.desktop.height &&
              'verticalPortrait'}`}
            onClick={getPosition}
            style={{
              backgroundImage: `url(${url})`,
              width: size.width,
              height: size.height,
              backgroundSize: `${size.width}px ${size.height}px`,
              backgroundRepeat: 'no-repeat',
              position: 'absolute'
            }}
          >
            <div
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              {scenes.map((scene, index) => (
                <Hotspot
                  key={`${scene.key}-${index * 1}`}
                  name={scene.key.toLowerCase()}
                  id={deleteWhiteSpaces(scene.key.toLowerCase())}
                  active={selectedScene === scene.key.toLowerCase()}
                  index={index}
                  onClick={this.changeScene}
                  closeMenu={closeMenu}
                  top={scene.y}
                  left={scene.x}
                  mapSize={mapSize}
                />
              ))}
            </div>
          </div>
        </div>
        <FloorsMenuMobile
          totalFloors={totalFloors}
          currentFloor={currentFloor}
          upOneFloor={this.upOneFloor}
          downOneFloor={this.downOneFloor}
        />
      </>
    );
  }
}

MiniMap.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
  selectedScene: string.isRequired,
  loading: bool,
  getPosition: func,
  url: string.isRequired,
  closeMenu: func.isRequired,
  layoutName: string.isRequired,
  mapSize: shape({}).isRequired,
  totalFloors: number.isRequired,
  currentFloor: number.isRequired,
  dispatch: func.isRequired,
  size: shape({}).isRequired
};

MiniMap.defaultProps = {
  loading: false,
  getPosition: () => {}
};

const mapStateToProps = (state) => ({
  scenes: mapScenesSelector(state),
  selectedScene: getSelectedScene(state),
  loading: loadingSelector(state),
  url: imageMapSelector(state),
  mapSize: mapSizeSelector(state),
  selectedMenuOption: menuOptionSelector(state),
  showMiniMap: showMiniMapSelector(state),
  totalFloors: totalLevelsSelector(state),
  currentFloor: currentFloorSelector(state),
  size: sizeSelectorMobile(state),
  layoutName: state.threeSixty.displayName
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniMap);

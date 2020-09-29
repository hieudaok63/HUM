import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, string, func, number, shape, bool } from 'prop-types';
import Hotspot from './Hotspot';
import ThreeSixtyAction from '../stores/threeSixty/actions';
import {
  getSelectedScene,
  mapScenesSelector,
  imageMapSelector,
  mapSizeSelector,
  menuOptionSelector,
  showMiniMapSelector,
  totalLevelsSelector,
  currentFloorSelector,
  sizeSelector
} from '../selectors/Menu';
import { loadingSelector } from '../selectors/Loading';
import { deleteWhiteSpaces, isPreview } from '../utils';
import FloorsMenu from './FloorsMenu';
import './MiniMap.scss';

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

  changeScene = (e, targetName) => {
    const { dispatch } = this.props;
    const name = targetName || e.target.name || e.target.getAttribute('name');
    const selectedScene = dispatch(ThreeSixtyAction.setSelectedScene(name));
    const getStyles = dispatch(ThreeSixtyAction.getStyles());
    const getFurnitureByStyles = dispatch(
      ThreeSixtyAction.getRoomUseWithFinishes()
    );
    console.log(selectedScene, getStyles, getFurnitureByStyles);
  };

  getClickPosition = (e) => {
    const parentPosition = this.getPosition(e.target);
    const xPosition = e.clientX - parentPosition.x - 15 / 2;
    const yPosition = e.clientY - parentPosition.y - 15 / 2;
    console.log(xPosition, yPosition);
  };

  closeMenu = () => {
    const { dispatch } = this.props;
    dispatch(ThreeSixtyAction.setSelectedMenuOption(''));
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

    const currentLevel = await dispatch(
      ThreeSixtyAction.currentLevel(newLevel)
    );

    const scenes = await dispatch(ThreeSixtyAction.getScenes());

    const roomUseWithFInishes = await dispatch(
      ThreeSixtyAction.getRoomUseWithFinishes()
    );

    console.log(currentLevel, scenes, roomUseWithFInishes);
  };

  handleResize = () => {
    this.setState({ isPortrait: window.innerWidth < window.innerHeight });
  };

  render() {
    const {
      scenes = [],
      selectedScene,
      loading,
      url,
      totalFloors,
      currentFloor,
      showMiniMap,
      mapSize,
      size
    } = this.props;
    const { isPortrait } = this.state;
    console.log('MiniMap', showMiniMap);
    return (
      <>
        {Object.keys(mapSize).length !== 0 && mapSize.constructor === Object && (
          <div
            className={`d-none ${!isPreview() ? 'd-lg-block d-md-block' : ''} ${
              !showMiniMap ? 'scale-cero' : 'map-open'
            }`}
          >
            <div
              className="mini-map-container"
              style={{
                height:
                  isPortrait && mapSize.desktop.width > mapSize.desktop.height
                    ? size.width
                    : size.height
              }}
            >
              <div className="map-container d-flex justify-content-center align-items-center">
                <div
                  id="minimap"
                  className={`mini-map ${
                    loading ? 'display-none' : ''
                  } ${isPortrait &&
                    mapSize.desktop.width > mapSize.desktop.height &&
                    'verticalPortrait'}`}
                  onClick={this.getPosition}
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
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative'
                    }}
                  >
                    {scenes.map((scene, index) => (
                      <Hotspot
                        key={`${scene.key}-${index * 1}`}
                        name={scene.key.toLowerCase()}
                        id={deleteWhiteSpaces(scene.key.toLowerCase())}
                        active={selectedScene === scene.key.toLowerCase()}
                        index={index}
                        onClick={this.changeScene}
                        top={scene.y}
                        left={scene.x}
                        closeMenu={this.closeMenu}
                        loading={loading}
                        mapSize={mapSize}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${!showMiniMap ? 'scale-cero' : 'map-open'} ${
                loading ? 'display-none' : ''
              }`}
            >
              <FloorsMenu
                hide={isPreview()}
                totalFloors={totalFloors}
                currentFloor={currentFloor}
                upOneFloor={this.upOneFloor}
                downOneFloor={this.downOneFloor}
                loading={loading}
                mapSizeHeight={
                  isPortrait && mapSize.desktop.width > mapSize.desktop.height
                    ? size.width
                    : size.height
                }
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

MiniMap.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
  selectedScene: string.isRequired,
  loading: bool.isRequired,
  url: string.isRequired,
  totalFloors: number.isRequired,
  currentFloor: number.isRequired,
  showMiniMap: bool.isRequired,
  mapSize: shape({}).isRequired,
  dispatch: func.isRequired,
  size: shape({}).isRequired
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
  size: sizeSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniMap);

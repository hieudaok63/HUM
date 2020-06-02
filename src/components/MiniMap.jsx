import React, { Component } from 'react';
import { arrayOf, string, func, number, shape, bool } from 'prop-types';
import Hotspot from './Hotspot';
import { deleteWhiteSpaces } from '../utils';
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

  handleResize = () => {
    this.setState({ isPortrait: window.innerWidth < window.innerHeight });
  };

  render() {
    const {
      scenes = [],
      selectedScene,
      classes,
      loading,
      onClick,
      getPosition,
      url,
      hide,
      totalFloors,
      currentFloor,
      upOneFloor,
      downOneFloor,
      isPreview,
      onSelectedMenuOption,
      show,
      runSteps,
      step,
      changeStep,
      mapSize
    } = this.props;
    const { isPortrait } = this.state;
    const maxMapHeight =
      Math.round(
        ((window.innerWidth - 160) * mapSize.desktop.width) /
          mapSize.desktop.height
      ) <
      window.innerHeight - 160
        ? Math.round(
            ((window.innerWidth - 160) * mapSize.desktop.width) /
              mapSize.desktop.height
          )
        : window.innerHeight - 160;
    const maxMapWidth =
      Math.round(
        ((window.innerWidth - 160) * mapSize.desktop.width) /
          mapSize.desktop.height
      ) <
      window.innerHeight - 160
        ? Math.round(
            ((window.innerWidth - 160) * mapSize.desktop.height) /
              mapSize.desktop.width
          )
        : Math.round(
            ((window.innerHeight - 160) * mapSize.desktop.height) /
              mapSize.desktop.width
          );
    const size =
      isPortrait && mapSize.desktop.width > mapSize.desktop.height
        ? {
            width:
              window.innerWidth - 160 < mapSize.desktop.width
                ? maxMapHeight
                : mapSize.desktop.width,
            height:
              window.innerWidth - 160 < mapSize.desktop.width
                ? maxMapWidth
                : mapSize.desktop.height
          }
        : {
            width:
              window.innerWidth - 160 < mapSize.desktop.width
                ? window.innerWidth - 160
                : mapSize.desktop.width,
            height:
              window.innerWidth - 160 < mapSize.desktop.width
                ? Math.round(
                    ((window.innerWidth - 160) * mapSize.desktop.height) /
                      mapSize.desktop.width
                  )
                : mapSize.desktop.height
          };
    return (
      <div
        className={`d-none ${!isPreview ? 'd-lg-block d-md-block' : ''} ${
          !show ? 'scale-cero' : 'map-open'
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
              className={`${classes} ${
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
                    onClick={onClick}
                    top={scene.y}
                    left={scene.x}
                    closeMenu={() => onSelectedMenuOption('')}
                    showTooltip={
                      step ===
                        `${deleteWhiteSpaces(
                          scene.key.toLowerCase()
                        )}-hotspot` && runSteps
                    }
                    changeStep={changeStep}
                    loading={loading}
                    mapSize={mapSize}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`${!show ? 'scale-cero' : 'map-open'}`}>
          <FloorsMenu
            hide={hide}
            totalFloors={totalFloors}
            currentFloor={currentFloor}
            upOneFloor={upOneFloor}
            downOneFloor={downOneFloor}
            loading={loading}
            mapSizeHeight={
              isPortrait && mapSize.desktop.width > mapSize.desktop.height
                ? size.width
                : size.height
            }
          />
        </div>
      </div>
    );
  }
}

MiniMap.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
  selectedScene: string.isRequired,
  classes: string.isRequired,
  loading: bool.isRequired,
  onClick: func.isRequired,
  getPosition: func,
  url: string.isRequired,
  hide: bool.isRequired,
  totalFloors: number.isRequired,
  currentFloor: number.isRequired,
  upOneFloor: func.isRequired,
  downOneFloor: func.isRequired,
  isPreview: bool.isRequired,
  onSelectedMenuOption: func.isRequired,
  show: bool.isRequired,
  runSteps: bool.isRequired,
  step: string.isRequired,
  changeStep: func.isRequired,
  mapSize: shape({}).isRequired
};

MiniMap.defaultProps = {
  getPosition: () => {}
};

export default MiniMap;

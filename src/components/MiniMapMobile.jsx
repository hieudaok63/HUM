import React, { Component, Fragment } from 'react';
import { arrayOf, string, func, shape, bool } from 'prop-types';
import Hotspot from './Hotspot';
import { deleteWhiteSpaces } from '../utils';
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
      closeMenu,
      getPosition,
      url,
      layoutName,
      mapSize
    } = this.props;
    const { isPortrait } = this.state;
    const size =
      isPortrait && mapSize.desktop.width > mapSize.desktop.height
        ? {
            width:
              window.innerWidth - 69 < mapSize.desktop.width
                ? Math.round(
                    ((window.innerWidth - 69) * mapSize.desktop.width) /
                      mapSize.desktop.height
                  )
                : mapSize.desktop.width,
            height:
              window.innerWidth - 69 < mapSize.desktop.width
                ? window.innerWidth - 69
                : mapSize.desktop.height
          }
        : {
            width:
              window.innerWidth - 69 < mapSize.desktop.width
                ? window.innerWidth - 69
                : mapSize.desktop.width,
            height:
              window.innerWidth - 69 < mapSize.desktop.width
                ? Math.round(
                    ((window.innerWidth - 69) * mapSize.desktop.height) /
                      mapSize.desktop.width
                  )
                : mapSize.desktop.height
          };
    return (
      <Fragment>
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
                  closeMenu={closeMenu}
                  top={scene.y}
                  left={scene.x}
                />
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

MiniMap.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
  selectedScene: string.isRequired,
  classes: string.isRequired,
  loading: bool,
  onClick: func.isRequired,
  getPosition: func,
  url: string.isRequired,
  closeMenu: func.isRequired,
  layoutName: string.isRequired,
  mapSize: shape({}).isRequired
};

MiniMap.defaultProps = {
  loading: false,
  getPosition: () => {}
};

export default MiniMap;

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, Fragment } from 'react';
import { string, func, number } from 'prop-types';
import ImageContainerCard from './ImageContainerCard';

class ImageMenuItem extends Component {
  constructor() {
    super();

    this.state = {
      loaded: false
    };
  }

  onLoad = () => {
    this.setState(() => ({ loaded: true }));
  };

  onError = () => {
    this.setState(() => ({ loaded: false }));
  };

  render() {
    const {
      name,
      index,
      img,
      onClick,
      selected,
      keyName,
      type,
      closeMenu
    } = this.props;
    const { loaded } = this.state;
    return (
      <Fragment>
        <div
          className={`image-container justify-content-center align-items-center ${
            (selected.toLowerCase() === name.toLowerCase() ||
              selected.toLowerCase() === type.toLowerCase() ||
              selected.toLowerCase() === keyName.toLowerCase()) &&
            loaded
              ? 'active'
              : ''
          }`}
        >
          {!loaded && <ImageContainerCard />}
          <div
            className={`image ${loaded ? 'loaded' : 'loading'}`}
            to-scene={index}
            name={name}
            onClick={(e) => {
              onClick(e, keyName);
              closeMenu();
            }}
          >
            <div className="image_title">
              <span>{name}</span>
            </div>
            <span>
              <img
                id={name.toLowerCase()}
                src={`${img}`}
                onLoad={() => {
                  this.onLoad();
                }}
                onError={() => {
                  this.onError();
                }}
                alt={name}
              />
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}

ImageMenuItem.propTypes = {
  name: string.isRequired,
  index: number.isRequired,
  img: string.isRequired,
  onClick: func.isRequired,
  keyName: string.isRequired,
  selected: string,
  type: string,
  closeMenu: func
};

ImageMenuItem.defaultProps = {
  selected: '',
  type: '',
  closeMenu: () => {}
};
export default ImageMenuItem;

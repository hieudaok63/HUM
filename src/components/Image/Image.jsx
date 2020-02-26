import React from 'react';
import { string, func, bool } from 'prop-types';

const Image = ({
  className,
  loadedClassName,
  loadingClassName,
  src,
  onClick,
  alt,
  id,
  onLoad,
  onError,
  loaded
}) => (
  <img
    id={id}
    src={src}
    onClick={onClick}
    onLoad={() => {
      onLoad();
    }}
    onError={() => {
      onError();
    }}
    className={`${className} ${loaded ? loadedClassName : loadingClassName}`}
    alt={alt}
  />
);

Image.propTypes = {
  src: string.isRequired,
  alt: string.isRequired,
  id: string.isRequired,
  onLoad: func.isRequired,
  onError: func.isRequired,
  loaded: bool.isRequired,
  onClick: func,
  className: string,
  loadingClassName: string,
  loadedClassName: string
};

Image.defaultProps = {
  className: '',
  loadingClassName: 'img-loading',
  loadedClassName: 'img-loaded',
  onClick: () => {}
};

export default Image;

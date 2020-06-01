import { Texture, RGBAFormat, RGBFormat } from 'three';

function imageLoader(
  url,
  onLoad = () => {},
  onProgress = () => {},
  onError = () => {}
) {
  let arrayBufferView;
  let blob;

  // Construct a new XMLHttpRequest
  const urlCreator = window.URL || window.webkitURL;
  const image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');

  const onImageLoaded = () => {
    urlCreator.revokeObjectURL(image.src);
    onLoad(image);
  };

  if (url.indexOf('data:') === 0) {
    image.addEventListener('load', onImageLoaded, false);
    image.src = url;
    return image;
  }

  image.crossOrigin = this.crossOrigin !== undefined ? this.crossOrigin : '';

  const request = new window.XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.addEventListener('error', onError);
  request.addEventListener('progress', (event) => {
    if (!event) return;

    const { loaded, total, lengthComputable } = event;

    if (lengthComputable) {
      onProgress({ loaded, total });
    }
  });

  request.addEventListener('loadend', (event) => {
    if (!event) return;
    const {
      currentTarget: { response }
    } = event;

    arrayBufferView = new Uint8Array(response);
    blob = new window.Blob([arrayBufferView]);

    image.addEventListener('load', onImageLoaded, false);
    image.src = urlCreator.createObjectURL(blob);
  });

  request.send(null);
  return undefined;
}

const ImageLoader = {
  load: imageLoader
};

function textureLoader(url, onLoad = () => {}, onProgress, onError) {
  const texture = new Texture();

  ImageLoader.load(
    url,
    (image) => {
      texture.image = image;

      // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
      const isJPEG =
        url.search(/\.(jpg|jpeg)$/) > 0 ||
        url.search(/^data:image\/jpeg/) === 0;

      texture.format = isJPEG ? RGBFormat : RGBAFormat;
      texture.needsUpdate = true;

      onLoad(texture);
    },
    onProgress,
    onError
  );

  return texture;
}

const TextureLoader = {
  Load: textureLoader
};

export { ImageLoader, TextureLoader };

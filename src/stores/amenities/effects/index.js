import PanoramaModel from '../models';
import SIMPLEPANO from '../../../classes/SimplePano';

export default class AmenitiesEffect {
  /* */
  static createPanorama(container, image) {
    const model = new PanoramaModel({
      container,
      width: window.innerWidth,
      height: window.innerHeight,
      radius: 100,
      widthSegments: 100,
      heightSegments: 100,
      image
    });

    const pano = new SIMPLEPANO();
    pano.init(model);
    pano.animate();

    return pano;
  }
}

import loader from '../../../assets/home-white.gif';

export default class ThreePanoramaModel {
  constructor(data) {
    this.container = data.container;
    this.image = data.image;
    this.width = data.width;
    this.height = data.height;
    this.radius = data.radius;
    this.widthSegments = data.widthSegments;
    this.heightSegments = data.heightSegments;
    this.hotspots = data.hotspots;
    this.startScenePosition = data.startScenePosition;
  }

  container = null;

  image = null;

  width = 0;

  height = 0;

  radius = 100;

  widthSegments = 100;

  heightSegments = 100;

  hotspots = [];

  loader = loader;

  startScenePosition = {};
}

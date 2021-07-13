import loader from '../../../assets/home-white.gif';

export default class SimplePanoramaModel {
  constructor(data) {
    console.log('-->', data);
    this.container = data.container;
    this.width = data.width;
    this.height = data.height;
    this.radius = data.radius;
    this.widthSegments = data.widthSegments;
    this.heightSegments = data.heightSegments;
    this.image = data.image;
    this.spots = data.spots;
    this.language = data.language;
    this.changeBetweenPanos = data.changeBetweenPanos;
  }

  container = null;

  width = 0;

  height = 0;

  radius = 100;

  widthSegments = 100;

  heightSegments = 100;

  image = '';

  loader = loader;

  spots = [];

  changeBetweenPanos = () => {};
}

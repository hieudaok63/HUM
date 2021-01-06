import loader from '../../../assets/home-white.gif';

export default class ThreePanoramaModel {
  constructor(data) {
    this.container = data.container;
    this.width = data.width;
    this.height = data.height;
    this.radius = data.radius;
    this.widthSegments = data.widthSegments;
    this.heightSegments = data.heightSegments;
    this.scenes = data.scenes;
    this.selectedScene = data.selectedScene;
    this.use = data.use;
    this.finish = data.finish;
    this.level = data.level;
    this.style = data.style;
  }

  container = null;

  width = 0;

  height = 0;

  radius = 100;

  widthSegments = 100;

  heightSegments = 100;

  loader = loader;

  scenes = [];

  selectedScene = '';

  level = 1;

  style = '';
}

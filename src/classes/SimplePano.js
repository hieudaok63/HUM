import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class SimplePano {
  init = ({
    container,
    image,
    width,
    height,
    radius,
    widthSegments,
    heightSegments,
    loader
  }) => {
    this.container = container;
    this.image = image;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.widthSegments = widthSegments;
    this.heightSegments = heightSegments;
    this.loader = loader;
    this.loaderContainer = this.createLoader();
    this.initializeManager();
    this.initializeCamera();
    this.initializeScene();
    this.createSceneMesh();
    this.initializeRaycaster();
    this.initializeRenderer();
    this.initializeControls();
    this.bindEventListeners();
    this.loaded = true;
    this.container.appendChild(this.renderer.domElement);
  };

  /* */
  createLoader = () => {
    const loaderContainer = document.createElement('div');
    loaderContainer.classList.add('loader');
    if (this.firstLoad) {
      loaderContainer.classList.add('white-background');
    }
    const loaderImageContainer = document.createElement('div');
    loaderImageContainer.classList.add('loader-image-container');

    const loaderImage = document.createElement('img');
    loaderImage.alt = 'athum loader';
    loaderImage.src = this.loader;
    loaderImageContainer.appendChild(loaderImage);

    loaderContainer.appendChild(loaderImageContainer);
    return loaderContainer;
  };

  /* */
  initializeManager = () => {
    this.manager = new THREE.LoadingManager();
    this.manager.onStart = () => {};
    this.manager.onLoad = () => {
      if (this.firstLoad) {
        this.updateStyleCall(this.currentStyle);
      }
      this.loaderContainer.classList.add('none');
      const el = document.querySelector('.three-sixty-blur');
      if (el) {
        el.classList.add('none');
        el.addEventListener('transitionend', (event) => {
          setTimeout(() => {
            event.target.remove();
          }, 800);
        });
      }
      this.loaderContainer.addEventListener(
        'transitionend',
        this.onTransitionEnd
      );
    };
    this.manager.onProgress = (url) => {
      if (url === this.selectedSceneLoadedImage) {
        this.updateStyleCall(this.currentStyle);
      }
    };
  };

  /* */
  initializeCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      1,
      1100
    );
    this.camera.position.z = 0.1;
    // this.camera.target = new THREE.Vector3(0, 0, 0);
  };

  /* */
  initializeScene = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
  };

  /* */
  createSceneMesh = () => {
    const geometry = new THREE.SphereGeometry(
      this.radius,
      this.widthSegments,
      this.heightSegments
    );
    geometry.scale(-1, 1, 1);
    const loader = new THREE.TextureLoader(this.manager);
    loader.crossOrigin = '';
    loader.load(this.image, (texture) => {
      const material = this.createMaterial(texture);
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
    });
  };

  /* */
  createMaterial = (texture) =>
    new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });

  /* */
  initializeRaycaster = () => {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(1, 1);
  };

  /* */
  initializeRenderer = () => {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
  };

  /* */
  initializeControls = () => {
    this.control = new OrbitControls(this.camera, this.renderer.domElement);
    this.control.enablePan = false;
    this.control.enableZoom = false;
    this.control.enableDamping = true;
    this.control.minPolarAngle = 0.8;
    this.control.maxPolarAngle = 2.4;
    this.control.dampingFactor = 0.2;
    // negating makes invert this.control.
    this.control.rotateSpeed = -0.2;

    this.control.update();
  };

  /* */
  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  /* */
  bindEventListeners = () => {};

  /* */
  update = () => {
    this.control.update();
    this.render();
  };

  /* */
  animate = () => {
    this.update();
    window.requestAnimationFrame(this.animate);
  };
}
export default SimplePano;

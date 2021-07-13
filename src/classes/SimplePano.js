import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from '../lib/three/loaders/loaders';
import Data from '../assets/Data';

class SimplePano {
  init = ({
    container,
    image,
    width,
    height,
    radius,
    widthSegments,
    heightSegments,
    loader,
    spots,
    language,
    changeBetweenPanos
  }) => {
    this.container = container;
    this.language = language;
    this.tooltip = this.createTooltip();
    this.image = image;
    this.spots = spots;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.widthSegments = widthSegments;
    this.heightSegments = heightSegments;
    this.loader = loader;
    this.changeBetweenPanos = changeBetweenPanos;
    this.loaderContainer = this.createLoader();
    this.container.appendChild(this.loaderContainer);
    this.mesh = null;
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
  createTooltip = () => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    this.container.appendChild(tooltip);
    return tooltip;
  };

  /* */
  createLoader = () => {
    const loaderContainer = document.createElement('div');
    loaderContainer.classList.add('loader');
    loaderContainer.classList.add('white-background');
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
  onTransitionEnd = (event) => {
    event.target.remove();
    this.loaderContainer.classList.remove('white-background');
    this.loaderContainer.classList.remove('none');
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
    const time = new Date().getTime();
    loader.load(`${this.image}?${time}`, (texture) => {
      const material = this.createMaterial(texture);
      const mesh = new THREE.Mesh(geometry, material);
      this.mesh = mesh;
      this.scene.add(mesh);
      this.createHotspots();
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
  createHotspots = () => {
    this.spots.forEach((spot) => {
      this.createHotspot(spot);
    });
  };

  /* */
  createHotspot = ({ x, y, z, name, key, thumbnail, in: whereItExists }) => {
    const point = new THREE.Vector3(x, y, z);
    const texture = new TextureLoader.Load(Data.AvriaHotpotArrow);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture
    });
    const sprite = new THREE.Sprite(spriteMaterial);

    sprite.name = name;
    sprite.isHotspot = true;
    sprite.key = key;
    sprite.in = whereItExists;
    sprite.thumbnail = thumbnail;

    sprite.position.copy(
      point
        .clone()
        .normalize()
        .multiplyScalar(15)
    );
    this.mesh.add(sprite);
  };

  /* */
  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  /* */
  getMouse = (event) => {
    let deltaX = 0;
    let deltaY = 0;
    if (event.touches) {
      if (event.touches.length > 0) {
        deltaX = event.touches[0].clientX;
        deltaY = event.touches[0].clientY;
      }
    } else {
      deltaX = event.clientX;
      deltaY = event.clientY;
    }

    this.mouse = new THREE.Vector2(
      (deltaX / this.width) * 2 - 1,
      -(deltaY / this.height) * 2 + 1
    );
  };

  /* */
  onPointerStart = (event) => {
    this.mouseDown = true;
    this.getMouse(event);
    // this.displayPosition();
  };

  /* */
  onPointerEnd = () => {
    this.mouseDown = false;
    this.tooltip.classList.remove('is-active');
    this.handleSpriteClick();
  };

  /* */
  onPointerMove = (event) => {
    this.getMouse(event);

    if (this.loaded) {
      this.intersects();
    }
  };

  /* */
  intersects = () => {
    if (!this.mouseDown) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        const { object } = intersects[0];
        if (this.INTERSECTED !== object) {
          if (this.INTERSECTED) {
            if (this.INTERSECTED.type === 'Sprite') {
              this.tooltip.classList.remove('is-active');
              this.hover = false;
              this.container.style.cursor = 'default';
            }
          }
          this.INTERSECTED = object;

          if (this.INTERSECTED.type === 'Sprite') {
            if (!this.mouseDown) {
              const position = this.INTERSECTED.position
                .clone()
                .project(this.camera);

              this.tooltip.style.top = `${((-1 * position.y + 1) *
                this.height) /
                2}px`;
              this.tooltip.style.left = `${((position.x + 1) * this.width) /
                2}px`;
              this.tooltip.classList.add('is-active');
              this.tooltip.innerHTML = this.INTERSECTED.name[this.language];
              this.container.style.cursor = 'pointer';
            }
            this.hover = true;
          }
        }
      } else {
        this.INTERSECTED = null;
        this.hover = false;
      }
    }
  };

  /* */
  handleSpriteClick = () => {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );
    if (intersects.length > 0) {
      this.CLICKEDSPRITE = intersects[0].object;
      if (
        this.CLICKEDSPRITE.type === 'Sprite' &&
        this.CLICKEDSPRITE.isHotspot
      ) {
        // Todo: make function to change between Panos
        if (this.changeBetweenPanos) {
          this.changeBetweenPanos(
            this.CLICKEDSPRITE.in,
            this.CLICKEDSPRITE.key
          );
        }
      }
    }
  };

  /* */
  bindEventListeners = () => {
    this.container.addEventListener('pointerdown', this.onPointerStart);
    this.container.addEventListener('pointerup', this.onPointerEnd);
    this.container.addEventListener('mousemove', this.onPointerMove, {
      passive: true
    });
    // this.container.addEventListener('touchstart', this.onPointerStart);
    // this.container.addEventListener('touchend', this.onPointerEnd);
    // this.container.addEventListener('touchcancel', this.onPointerEnd);
    // document.addEventListener('keypress', this.handleKeyPress);
    // document.addEventListener('keyup', this.handleKeyUp);
  };

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

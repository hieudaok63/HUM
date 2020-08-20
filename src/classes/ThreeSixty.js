import * as THREE from 'three';
import Tween from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DeviceOrientationControls } from '../lib/three/DeviceOrientationControls';
import { TextureLoader } from '../lib/three/loaders/loaders';

class ThreeSixtySphere {
  constructor(
    container,
    image,
    width,
    height,
    radius,
    widthSegments,
    heightSegments,
    tooltip
  ) {
    this.container = container;
    this.tooltip = tooltip;
    this.image = image;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.widthSegments = widthSegments;
    this.heightSegments = heightSegments;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.mesh = null;
    this.geometry = null;
    this.texture = null;
    this.material = null;
    this.autoRotate = false;
    this.raycaster = null;
    this.mouse = null;
    this.mouseDown = null;
    this.ctrl = false;
    this.control = null;
    this.hasGyro = false;
    this.scaleUpAnimation = new Tween.Tween();
    this.scaleDownAnimation = new Tween.Tween();
    this.easingAnimationUp = [];
    this.easingAnimationDown = [];
    this.showAnimation = [];
    this.hotspots = [];
    this.createdHotspots = [];
    this.scaled = null;
    this.scaleUpAnimation = null;
    this.INTERSECTED = '';
    this.loaded = false;
    this.firstLoad = true;
    this.loadingCallBack = null;
    this.updateCallBack = null;
    this.currentStylle = 'default';
  }

  init = ({
    container,
    image,
    width,
    height,
    radius,
    widthSegments,
    heightSegments,
    hotspots,
    loader,
    loadingCallBack = null,
    updateCallBack = null,
    startScenePosition
  }) => {
    this.container = container;
    this.loader = loader;
    this.loaderContainer = this.createLoader();
    this.container.appendChild(this.loaderContainer);
    this.blurContainer = this.createBlur();
    this.tooltip = this.createTooltip();
    this.image = image;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.widthSegments = widthSegments;
    this.heightSegments = heightSegments;
    this.hotspots = hotspots;
    this.loadingCallBack = loadingCallBack !== null ? loadingCallBack : null;
    this.updateCallBack = updateCallBack !== null ? updateCallBack : null;
    this.startScenePosition = startScenePosition;
    this.initializeCamera();
    this.initializeScene();
    this.initializeGeometry();
    this.initializeTexture(this.image);
    this.initializeMaterial();
    this.initializeMesh();
    this.initializeRaycaster();
    this.addToScene(this.mesh);
    this.initializeRenderer();
    this.initializeControls();
    this.bindEventListeners();
    this.container.appendChild(this.renderer.domElement);
  };

  sceneUpdate = ({ image, hotspots }) => {
    this.stopHotstposAnimation();
    this.image = image;
    this.hotspots = hotspots;
    this.container.appendChild(this.blurContainer);
    this.container.appendChild(this.loaderContainer);
    this.mesh.children = [];
    this.initializeTexture(this.image);
    this.initializeMaterial();
  };

  createTooltip = () => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    this.container.appendChild(tooltip);
    return tooltip;
  };

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

  createBlur = () => {
    const blurContainer = document.createElement('div');
    blurContainer.classList.add('three-sixty-blur');
    return blurContainer;
  };

  LoadingManager = () => {
    if (this.loaderContainer) {
      this.loaderContainer.classList.add('none');
      this.blurContainer.classList.add('none');
      this.mesh.material = this.material;
      this.mesh.material.needsUpdate = true;
      this.loaderContainer.addEventListener(
        'transitionend',
        this.onTransitionEnd
      );
    }
  };

  onTransitionEnd = (event) => {
    event.target.remove();
    const el = document.querySelector('.three-sixty-blur');
    if (el) {
      el.remove();
    }
    if (this.loadingCallBack !== null) {
      this.loadingCallBack(false);
    }
    this.updateHotspots();
    this.animateHotspot();
    this.firstLoad = false;
    this.loaderContainer.classList.remove('white-background');
    this.loaderContainer.classList.remove('none');
    this.blurContainer.classList.remove('none');
  };

  initializeCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      1,
      1100
    );
    this.camera.target = new THREE.Vector3(0, 0, 0);
    this.camera.position.z = Math.PI;
  };

  initializeScene = () => {
    this.scene = new THREE.Scene();
  };

  initializeGeometry = () => {
    this.geometry = new THREE.SphereBufferGeometry(
      this.radius,
      this.widthSegments,
      this.heightSegments
    );
    this.geometry.scale(-1, 1, 1);
  };

  initializeTexture = (image) => {
    this.texture = new THREE.TextureLoader().load(image, () => {
      setTimeout(() => {
        this.LoadingManager();
        this.loaded = true;
      }, 2000);
    });
  };

  initializeMaterial = () => {
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      color: 0xffffff,
      side: THREE.DoubleSide
    });
  };

  initializeMesh = () => {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = 'planet';
  };

  initializeRaycaster = () => {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(1, 1);
  };

  addToScene = (obj) => {
    this.scene.add(obj);
  };

  initializeRenderer = () => {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
  };

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

  initializeMobileControls = () => {
    this.control = new DeviceOrientationControls(
      this.camera,
      this.renderer.domElement
    );
    this.control.enabled = true;
  };

  updateHotspots = () => {
    this.hotspots.forEach((hotspot) => {
      console.log(hotspot);
      this.createHotspot(hotspot);
    });
  };

  bindEventListeners = () => {
    this.container.addEventListener('mousedown', this.onPointerStart);
    this.container.addEventListener('mouseup', this.onPointerEnd);
    this.container.addEventListener('mousemove', this.onPointerMove, {
      passive: true
    });
    this.container.addEventListener('touchstart', this.onPointerStart);
    this.container.addEventListener('touchend', this.onPointerEnd);
    this.container.addEventListener('touchcancel', this.onPointerEnd);
    document.addEventListener('keypress', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyUp);
  };

  stopEasingAnimations = () => {
    this.easingAnimationDown.forEach((easingAnimationDown) =>
      easingAnimationDown.stop()
    );

    this.easingAnimationUp.forEach((easingAnimationUp) =>
      easingAnimationUp.stop()
    );
  };

  startEasingAnimationUp = () => {
    this.easingAnimationDown.forEach((easingAnimationDown) =>
      easingAnimationDown.stop()
    );

    this.easingAnimationUp.forEach((easingAnimationUp) =>
      easingAnimationUp.start()
    );
  };

  startEasingAnimationDown = () => {
    this.easingAnimationDown.forEach((easingAnimationDown) =>
      easingAnimationDown.start()
    );

    this.easingAnimationUp.forEach((easingAnimationUp) =>
      easingAnimationUp.stop()
    );
  };

  stopHotstposAnimation = () => {
    this.easingAnimationUp.forEach((animation) => animation.stop());
    this.easingAnimationDown.forEach((animation) => animation.stop());
    this.easingAnimationUp = [];
    this.easingAnimationDown = [];
    Tween.removeAll();
    clearInterval(this.interval);
  };

  animateHotspot = () => {
    if (!this.container) {
      return;
    }

    this.createdHotspots.forEach((sprite) => {
      this.easingAnimationUp.push(
        new Tween.Tween(sprite.scale)
          .to(
            {
              x: sprite.scale.x * 1.1,
              z: sprite.scale.z * 1.1,
              y: sprite.scale.y * 1.1
            },
            2000
          )
          .easing(Tween.Easing.Elastic.Out)
      );

      this.easingAnimationDown.push(
        new Tween.Tween(sprite.scale)
          .to(
            {
              x: sprite.scale.x,
              z: sprite.scale.z,
              y: sprite.scale.y
            },
            2000
          )
          .easing(Tween.Easing.Elastic.Out)
      );
    });

    let timesRuning = 1;
    this.interval = setInterval(() => {
      this.startAnimation(timesRuning);
      if (timesRuning % 4 === 0) {
        setTimeout(() => {
          timesRuning += 1;
        }, 3000);
      } else {
        timesRuning += 1;
      }
    }, 2000);
  };

  startAnimation = (timesRuning) => {
    if (this.hover) {
      this.stopEasingAnimations();
    } else if (!this.hover) {
      if (timesRuning % 4 === 0) {
        this.stopEasingAnimations();
      } else {
        this.startEasingAnimationUp();
        setTimeout(() => {
          if (this.hover) {
            this.stopEasingAnimations();
          } else {
            this.startEasingAnimationDown();
          }
        }, 1000);
      }
    }
  };

  createHotspot = ({ x, y, z, name, key, img, level }) => {
    const point = new THREE.Vector3(x, y, z);
    const texture = new TextureLoader.Load(img);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.name = name;
    sprite.isHotspot = true;
    sprite.key = key;
    sprite.position.copy(
      point
        .clone()
        .normalize()
        .multiplyScalar(10)
    );
    if (level) {
      sprite.level = level;
    }
    this.createdHotspots.push(sprite);
    this.mesh.add(sprite);
  };

  isGyro = () => {
    if (typeof DeviceOrientationEvent !== 'undefined') {
      if (
        typeof DeviceOrientationEvent.requestPermission === 'function' ||
        (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) &&
          window.DeviceOrientationEvent)
      ) {
        this.hasGyro = true;
      } else {
        console.error('NO GYRO');
      }
    }
  };

  handleOrientation = () => {
    this.deviceOrientation = true;
  };

  handleKeyPress = (event) => {
    const key = event.keyCode;
    console.log(key);
    switch (key) {
      case 60:
        this.ctrl = true;
        break;
      case 45:
        console.log('HEY');
        this.activateGyro();
        break;
      case 161:
        this.updateCameraPosition(
          0.00964106833161872,
          6.123233995736772e-19,
          -0.002655146215382272
        );
        break;

      default:
        break;
    }
  };

  handleKeyUp = () => {
    this.ctrl = false;
  };

  onWindowResize = (width, height) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.width = width;
    this.height = height;
    this.renderer.setSize(this.width, this.height);
  };

  activateGyro = () => {
    if (!this.hasGyro) {
      this.isGyro();
      if (this.hasGyro) {
        this.control.enabled = false;
        this.initializeMobileControls();
      }
    } else {
      this.hasGyro = false;
      this.control.enabled = false;
      this.initializeControls();
    }
  };

  getMouse = (event) => {
    this.mouse = new THREE.Vector2(
      (event.clientX / this.width) * 2 - 1,
      -(event.clientY / this.height) * 2 + 1
    );
  };

  onPointerEnd = () => {
    this.mouseDown = false;
  };

  onPointerStart = (event) => {
    this.mouseDown = true;
    this.getMouse(event);
    this.tooltip.classList.remove('is-active');
    this.handleSpriteClick();
    if (this.ctrl) {
      this.displayPosition();
    }
  };

  onPointerMove = (event) => {
    this.getMouse(event);
    if (this.loaded) {
      this.intersects();
    }
  };

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
        if (this.updateCallBack) {
          console.log(this.CLICKEDSPRITE);
          this.updateCallBack(
            this,
            this.CLICKEDSPRITE.key,
            this.CLICKEDSPRITE.level,
            this.currentStylle
          );
        }
        console.log(this.CLICKEDSPRITE.name, this.CLICKEDSPRITE.key);
      }
    }
  };

  displayPosition = () => {
    const intersection = this.raycaster.intersectObject(this.mesh);
    if (intersection.length > 0) {
      const { point } = intersection[0];
      console.log('hotspot location', point);
      console.log('camera position', this.camera.position);
    }
  };

  scaleUpSprite = (intersected) =>
    new Tween.Tween(intersected.scale)
      .to(
        {
          x: intersected.scale.x * 1.3,
          y: intersected.scale.y * 1.3,
          z: intersected.scale.z * 1.3
        },
        500
      )
      .onUpdate(() => {
        this.render();
      })
      .easing(Tween.Easing.Elastic.Out);

  scaleDownSprite = (intersected) =>
    new Tween.Tween(intersected.scale)
      .to(
        {
          x: intersected.scale.x,
          z: intersected.scale.z,
          y: intersected.scale.y
        },
        500
      )
      .onUpdate(() => {
        this.render();
      })
      .easing(Tween.Easing.Elastic.Out);

  showAnimation = (obj) =>
    new Tween.Tween(obj)
      .to({ opacity: 1 }, 500)
      .onStart(() => {
        console.log('start');
      })
      .easing(Tween.Easing.Quartic.Out);

  hideAnimation = (obj) =>
    new Tween.Tween(obj)
      .to({ opacity: 0 }, 500)
      .easing(Tween.Easing.Quartic.Out);

  intersects = () => {
    if (!this.mouseDown) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        if (this.INTERSECTED !== intersects[0].object) {
          if (this.INTERSECTED) {
            if (this.INTERSECTED.type === 'Sprite') {
              this.INTERSECTED.scaleUp.stop();
              this.INTERSECTED.scaleDown.start();
              delete this.INTERSECTED.scaleUp;
              delete this.INTERSECTED.scaleDown;
              this.tooltip.classList.remove('is-active');
              this.hover = false;
            }
          }

          this.INTERSECTED = intersects[0].object;
          if (this.INTERSECTED.type === 'Sprite') {
            this.INTERSECTED.scaleUp = this.scaleUpSprite(this.INTERSECTED);
            this.INTERSECTED.scaleDown = this.scaleDownSprite(this.INTERSECTED);
            this.INTERSECTED.scaleUp.start();
            if (!this.mouseDown) {
              const position = this.INTERSECTED.position
                .clone()
                .project(this.camera);
              console.log(position);
              this.tooltip.style.top = `${((-1 * position.y + 1) *
                this.height) /
                2}px`;
              this.tooltip.style.left = `${((position.x + 1) * this.width) /
                2}px`;
              this.tooltip.classList.add('is-active');
              this.tooltip.innerHTML = this.INTERSECTED.name;
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

  update = () => {
    this.control.update();
    this.render();
    Tween.update();
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  updateCameraPosition = ({ x, y, z }) => {
    this.camera.position.set(x, y, z);
  };

  setStartingScenePosition = ({ x, y, z }) => {
    this.camera.position.set(x, y, z);
  };

  getRenderer = () => this.renderer;

  getCamera = () => this.camera;

  getCameraPosition = () => this.camera.position;

  getScene = () => this.scene;

  getMatrix = () => {
    console.log('MatrixWorld', this.scene.children[0].matrixWorld);
    console.log('Matrix', this.scene.children[0].matrix);
  };

  setCurrentStyle = (currentStylle) => {
    this.currentStylle = currentStylle;
  };

  activateAutoRotate = (autoRotate) => {
    this.control.autoRotate = autoRotate;
  };

  animate = () => {
    this.update();
    window.requestAnimationFrame(this.animate);
  };
}
export default ThreeSixtySphere;

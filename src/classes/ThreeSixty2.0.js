import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { TweenLite } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DeviceOrientationControls } from '../lib/three/DeviceOrientationControls';
import { TextureLoader } from '../lib/three/loaders/loaders';
import Data from '../assets/Data';

class ThreeSixtySphere {
  constructor(
    container,
    image,
    width,
    height,
    radius,
    widthSegments,
    heightSegments,
    tooltip,
    startScenePosition
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
    this.scaleUpAnimation = new TWEEN.Tween();
    this.scaleDownAnimation = new TWEEN.Tween();
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
    this.currentFinish = 'default';
    this.startScenePosition = startScenePosition;
  }

  init = ({
    container,
    width,
    height,
    radius,
    widthSegments,
    heightSegments,
    scenes,
    selectedScene = 'default',
    use = 'default',
    finish = 'default',
    loader,
    updateCallBack,
    level
  }) => {
    this.container = container;
    this.loader = loader;
    this.loaderContainer = this.createLoader();
    this.container.appendChild(this.loaderContainer);
    this.tooltip = this.createTooltip();
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.widthSegments = widthSegments;
    this.heightSegments = heightSegments;
    this.scenes = scenes;
    this.selectedScene = selectedScene;
    this.use = use;
    this.finish = finish;
    this.updateCallBack = updateCallBack;
    this.level = level;
    this.initializeCamera();
    this.initializeScene();
    this.initializeSpheres();
    this.initializeRaycaster();
    this.initializeRenderer();
    this.initializeControls();
    this.bindEventListeners();
    this.loaded = true;
    this.container.appendChild(this.renderer.domElement);
  };

  addMeshToScene = () => {
    this.addToScene(this.mesh);
    this.mesh.opacity = 0;
    TweenLite.to(this.mesh.material, 1, {
      opacity: 1
    });
  };

  addLighting = () => {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    this.scene.add(hemiLight);
  };

  sceneUpdate = ({ image, hotspots }) => {
    this.stopHotstposAnimation();
    this.image = image;
    this.hotspots = hotspots;
    this.initializeMesh();
    this.initializeTexture(this.image);
    this.initializeMaterial();
    this.addMeshToScene();
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
    this.mesh.material = this.material;
    this.mesh.material.needsUpdate = true;
    this.updateHotspots();
    /*
    if (this.loaderContainer) {
      this.loaderContainer.classList.add('none');
      this.blurContainer.classList.add('none');
      this.mesh.material = this.material;
      this.mesh.material.needsUpdate = true;
      this.updateHotspots();
      this.loaderContainer.addEventListener(
        'transitionend',
        this.onTransitionEnd
      );
    }
    */
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

    this.firstLoad = false;
    this.loaderContainer.classList.remove('white-background');
    this.loaderContainer.classList.remove('none');
    // this.blurContainer.classList.remove('none');
  };

  initializeCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      1,
      1100
    );
    this.camera.position.z = 0.1;
    this.camera.target = new THREE.Vector3(0, 0, 0);
  };

  initializeScene = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
  };

  initializeSpheres = () => {
    const spheres = this.scenes.map((scene) => this.createSphere(scene));
    this.addToScene(spheres);
    setTimeout(() => {
      this.loaderContainer.classList.add('none');
      this.loaderContainer.addEventListener(
        'transitionend',
        this.onTransitionEnd
      );
    }, 2000);
  };

  createSphere = (scene) => this.createSceneMesh(scene);

  createSceneMesh = (scene) => {
    const useToRequest = this.getRoomToRequest(scene.uses, scene.defaultUse);
    const selectedUse = this.getUse(scene.uses, useToRequest);
    if (selectedUse) {
      const hotspots = this.assignHotspotImage(scene.hotspots);
      const finishToRequest =
        this.finish === 'default' ? scene.defaultFinish : this.finish;

      const buildedScene = this.buildScene(
        selectedUse,
        hotspots,
        scene.startScenePosition,
        finishToRequest
      );

      const geometry = new THREE.SphereGeometry(
        this.radius,
        this.widthSegments,
        this.heightSegments
      );
      geometry.scale(-1, 1, 1);

      const texture = new THREE.TextureLoader().load(buildedScene.panorama.uri);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
      });
      // material.transparent = true;

      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = buildedScene.key;

      scene.hotspots.forEach((hotspot) => {
        this.createHotspot(hotspot, mesh);
      });

      if (this.selectedScene !== mesh.name) {
        mesh.visible = false;
      }

      if (this.selectedScene === mesh.name) {
        this.animateHotspots(mesh.children);
        this.mesh = mesh;
      }

      return mesh;
    }
    return null;
  };

  getActiveMesh = (key) =>
    this.scene.children.find((mesh) => mesh.name === key);

  getRoomToRequest = (uses, defaultUse) => {
    let room = null;
    if (this.use !== '' && this.use !== null && this.use !== undefined) {
      room = this.use;
    } else {
      room = defaultUse;
    }
    const exist = uses.find((use) => use.key === room);

    return exist ? room : defaultUse;
  };

  getUse = (uses, use) => {
    const currentUse = uses.filter((item) =>
      item.key.toLowerCase() === use.toLowerCase() ? item : null
    );

    if (currentUse.length > 0) {
      return currentUse[0];
    }

    return null;
  };

  assignHotspotImage = (hotspots) =>
    hotspots.map((hotspot) => {
      const current = hotspot;
      if (typeof current.level === 'undefined') {
        current.img = Data.AvriaHotspotNew;
      } else {
        current.img = Data.AvriaHotspotStairs;
      }
      return current;
    });

  buildScene = (scene, hotspots = [], startScenePosition, finish) => {
    const { name, furniture, key, finishScenes } = scene;
    const currentFinish = this.getSelectedFinish(finishScenes, finish);
    const time = new Date().getTime();
    const uri = `${currentFinish.modes.day}?${time}`;
    const panorama = {};
    panorama.uri = uri;
    panorama.name = key;
    panorama.finish = currentFinish.key;
    return {
      name,
      key,
      panorama,
      hotspots,
      startScenePosition,
      furniture
    };
  };

  getSelectedFinish = (scenes, key) => {
    if (key === 'default' || key === undefined || scenes.length === 0) {
      return 'default';
    }
    const scene = scenes.filter((item) =>
      item.key.toLowerCase() === key.toLowerCase() ? item : null
    );

    if (scene.length > 0) {
      return scene[0];
    }

    return { key: 'default' };
  };

  initializeGeometry = () => {
    this.geometry = new THREE.SphereGeometry(
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
      side: THREE.DoubleSide
    });
    this.material.transparent = true;
  };

  initializeMesh = () => {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = 'planet';
  };

  initializeRaycaster = () => {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(1, 1);
  };

  addToScene = (objs) => {
    objs.forEach((obj) => this.scene.add(obj));
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
    TWEEN.removeAll();
    clearInterval(this.interval);
  };

  animateHotspots = (hotspots) => {
    if (!this.container) {
      return;
    }

    hotspots.forEach((sprite) => {
      this.easingAnimationUp.push(
        new TWEEN.Tween(sprite.scale)
          .to(
            {
              x: sprite.scale.x * 1.1,
              z: sprite.scale.z * 1.1,
              y: sprite.scale.y * 1.1
            },
            2000
          )
          .easing(TWEEN.Easing.Elastic.Out)
      );

      this.easingAnimationDown.push(
        new TWEEN.Tween(sprite.scale)
          .to(
            {
              x: sprite.scale.x,
              z: sprite.scale.z,
              y: sprite.scale.y
            },
            2000
          )
          .easing(TWEEN.Easing.Elastic.Out)
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

  createHotspot = ({ x, y, z, name, key, img, level }, mesh) => {
    const point = new THREE.Vector3(x, y, z);
    const texture = new TextureLoader.Load(img);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture
    });
    // spriteMaterial.alphaTest = 0.1;
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
    mesh.add(sprite);
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

    switch (key) {
      case 60:
        this.ctrl = true;
        break;
      case 45:
        this.activateGyro();
        break;
      case 49:
        this.updateCameraPosition({
          x: 0.009786302975445232,
          y: 0.001485842664739469,
          z: -0.0014214589858423182
        });
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

  onPointerEnd = () => {
    this.mouseDown = false;
    this.tooltip.classList.remove('is-active');
    this.handleSpriteClick();
    this.displayPosition();
  };

  onPointerStart = (event) => {
    this.mouseDown = true;
    this.getMouse(event);
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
        this.CLICKEDSPRITE.isHotspot &&
        this.CLICKEDSPRITE.parent.name === this.selectedScene
      ) {
        this.changeSphereScene(this.CLICKEDSPRITE.key);
        this.updateCallBack(this.CLICKEDSPRITE.key, this.CLICKEDSPRITE.level);
      }
    }
  };

  changeSphereScene = (key) => {
    TweenLite.to(this.mesh, 0.2, {
      visible: false,
      onComplete: () => {
        this.mesh = this.getActiveMesh(key);
        this.mesh.visible = true;
        this.selectedScene = this.mesh.name;
      }
    });
  };

  displayPosition = () => {
    const intersection = this.raycaster.intersectObject(this.mesh);
    if (intersection.length > 0) {
      const { point } = intersection[0];
    }
  };

  scaleUpSprite = (intersected) =>
    new TWEEN.Tween(intersected.scale)
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
      .easing(TWEEN.Easing.Elastic.Out);

  scaleDownSprite = (intersected) =>
    new TWEEN.Tween(intersected.scale)
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
      .easing(TWEEN.Easing.Elastic.Out);

  showAnimation = (obj) =>
    new TWEEN.Tween(obj)
      .to({ opacity: 1 }, 500)
      .onStart(() => {})
      .easing(TWEEN.Easing.Quartic.Out);

  hideAnimation = (obj) =>
    new TWEEN.Tween(obj)
      .to({ opacity: 0 }, 500)
      .easing(TWEEN.Easing.Quartic.Out);

  intersects = () => {
    if (!this.mouseDown) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        const { object, faceIndex } = intersects[0];
        if (object.type !== 'Sprite') {
          object.geometry.faces[faceIndex].color.set(Math.random() * 0xffffff);
          object.geometry.colorsNeedUpdate = true;
        }

        if (this.INTERSECTED !== object) {
          if (this.INTERSECTED) {
            if (
              this.INTERSECTED.type === 'Sprite' &&
              this.INTERSECTED.scaleUp !== undefined &&
              this.INTERSECTED.scaleDown !== undefined
            ) {
              this.INTERSECTED.scaleUp.stop();
              this.INTERSECTED.scaleDown.start();
              delete this.INTERSECTED.scaleUp;
              delete this.INTERSECTED.scaleDown;
              this.tooltip.classList.remove('is-active');
              this.hover = false;
              this.container.style.cursor = 'default';
            }
          }

          this.INTERSECTED = object;
          if (
            this.INTERSECTED.type === 'Sprite' &&
            object.parent.name === this.selectedScene
          ) {
            this.INTERSECTED.scaleUp = this.scaleUpSprite(this.INTERSECTED);
            this.INTERSECTED.scaleDown = this.scaleDownSprite(this.INTERSECTED);
            this.INTERSECTED.scaleUp.start();
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
              this.tooltip.innerHTML = this.INTERSECTED.name;
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

  update = () => {
    this.control.update();
    this.render();
    TWEEN.update();
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  updateCameraPosition = ({ x, y, z }) => {
    this.camera.position.set(x, y, z);
  };

  setStartingScenePosition = ({ x, y, z }) => {
    this.updateCameraPosition({
      x: 0.00964106833161872,
      y: 6.123233995736772e-19,
      z: -0.002655146215382272
    });
    this.camera.lookAt(x, y, z);
  };

  getRenderer = () => this.renderer;

  getCamera = () => this.camera;

  getCameraPosition = () => this.camera.position;

  getScene = () => this.scene;

  getMatrix = () => {};

  setCurrentStyle = (currentStylle) => {
    this.currentStylle = currentStylle;
  };

  setCurrentFinish = (currentFinish) => {
    this.currentFinish = currentFinish;
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

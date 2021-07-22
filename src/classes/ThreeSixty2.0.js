import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
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
    this.currentStyle = 'default';
    this.currentFinish = 'default';
    this.selectedSceneLoadedImage = '';
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
    level,
    updateMenuCall,
    updateStyleCall,
    style,
    loaderCall
  }) => {
    this.container = container;
    this.loader = loader;
    this.createBlur();
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
    this.updateMenuCall = updateMenuCall;
    this.updateStyleCall = updateStyleCall;
    this.loaderCall = loaderCall;
    this.level = level;
    this.currentStyle = style;
    this.initializeManager();
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
        console.log('loaded');
        this.updateStyleCall(this.currentStyle);
      }
    };
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
  createBlur = () => {
    const el = document.querySelector('.three-sixty-blur');
    if (el) {
      el.classList.remove('none');
    } else {
      const blurContainer = document.createElement('div');
      blurContainer.classList.add('three-sixty-blur');
      this.container.appendChild(blurContainer);
    }
  };

  /* */
  onTransitionEnd = (event) => {
    event.target.remove();

    this.firstLoad = false;
    this.loaderContainer.classList.remove('white-background');
    this.loaderContainer.classList.remove('none');
    this.loaderCall(false);
    this.setCameraStartScenePosition(
      this.activeMesh.startScenePosition.x,
      this.activeMesh.startScenePosition.y,
      this.activeMesh.startScenePosition.z
    );
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
  updateFinishes = (finish) => {
    this.createBlur();
    this.finish = finish;
    this.updateSpheres();
  };

  /* */
  updateScenes = (scenes, selectedScene, selectedFinish, selectedStyle) => {
    this.createBlur();
    this.scenes = scenes;
    this.selectedScene = selectedScene;
    this.selectedFinish = selectedFinish;
    this.currentStyle = selectedStyle;
    this.updateSpheres();
  };

  /* */
  updateUse = (selectedScene, selectedFinish, selectedUse) => {
    this.use = selectedUse;
    this.selectedScene = selectedScene;
    this.selectedFinish = selectedFinish;

    const meshToUpdate = this.scene.children.find(
      (mesh) => mesh.name === this.selectedScene
    );

    this.updateMeshMaterial(meshToUpdate);
  };

  /* */
  clearCurrentMesh = () => {
    if (this.mesh !== null) {
      this.mesh.material.dispose();
      this.mesh.geometry.dispose();
      this.mesh.children = [];
      this.scene.remove(this.mesh);
      this.mesh = null;
    }
  };

  /* */
  initializeScene = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
  };

  /* */
  updateSpheres = () => {
    this.scene.children.map((mesh) => this.updateMeshMaterial(mesh));
  };

  /* */
  updateMeshMaterial = (mesh) => {
    const loader = new THREE.TextureLoader(this.manager);
    const sceneToUpdate = this.scenes.find((scene) => scene.key === mesh.name);
    const buildedScene = this.createSceneInfo(sceneToUpdate);
    if (buildedScene !== null) {
      loader.load(buildedScene.panorama.uri, (texture) => {
        const material = this.createMaterial(texture);
        mesh.material = material;
        mesh.use = buildedScene.panorama.use;
        material.needsUpdate = true;
        if (this.selectedScene === buildedScene.panorama.name) {
          this.selectedSceneLoadedImage = buildedScene.panorama.uri;
        }
      });
    }
  };

  /* */
  initializeSpheres = () => {
    this.scenes.map((scene) => this.createSphere(scene));
  };

  /* */
  createSphere = (scene) => this.createSceneMesh(scene);

  /* */
  createSceneInfo = (scene) => {
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
        finishToRequest,
        useToRequest,
        scene.key
      );
      return buildedScene;
    }
    return null;
  };

  /* */
  createSceneMesh = (scene) => {
    const buildedScene = this.createSceneInfo(scene);

    if (buildedScene !== null) {
      const geometry = new THREE.SphereGeometry(
        this.radius,
        this.widthSegments,
        this.heightSegments
      );
      geometry.scale(-1, 1, 1);

      const loader = new THREE.TextureLoader(this.manager);

      loader.load(buildedScene.panorama.uri, (texture) => {
        const mesh = this.updateMesh(scene, geometry, buildedScene, texture);

        if (this.selectedScene !== mesh.name) {
          mesh.visible = false;
        } else {
          this.activeMesh = mesh;
        }

        this.scene.add(mesh);
      });
    }
  };

  /* */
  updateMesh = (scene, geometry, buildedScene, texture) => {
    const material = this.createMaterial(texture);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = buildedScene.key;
    mesh.use = buildedScene.panorama.use;
    mesh.startScenePosition = buildedScene.startScenePosition;

    if (this.selectedScene !== mesh.name) {
      mesh.visible = false;
    } else {
      scene.hotspots.forEach((hotspot) => {
        this.createHotspot(hotspot, mesh, scene.hotspots);
      });
    }

    return mesh;
  };

  /* */
  createMaterial = (texture) =>
    new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });

  /* */
  addHotspots = (scene) => {
    const currentScene = this.scenes.find((item) => item.key === scene);
    currentScene.hotspots.forEach((hotspot) => {
      this.createHotspot(hotspot, this.activeMesh, currentScene.hotspots);
    });
  };

  /* */
  getActiveMesh = (key) =>
    this.scene.children.find((mesh) => mesh.name === key);

  /* */
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

  /* */
  getUse = (uses, use) => {
    const currentUse = uses.filter((item) =>
      item.key.toLowerCase() === use.toLowerCase() ? item : null
    );

    if (currentUse.length > 0) {
      return currentUse[0];
    }

    return null;
  };

  /* */
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

  /* */
  buildScene = (scene, hotspots = [], startScenePosition, finish, use, key) => {
    const { name, furniture, finishScenes } = scene;
    let current = null;
    if (finish !== undefined && use !== undefined) {
      if (
        finish.toLowerCase() === use.toLowerCase() &&
        finishScenes.length === 0
      ) {
        current = scene;
      } else {
        current = this.getSelectedFinish(finishScenes, finish);
      }
    } else if (use !== undefined) {
      current = scene;
    }

    const time = new Date().getTime();
    const uri = `${current.modes.day}?${time}`;
    const panorama = {};
    panorama.uri = uri;
    panorama.name = key;
    panorama.use = use;
    panorama.finish = current.key;
    return {
      name,
      key,
      panorama,
      hotspots,
      startScenePosition,
      furniture
    };
  };

  /* */
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

  /* */
  initializeRaycaster = () => {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(1, 1);
  };

  /* */
  addToScene = (objs) => {
    objs.forEach((obj) => {
      const mesh = obj;
      if (mesh !== null) {
        this.scene.add(mesh);
      }
    });
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
  initializeMobileControls = () => {
    this.control = new DeviceOrientationControls(
      this.camera,
      this.renderer.domElement
    );
    this.control.enabled = true;
  };

  /* */
  bindEventListeners = () => {
    this.container.addEventListener('pointerdown', this.onPointerStart);
    this.container.addEventListener('pointerup', this.onPointerEnd);
    this.container.addEventListener('mousemove', this.onPointerMove, {
      passive: true
    });
    this.container.addEventListener('touchstart', this.onPointerStart);
    this.container.addEventListener('touchend', this.onPointerEnd);
    this.container.addEventListener('touchcancel', this.onPointerEnd);
    document.addEventListener('keypress', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyUp);
  };

  /* */
  stopEasingAnimations = () => {
    this.easingAnimationDown.forEach((easingAnimationDown) =>
      easingAnimationDown.stop()
    );

    this.easingAnimationUp.forEach((easingAnimationUp) =>
      easingAnimationUp.stop()
    );
  };

  /* */
  startEasingAnimationUp = () => {
    this.easingAnimationDown.forEach((easingAnimationDown) =>
      easingAnimationDown.stop()
    );

    this.easingAnimationUp.forEach((easingAnimationUp) =>
      easingAnimationUp.start()
    );
  };

  /* */
  startEasingAnimationDown = () => {
    this.easingAnimationDown.forEach((easingAnimationDown) =>
      easingAnimationDown.start()
    );

    this.easingAnimationUp.forEach((easingAnimationUp) =>
      easingAnimationUp.stop()
    );
  };

  /* */
  stopHotstposAnimation = () => {
    this.easingAnimationUp.forEach((animation) => animation.stop());
    this.easingAnimationDown.forEach((animation) => animation.stop());
    this.easingAnimationUp = [];
    this.easingAnimationDown = [];
    TWEEN.removeAll();
    clearInterval(this.interval);
  };

  /* */
  animateHotspots = (hotspots) => {
    if (!this.container) {
      return;
    }
    this.stopHotstposAnimation();
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
    TWEEN.update();
  };

  /* */
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

  /* */
  createHotspot = ({ x, y, z, name, key, img, level, startSceneKey }, mesh) => {
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
    sprite.startScenePosition = mesh.startScenePosition;
    sprite.startSceneKey = startSceneKey || '';

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

  /* */
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

  /* */
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

  /* */
  handleKeyUp = () => {
    this.ctrl = false;
  };

  /* */
  onWindowResize = (width, height) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.width = width;
    this.height = height;
    this.renderer.setSize(this.width, this.height);
  };

  /* */
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
  onPointerEnd = () => {
    this.mouseDown = false;
    this.tooltip.classList.remove('is-active');
    this.handleSpriteClick();
  };

  /* */
  onPointerStart = (event) => {
    this.mouseDown = true;
    this.getMouse(event);
    this.updateMenuCall(false);
    // this.displayPosition();
  };

  /* */
  onPointerMove = (event) => {
    this.getMouse(event);

    if (this.loaded) {
      this.intersects();
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
        this.CLICKEDSPRITE.isHotspot &&
        this.CLICKEDSPRITE.parent.name === this.selectedScene
      ) {
        this.changeSphereScene(
          this.CLICKEDSPRITE.key,
          this.CLICKEDSPRITE.startScenePosition,
          this.CLICKEDSPRITE.startSceneKey
        );
        const use = this.getSceneUse(this.CLICKEDSPRITE.key);
        this.updateCallBack(
          this.CLICKEDSPRITE.key,
          this.CLICKEDSPRITE.level,
          use
        );
      }
    }
  };

  /* */
  changeSphereScene = (key, startScenePosition, startSceneKey) => {
    this.oldMesh = this.scene.children.find(
      (child) => child.name === this.selectedScene
    );
    if (this.oldMesh) {
      this.activeMesh = this.getActiveMesh(key);
      this.currentScaleDown = this.scaleDown(this.oldMesh, startSceneKey);
      this.currentScaleDown.start();
    }
  };

  /* */
  scaleDown = (mesh, startSceneKey) =>
    new TWEEN.Tween(mesh.scale)
      .to(
        {
          x: 0,
          y: 0,
          z: 0
        },
        500
      )
      .onStart(() => {
        const startScenePosition = this.getStartScenePosition(
          this.activeMesh.name,
          startSceneKey
        );

        this.setCameraStartScenePosition(
          startScenePosition.x,
          startScenePosition.y,
          startScenePosition.z
        );
      })
      .onUpdate((item) => {
        this.render();
        this.activeMesh.visible = true;
        this.oldMesh.material.opacity = item.x;
        this.oldMesh.material.transparent = true;
        this.removeMeshChildren(this.oldMesh);
      })
      .onComplete(() => {
        this.oldMesh.visible = false;
        this.oldMesh.material.transparent = false;
        this.oldMesh.scale.set(1, 1, 1);
        this.selectedScene = this.activeMesh.name;
        this.addHotspots(this.selectedScene);
        this.currentScaleDown.stop();
      });
  getStartScenePosition = (scene, key) => {
    const currentScene = this.scenes.find((item) => item.key === scene);
    const currentHotspot = currentScene.hotspots.find(
      (hotspot) => hotspot.key === key
    );
    if (currentHotspot) {
      return { x: currentHotspot.x, y: currentHotspot.y, z: currentHotspot.z };
    }

    return currentScene.startScenePosition;
  };

  setCameraStartScenePosition = (x, y, z) => {
    const camDistance = this.camera.position.length();
    const obj = new THREE.Vector3(x, y, z);
    this.camera.position
      .copy(obj)
      .normalize()
      .multiplyScalar(camDistance)
      .negate();
  };

  /* */
  scaleUp = (mesh) =>
    new TWEEN.Tween(mesh.scale)
      .to(
        {
          x: 8,
          y: 8,
          z: 8
        },
        5000
      )
      .onUpdate(() => {
        this.render();
      })
      .onComplete(() => {
        this.currentScaleUp.stop();
      });

  /* */
  removeMeshChildren = (mesh) => {
    mesh.children = [];
  };

  /* */
  toggleMeshChildren = (mesh, visble) =>
    mesh.children.forEach((item) => {
      item.visible = visble;
    });

  getVisbleMesh = () => this.scene.children.find((mesh) => mesh.visible);

  /* */
  displayPosition = () => {
    const visibleMesh = this.getVisbleMesh();
    if (visibleMesh) {
      const intersection = this.raycaster.intersectObject(visibleMesh);
      if (intersection.length > 0) {
        const { point } = intersection[0];
        console.log(point);
      }
    }
  };

  /* */
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

  /* */
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

  /* */
  showAnimation = (obj) =>
    new TWEEN.Tween(obj)
      .to({ opacity: 1 }, 500)
      .onStart(() => {})
      .easing(TWEEN.Easing.Quartic.Out);

  /* */
  hideAnimation = (obj) =>
    new TWEEN.Tween(obj)
      .to({ opacity: 0 }, 500)
      .easing(TWEEN.Easing.Quartic.Out);

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

  /* */
  update = () => {
    this.control.update();
    this.render();
    TWEEN.update();
  };

  /* */
  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  /* */
  updateCameraPosition = ({ x, y, z }) => {
    this.camera.position.set(x, y, z);
  };

  /* */
  getRenderer = () => this.renderer;

  /* */
  getCamera = () => this.camera;

  /* */
  getCameraPosition = () => this.camera.position;

  /* */
  getScene = () => this.scene;

  /* */
  getMatrix = () => {};

  /* */
  getSceneUse = (scene) => {
    const sphere = this.scene.children.find((mesh) => mesh.name === scene);
    return sphere.use;
  };

  /* */
  setCurrentStyle = (currentStylle) => {
    this.currentStyle = currentStylle;
  };

  /* */
  setCurrentFinish = (currentFinish) => {
    this.currentFinish = currentFinish;
  };

  /* */
  activateAutoRotate = (autoRotate) => {
    this.control.autoRotate = autoRotate;
  };

  /* */
  animate = () => {
    this.update();
    window.requestAnimationFrame(this.animate);
  };

  /* */
  dispose = () => {
    this.renderer.renderLists.dispose();
  };
}
export default ThreeSixtySphere;

import Data from '../../../assets/Data';
import PanoramaModel from '../models';
import PanoramaErrorModel from '../../../models/PanoramaErrorModel';
import THREESIXTY from '../../../classes/ThreeSixty';

export default class SessionEffect {
  static createPanorama(
    container,
    levels,
    level,
    defaultStyle,
    style,
    room,
    use,
    finish
  ) {
    const selectedLevel = SessionEffect.getLevel(levels, level);
    if (selectedLevel) {
      const styleToRequest = style === 'default' ? defaultStyle : style;
      const selectedStyle = SessionEffect.getStyle(
        selectedLevel.styles,
        styleToRequest
      );
      if (selectedStyle) {
        const roomToRequest =
          room === 'default' ? selectedLevel.defaultScene : room;
        const scene = SessionEffect.getScene(
          selectedStyle.scenes,
          roomToRequest
        );
        if (scene) {
          const useToRequest = SessionEffect.getRoomToRequest(
            use,
            scene.uses,
            scene.defaultUse
          );

          const selectedUse = SessionEffect.getUse(scene.uses, useToRequest);
          if (selectedUse) {
            const hotspots = SessionEffect.assignHotspotImage(scene.hotspots);
            const finishToRequest =
              finish === 'default' ? scene.defaultFinish : finish;

            const buildedScene = SessionEffect.buildScene(
              selectedUse,
              hotspots,
              scene.startScenePosition,
              finishToRequest
            );
            const model = new PanoramaModel({
              container,
              image: buildedScene.panorama.uri,
              width: window.innerWidth,
              height: window.innerHeight,
              radius: 100,
              widthSegments: 100,
              heightSegments: 100,
              hotspots,
              startScenePosition: scene.startScenePosition
            });

            return model;
          }
        }
      }
    }
    return new PanoramaErrorModel();
  }

  static getStyle(styles, style) {
    const selectedStyle = styles.filter((item) =>
      item.key.toLowerCase() === style.toLowerCase() ? item : null
    );

    if (selectedStyle.length > 0) {
      return selectedStyle[0];
    }

    return null;
  }

  static getLevel(levels, level) {
    const currentLevel = levels.filter((item) =>
      item.levelNumber === level ? item : null
    );
    if (currentLevel.length > 0) {
      return currentLevel[0];
    }

    return null;
  }

  static getScene(scenes, scene) {
    const currentScene = scenes.filter((item) => {
      const currentItemName = item.name || '';
      const currentItemKey = item.key || '';
      return currentItemName.toLowerCase().includes(scene.toLowerCase()) ||
        scene.toLowerCase().includes(currentItemName.toLowerCase()) ||
        currentItemKey.toLowerCase().includes(scene.toLowerCase()) ||
        scene.toLowerCase().includes(currentItemKey.toLowerCase())
        ? item
        : null;
    });

    if (currentScene.length > 0) {
      return currentScene[0];
    }

    return null;
  }

  static getUse(uses, use) {
    const currentUse = uses.filter((item) =>
      item.key.toLowerCase() === use.toLowerCase() ? item : null
    );

    if (currentUse.length > 0) {
      return currentUse[0];
    }

    return null;
  }

  static getRoomToRequest(roomUse, uses, defaultUse) {
    let room = null;
    if (roomUse !== '' && roomUse !== null && roomUse !== undefined) {
      room = roomUse;
    } else {
      room = defaultUse;
    }
    const exist = uses.find((use) => use.key === room);

    return exist ? room : defaultUse;
  }

  static assignHotspotImage(hotspots) {
    return hotspots.map((hotspot) => {
      const current = hotspot;
      if (typeof current.level === 'undefined') {
        current.img = Data.AvriaHotspotNew;
      } else {
        current.img = Data.AvriaHotspotStairs;
      }
      return current;
    });
  }

  static buildScene(scene, hotspots = [], startScenePosition, finish) {
    const { name, furniture, key, finishScenes } = scene;
    const time = new Date().getTime();
    const uri = `${scene.image}?${time}`;
    const panorama = {};
    panorama.uri = uri;
    panorama.name = key;
    panorama.finish = SessionEffect.getSelectedFinish(finishScenes, finish);
    return {
      name,
      key,
      panorama,
      hotspots,
      startScenePosition,
      furniture
    };
  }

  static getSelectedFinish(scenes, key) {
    if (key === 'default' || key === undefined || scenes.length === 0) {
      return 'default';
    }
    const scene = scenes.filter((item) =>
      item.key.toLowerCase() === key.toLowerCase() ? item : null
    );

    if (scene.length > 0) {
      return scene[0].key;
    }

    return 'default';
  }

  static createThreeSixty(threeSixtyPano, panoramaInfo, updateCall) {
    let threeSixty = null;
    if (threeSixtyPano !== null) {
      threeSixty = threeSixtyPano;
      threeSixty.sceneUpdate({
        image: panoramaInfo.image,
        hotspots: panoramaInfo.hotspots
      });
      threeSixty.updateCameraPosition({
        x: 0.00964106833161872,
        y: 6.123233995736772e-19,
        z: -0.002655146215382272
      });
      threeSixty.setStartingScenePosition(panoramaInfo.startScenePosition);
    } else {
      threeSixty = new THREESIXTY();
      const params = {
        ...panoramaInfo,
        loadingCallBack: () => {},
        updateCallBack: async (sceneName, level) => {
          updateCall(sceneName, level);
        }
      };
      threeSixty.init(params);
      console.log('starting', panoramaInfo.startScenePosition);
      threeSixty.updateCameraPosition({
        x: 0.00964106833161872,
        y: 6.123233995736772e-19,
        z: -0.002655146215382272
      });
      threeSixty.setStartingScenePosition(panoramaInfo.startScenePosition);
      threeSixty.animate();
      window.addEventListener(
        'resize',
        () => {
          threeSixty.onWindowResize(window.innerWidth, window.innerHeight);
        },
        false
      );
    }

    return threeSixty;
  }
}

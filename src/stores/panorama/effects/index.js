import PanoramaModel from '../models';
import PanoramaErrorModel from '../../../models/PanoramaErrorModel';
import THREESIXTY from '../../../classes/ThreeSixty';

export default class SessionEffect {
  /* */
  static createPanorama(
    container,
    levels,
    level,
    defaultStyle,
    style,
    room,
    use,
    finish,
    scenes,
    styles,
    language
  ) {
    const selectedLevel = levels[level];
    if (selectedLevel) {
      const styleToRequest = style === 'default' ? defaultStyle : style;
      const selectedStyle = SessionEffect.getStyle(styles, styleToRequest);

      if (selectedStyle) {
        const roomToRequest =
          room === 'default' ? selectedLevel.defaultScene : room;

        const model = new PanoramaModel({
          container,
          width: window.innerWidth,
          height: window.innerHeight,
          radius: 100,
          widthSegments: 100,
          heightSegments: 100,
          scenes,
          selectedScene: roomToRequest,
          use,
          finish,
          level,
          style: selectedStyle.key,
          language
        });

        return model;
      }
    }
    return new PanoramaErrorModel();
  }

  /* */
  static getStyle(styles, style) {
    const selectedStyle = styles.filter((item) =>
      item.key.toLowerCase() === style.toLowerCase() ? item : null
    );

    if (selectedStyle.length > 0) {
      return selectedStyle[0];
    }

    return null;
  }

  /* */
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

  /* */
  static createThreeSixty(
    threeSixtyPano,
    panoramaInfo,
    updateCall,
    updateMenuCall,
    updateStyleCall,
    loaderCall,
    changingFromFloorplanCall,
    showLoader
  ) {
    const threeSixty = new THREESIXTY();

    const params = {
      ...panoramaInfo,
      loadingCallBack: () => {},
      updateCallBack: async (sceneName, level, use) => {
        updateCall(sceneName, level, use);
      },
      updateMenuCall: async (expand) => {
        updateMenuCall(expand);
      },
      updateStyleCall: async (style) => {
        updateStyleCall(style);
      },
      loaderCall: async (loading) => {
        loaderCall(loading);
      },
      changingFromFloorplanCall: async () => {
        changingFromFloorplanCall();
      },
      showLoader
    };
    threeSixty.init(params);
    threeSixty.animate();
    window.addEventListener(
      'resize',
      () => {
        threeSixty.onWindowResize(window.innerWidth, window.innerHeight);
      },
      false
    );

    return threeSixty;
  }

  /* */
  static autoRotate(threeSixty, activate) {
    if (threeSixty) {
      threeSixty.activateAutoRotate(activate);
    }
  }
}

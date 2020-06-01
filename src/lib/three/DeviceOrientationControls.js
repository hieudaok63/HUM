/**
 * @author richt / http://richt.me
 * @author WestLangley / http://github.com/WestLangley
 *
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

import { Euler, MathUtils, Quaternion, Vector3, Math as Math$1 } from "three";

var DeviceOrientationControls = function (object, domElement) {
  var scope = this;

  var rotY = 0;
  var rotX = 0;
  var tempX = 0;
  var tempY = 0;

  this.object = object;
  this.object.rotation.reorder("YXZ");
  this.domElement = domElement !== undefined ? domElement : document;

  this.enabled = true;

  this.deviceOrientation = {};
  this.screenOrientation = 0;

  this.alpha = 0;
  this.alphaOffset = 0; // radians

  var onDeviceOrientationChangeEvent = function (event) {
    scope.deviceOrientation = event;
  };

  var onScreenOrientationChangeEvent = function () {
    scope.screenOrientation = window.orientation || 0;
  };

  var onTouchStartEvent = function (event) {
    event.preventDefault();
    event.stopPropagation();

    tempX = event.touches[0].pageX;
    tempY = event.touches[0].pageY;
  };

  var onTouchMoveEvent = function (event) {
    event.preventDefault();
    event.stopPropagation();

    rotY += Math$1.degToRad((event.touches[0].pageX - tempX) / 4);
    rotX += Math$1.degToRad((tempY - event.touches[0].pageY) / 4);

    scope.updateAlphaOffsetAngle(rotY);

    tempX = event.touches[0].pageX;
    tempY = event.touches[0].pageY;
  };

  // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

  var setObjectQuaternion = function (quaternion, alpha, beta, gamma, orient) {
    var zee = new Vector3(0, 0, 1);

    var euler = new Euler();

    var q0 = new Quaternion();

    var q1 = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 around the x-axis

    var vectorFingerY;
    var fingerQY = new Quaternion();
    var fingerQX = new Quaternion();

    if (scope.screenOrientation === 0) {
      vectorFingerY = new Vector3(1, 0, 0);
      fingerQY.setFromAxisAngle(vectorFingerY, -rotX);
    } else if (scope.screenOrientation === 180) {
      vectorFingerY = new Vector3(1, 0, 0);
      fingerQY.setFromAxisAngle(vectorFingerY, rotX);
    } else if (scope.screenOrientation === 90) {
      vectorFingerY = new Vector3(0, 1, 0);
      fingerQY.setFromAxisAngle(vectorFingerY, rotX);
    } else if (scope.screenOrientation === -90) {
      vectorFingerY = new Vector3(0, 1, 0);
      fingerQY.setFromAxisAngle(vectorFingerY, -rotX);
    }

    q1.multiply(fingerQY);
    q1.multiply(fingerQX);

    euler.set(beta, alpha, -gamma, "YXZ"); // 'ZXY' for the device, but 'YXZ' for us

    quaternion.setFromEuler(euler); // orient the device

    quaternion.multiply(q1); // camera looks out the back of the device, not the top

    quaternion.multiply(q0.setFromAxisAngle(zee, -orient)); // adjust for screen orientation
  };

  this.connect = function () {
    onScreenOrientationChangeEvent(); // run once on load

    // iOS 13+

    if (
      window.DeviceOrientationEvent !== undefined &&
      typeof window.DeviceOrientationEvent.requestPermission === "function"
    ) {
      window.DeviceOrientationEvent.requestPermission()
        .then(function (response) {
          if (response === "granted") {
            window.addEventListener(
              "orientationchange",
              onScreenOrientationChangeEvent,
              false
            );
            window.addEventListener(
              "deviceorientation",
              onDeviceOrientationChangeEvent,
              false
            );
          }
        })
        .catch(function (error) {
          console.error(
            "THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:",
            error
          );
        });
    } else {
      window.addEventListener(
        "orientationchange",
        onScreenOrientationChangeEvent,
        false
      );
      window.addEventListener(
        "deviceorientation",
        onDeviceOrientationChangeEvent,
        false
      );
    }

    window.addEventListener("deviceorientation", this.update.bind(this), {
      passive: true,
    });

    scope.domElement.addEventListener("touchstart", onTouchStartEvent, {
      passive: false,
    });
    scope.domElement.addEventListener("touchmove", onTouchMoveEvent, {
      passive: false,
    });

    scope.enabled = true;
  };

  this.disconnect = function () {
    window.removeEventListener(
      "orientationchange",
      onScreenOrientationChangeEvent,
      false
    );
    window.removeEventListener(
      "deviceorientation",
      onDeviceOrientationChangeEvent,
      false
    );

    scope.domElement.removeEventListener("touchstart", onTouchStartEvent, {
      passive: false,
    });
    scope.domElement.removeEventListener("touchmove", onTouchMoveEvent, {
      passive: false,
    });

    scope.enabled = false;
  };

  this.update = function () {
    if (scope.enabled === false) return;

    var device = scope.deviceOrientation;

    if (device) {
      var alpha = device.alpha
        ? MathUtils.degToRad(device.alpha) + scope.alphaOffset
        : 0; // Z

      var beta = device.beta ? MathUtils.degToRad(device.beta) : 0; // X'

      var gamma = device.gamma ? MathUtils.degToRad(device.gamma) : 0; // Y''

      var orient = scope.screenOrientation
        ? MathUtils.degToRad(scope.screenOrientation)
        : 0; // O

      setObjectQuaternion(scope.object.quaternion, alpha, beta, gamma, orient);
    }
  };

  this.updateAlphaOffsetAngle = function (angle) {
    this.alphaOffset = angle;
    this.update();
  };

  this.dispose = function () {
    scope.disconnect();
  };

  this.connect();
};

export { DeviceOrientationControls };

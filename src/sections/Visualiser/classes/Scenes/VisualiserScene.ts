import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

import { MouseMove } from 'utils/singletons/MouseMove';
import { UpdateInfo, RaymarchSettings } from 'utils/sharedTypes';

import { InteractiveScene } from './InteractiveScene';
import { Floor3D } from '../Components/Floor3D';
import { ScreenFrame3D } from '../Components/ScreenFrame3D';
import { ScreenComputed3D } from '../Components/ScreenComputed3D';
import { RaySphere3D } from '../Components/RaymarchedComponents/RaySphere3D';
import { RayLight3D } from '../Components/RaymarchedComponents/RayLight3D';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
  controls: OrbitControls;
}

export class VisualiserScene extends InteractiveScene {
  _controls: OrbitControls;
  _floor3D = new Floor3D();
  _screenFrame3D = new ScreenFrame3D();
  _screenComputed3D = new ScreenComputed3D();
  _raySphere3D1 = new RaySphere3D();
  _raySphere3D2 = new RaySphere3D();
  _rayLight = new RayLight3D();
  _raymarchSettings: RaymarchSettings = {
    ro: new THREE.Vector3(-8.0, 10, -8.0),
    lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
    lightPos: new THREE.Vector3(0.0, 12.0, -5.0),
    zoom: 3.0,
    sphere1: new THREE.Vector3(1.0, 1.4, 4.0),
    sphere2: new THREE.Vector3(-1.0, 1.0, 4.0),
  };

  constructor({ controls, camera, mouseMove }: Constructor) {
    super({ camera, mouseMove });

    this._controls = controls;

    this.add(this._floor3D);
    this.add(this._screenFrame3D);
    this.add(this._screenComputed3D);
    this.add(this._raySphere3D1);
    this.add(this._raySphere3D2);
    this.add(this._rayLight);

    this._rayLight.setElPosition(this._raymarchSettings.lightPos);
    this._raySphere3D1.setElPosition(this._raymarchSettings.sphere1);
    this._raySphere3D2.setElPosition(this._raymarchSettings.sphere2);

    this._screenComputed3D.setRaymarchSettingsRef(this._raymarchSettings);
    this._screenFrame3D.setRaymarchSettingsRef(this._raymarchSettings);

    setTimeout(() => {
      this._moveCamera();
    }, 50);
  }

  _moveCamera() {
    this._camera.position.set(
      this._raymarchSettings.ro.x,
      this._raymarchSettings.ro.y,
      -this._raymarchSettings.ro.z
    );

    this._camera.updateProjectionMatrix();

    this._controls.update();
  }

  animateIn() {
    console.log('animated in');
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    this._floor3D.update(updateInfo);
    this._screenFrame3D.update(updateInfo);
    this._screenComputed3D.update(updateInfo);
    this._raySphere3D1.update(updateInfo);
    this._raySphere3D2.update(updateInfo);
    this._rayLight.update(updateInfo);

    // this._raymarchSettings.sphere1.x = Math.sin(updateInfo.time * 0.003);
    // this._raymarchSettings.sphere1.z = Math.cos(updateInfo.time * 0.003);
    this._raySphere3D1.setElPosition(this._raymarchSettings.sphere1);

    // console.log('z', this._camera.position.z);
  }

  destroy() {
    this._floor3D.destroy();
    this.remove(this._floor3D);

    this._screenFrame3D.destroy();
    this.remove(this._screenFrame3D);

    this._screenComputed3D.destroy();
    this.remove(this._screenComputed3D);

    this._raySphere3D1.destroy();
    this.remove(this._raySphere3D1);

    this._raySphere3D2.destroy();
    this.remove(this._raySphere3D2);

    this._rayLight.destroy();
    this.remove(this._rayLight);
  }
}

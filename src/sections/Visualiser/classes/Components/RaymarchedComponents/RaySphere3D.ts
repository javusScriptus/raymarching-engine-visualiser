import * as THREE from 'three';

import { UpdateInfo } from 'utils/sharedTypes';

import { RayObject3D } from './RayObject3D';

export class RaySphere3D extends RayObject3D {
  _geometry: THREE.SphereBufferGeometry | null = null;
  _mesh: THREE.Mesh<THREE.SphereBufferGeometry, THREE.MeshStandardMaterial> | null = null;
  _material: THREE.MeshStandardMaterial | null = null;

  constructor() {
    super();
    this._drawSphere();
  }

  _drawSphere() {
    this._geometry = new THREE.SphereBufferGeometry(2, 32, 32);
    this._material = new THREE.MeshStandardMaterial({ color: '#ffffff' });
    this._mesh = new THREE.Mesh(this._geometry, this._material);
    this._mesh.position.y = 2;
    // this._mesh.position.x = 10;
    this._mesh.position.z = -6;
    this.add(this._mesh);
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
  }

  destroy() {
    super.destroy();
    this._material?.dispose();
    if (this._mesh) this.remove(this._mesh);
    this._geometry?.dispose();
  }
}

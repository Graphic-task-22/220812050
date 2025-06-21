// import * as THREE from 'three';

// const geometry = new THREE.PlaneGeometry(50, 50, 5, 5); // 设置分段

// const material = new THREE.MeshBasicMaterial({
//   color: new THREE.Color('orange'),
//   wireframe: true, // 显示网格线
// });

// const positions = geometry.attributes.position;
// for (let i = 0; i < positions.count; i++) {
//   let z = Math.random() * 20
//   positions.setZ(i, z);
// }

// const x = positions.getX(i);
// const y = positions.getY(i);
// let z = noise2D(x / 100, y / 100) * 50

// const mesh = new THREE.Mesh(geometry, material);
// // 绕 X 轴旋转 90 度，将 XY 平面转为 YZ 平面
// mesh.rotation.x = Math.PI / 2; 
// export default mesh;

import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
const noise2D = createNoise2D();

const geometry = new THREE.PlaneGeometry(300, 300, 70, 70);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color('blue'),
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(Math.PI / 2);

export default mesh;

export function updatePosition() {
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const z = noise2D(x / 150, y / 150) * 50;
    const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10;

    positions.setZ(i, z + sinNum);
  }
  positions.needsUpdate = true;
}
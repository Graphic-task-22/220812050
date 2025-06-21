import * as THREE from 'three';

const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-50, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(30, 40, 40),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60)
], true,'centripetal');

// const geometry = new THREE.TubeGeometry(path, 100, 5, 30);

// const material = new THREE.MeshBasicMaterial({
//     color: new THREE.Color('orange'),
//     side: THREE.DoubleSide
// });
//纹理贴图加载器TextureLoader
const Loader = new THREE.TextureLoader();
const texture = Loader.load('./src/assets/镭射.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = 20;
texture.colorSpace = THREE.SRGBColorSpace;
const geometry = new THREE.TubeGeometry(path, 100, 5, 30);

const material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: texture,
  aoMap: texture,
//   wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
export const tubePoints = path.getSpacedPoints(1000);

export default mesh;

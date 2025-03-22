import * as THREE from 'three';

var sphereGeometry = new THREE.SphereGeometry(30, 30, 30);


//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象
const texture = texLoader.load('./src/assets/earth.png');

var sphereMaterial = new THREE.MeshPhongMaterial({
  map:texture
});

var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.set(-50, 50, 50);
export default sphere; // Path: src/mesh/cube.js

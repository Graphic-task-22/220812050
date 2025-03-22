import * as THREE from "three";

const uvs = new Float32Array([
    0, 0, //图片左下角
    1, 0, //图片右下角
    1, 1, //图片右上角
    0, 1, //图片左上角
]);

const geometry = new THREE.PlaneGeometry(200,100,100,100);

//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象
const texture = texLoader.load('./src/assets/丁2.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping; // uv两个方向纹理重复数量

texture.repeat.set(5, 2); //注意选择合适的阵列数量

const material = new THREE.MeshLambertMaterial({
// 设置纹理贴图：Texture对象作为材质map属性的属性值
    map:texture,
    side:THREE.DoubleSide,
});

const plane = new THREE.Mesh(geometry,material);
plane.position.z = -70;

export default plane;
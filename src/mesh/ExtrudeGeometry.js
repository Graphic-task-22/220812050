import * as THREE from 'three';

const pointsArr = [
    new THREE.Vector2(100, 0),
    new THREE.Vector2(50, 20),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 50),
    new THREE.Vector2(50, 100)
];


//挖洞（圆形）
const path = new THREE.Shape();
path.arc( 30, 35, 10 );

const shape = new THREE.Shape(pointsArr);
shape.holes.push(path);

//拉伸
const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 10
});

const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('yellow'),
    // wireframe: true, // 显示网格线
    // side: THREE.DoubleSide, // 双面
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
import * as THREE from 'three';

const p1 = new THREE.Vector3(0, 0, 0); // 点1  
const p2 = new THREE.Vector3(0, 0, 100); // 点2
const p3 = new THREE.Vector3(0, 100, 0); // 点3
const p4 = new THREE.Vector3(0, 100, 100); // 点4

const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);

const geometry = new THREE.TubeGeometry(curve, 50, 20, 20);

const materail = new THREE.MeshLambertMaterial({
    color: new THREE.Color('red'),
    side: THREE.DoubleSide,
    wireframe: true
});

const tube = new THREE.Mesh(geometry, materail);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1,p2,p3,p4]);
const material2 = new THREE.PointsMaterial({
    color: new THREE.Color('blue'),
    size: 10
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
tube.add(points2, line2);

export default tube;
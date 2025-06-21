import * as THREE from 'three';

const geometry = new THREE.SphereGeometry(10,10,10);

const pointsMaterial = new THREE.PointsMaterial({
    color:0xffffff,
    size:1
})

const points = new THREE.Points(geometry,pointsMaterial);

export default points;
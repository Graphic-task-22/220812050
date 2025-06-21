import * as THREE from 'three';

const x = 30, y = 30;

const heartShape = new THREE.Shape();

// 绘制心形曲线（三次贝塞尔曲线）
heartShape.moveTo( x + 5, y + 5);
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

//挖洞（圆形）
const path = new THREE.Shape();
path.arc( 30, 35, 2, 0, Math.PI * 2, true );

heartShape.holes.push(path);

const geometry = new THREE.ShapeGeometry( heartShape );
// const geometry = new THREE.ExtrudeGeometry(heartShape, {
//     depth: 10
// });



// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const mesh = new THREE.Mesh( geometry, material ) ;


// 绘制多边形(点矩阵)
// const pointsArr = [
//     new THREE.Vector2(100, 0),
//     new THREE.Vector2(50, 20),
//     new THREE.Vector2(0, 0),
//     new THREE.Vector2(0, 50),
//     new THREE.Vector2(50, 100)
// ];

// const shape = new THREE.Shape(pointsArr);
// const geometry = new THREE.ShapeGeometry(shape);

const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('yellow'),
    // wireframe: true, // 显示网格线
    side: THREE.DoubleSide, // 双面
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
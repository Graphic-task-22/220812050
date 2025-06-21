import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import sphere from './mesh/sphere';
import sprite from './sprite/sprite';
import mesh from './mesh/Llama'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


let renderer, camera, scene; // 全局变量 场景、相机、渲染器
// let sphere; // 将sphere改为全局变量以便在动画中访问

function init() {
  scene = new THREE.Scene();
  scene.add(sphere); //地球模型
  scene.add(sprite);

  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  
  

  //点光源：两个参数分别表示光源颜色和光照强度
// 参数1：0xffffff是纯白光,表示光源颜色
// 参数2：1.0,表示光照强度，可以根据需要调整
const pointLight = new THREE.PointLight(0xffffff, 1.0);

pointLight.intensity = 2.0;//光照强度
pointLight.decay = 0.0;//设置光源不随距离衰减

//点光源位置
pointLight.position.set(200, 100, 100);
scene.add(pointLight); //点光源添加到场景中

  // Create a camera
  // fov?: number, aspect?: number, near?: number, far?: number
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(110, 200, 100);
  // 设置相机看向的位置
  camera.lookAt(0, 0, 0);
  // Create a renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  // Add the canvas element created by the renderer to document body
  // domElement(canvas)
  document.body.appendChild(renderer.domElement);
}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  if (!renderer) return;
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  //没有动画的时候需要重新render
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
};

function initHelper(params) {
  // 辅助坐标轴
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  }); //监听鼠标、键盘事件

  // 添加一个辅助网格地面 网格地面辅助观察GridHelper
  const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
  // scene.add(gridHelper);
}

function initGUI() {
  const gui = new GUI();
  const settings = {
    rotationSpeed: 0.01, // 旋转速度控制
    autoRotate: true,   // 自动旋转开关
    resetRotation() {
      sphere.rotation.set(0, 0, 0);
    }
  };

  gui.add(settings, 'rotationSpeed', 0, 0.1).name('旋转速度');
  gui.add(settings, 'autoRotate').name('自动旋转');
  gui.add(settings, 'resetRotation').name('重置旋转');

  return settings;
}

function animate() {
  requestAnimationFrame(animate);

  const settings = initGUI.settings || (initGUI.settings = initGUI());
  
  if (settings.autoRotate) {
    sphere.rotation.y += settings.rotationSpeed;
  }

  renderer.render(scene, camera);
}

function initStats(params) {
  const stats = new Stats();
  //stats.domElement:web页面上输出计算结果,一个div元素，
  document.body.appendChild(stats.domElement);
  // 渲染函数
  function render() {
    //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
    stats.update();
    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  }
  render();
}


init();
initHelper();
initStats();
animate();

import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// 创建BoxGeometry（立方体）对象
const geometry = new THREE.BoxGeometry(50, 50, 50);

// 给一个材质，让它有颜色
const material = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  transparent:true,
  opacity: 0.5,

});

// Mesh（网格）。 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
const cube = new THREE.Mesh(geometry, material);

//点光源：两个参数分别表示光源颜色和光照强度
// 参数1：0xffffff是纯白光,表示光源颜色
// 参数2：1.0,表示光照强度，可以根据需要调整
const pointLight = new THREE.PointLight(0xffffff, 1.0);

pointLight.intensity = 1.0;//光照强度
pointLight.decay = 0.0;//设置光源不随距离衰减

 // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  //scene.add(ambientLight);

  
const gui = new GUI();
// 改变对象的属性
const obj = {
  x: 30
}

gui.add(obj, 'x', 0, 100)

gui.add(ambientLight, 'intensity', 0.1, 2).name('环境光强度').step(0.1).onChange((value) => {
  console.log(value);
});

gui.addColor(cube.material, 'color').name('颜色')

// 下拉菜单、单选框
gui.add(cube.position, 'x', [0, 1, 2, 4,8]);
gui.add(cube.position, 'x', {
  min: -10,
  max: 10,
});
// 布尔值设置单选框
gui.add(material, 'transparent').name('是否透明');

// 分组、嵌套
gui.addFolder()

// 执行方法
const settings = {
  clear() {
      gui.children[1].reset(); // 重置
   },
   setDefault() {

   }
};
gui.add(settings, 'clear');
gui.add(settings, 'setDefault'); // 重置到默认值

// 关闭打开菜单
gui.close()
gui.open()

export default cube;

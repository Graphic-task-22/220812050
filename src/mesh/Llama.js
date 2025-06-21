import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const mesh = new THREE.Group();

loader.load(
  './src/gltf/Llama.gltf',
  function (gltf) {
    mesh.add(gltf.scene); 
    console.log('gltf',gltf);
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    function animate(params) {
      mixer.update(0.01);
      requestAnimationFrame(animate);
    }
    animate();
  },
  function (xhr) {
    console.log('xhr',xhr)
    console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
  },
  function (error) {
    console.error('An error happened', error);
  }

)

export default mesh;
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// 创建柱状图场景
function createBarChart() {
    const chart = new THREE.Group();
    
    // 加载字体
    const loader = new FontLoader();
    let font; // 存储加载的字体
    
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', 
        (loadedFont) => {
            font = loadedFont;
            createBars(); // 字体加载完成后创建柱状图
        }
    );
    
    function createBars() {
        // 柱状图数据
        const data = [
            { value: 5, color: new THREE.Color(0x00ff00) },  // 绿色
            { value: 8, color: new THREE.Color(0xffff00) },  // 黄色
            { value: 3, color: new THREE.Color(0xff0000) },  // 红色
            { value: 6, color: new THREE.Color(0x0000ff) },  // 蓝色
            { value: 9, color: new THREE.Color(0xff00ff) }    // 紫色
        ];
    
        // 创建渐变材质函数
        function createGradientMaterial(color, height) {
            return new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.3,
                metalness: 0.1,
                // gradientMap: new THREE.TextureLoader().load('./src/assets/gradient.png'),
                // gradientScale: height / 10
            });
        }
    
        // 创建柱体
        data.forEach((item, index) => {
            const width = 1.5;
            const depth = 1.5;
            const height = item.value;
            
            // 柱体几何
            const geometry = new THREE.BoxGeometry(width, height, depth);
            
            // 创建渐变材质
            const material = createGradientMaterial(item.color, height);
            
            // 创建柱体
            const bar = new THREE.Mesh(geometry, material);
            bar.position.set(
                index * (width + 1) - (data.length * (width + 1)) / 2 + width / 2,
                height / 2,
                0
            );
            
            // 添加文字标签
            const textGeometry = new TextGeometry(item.value.toString(), {
                font: font,
                size: 0.5,
                height: 0.1
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(bar.position.x, height + 0.5, 0);
            chart.add(textMesh);
            
            chart.add(bar);
        });
    
        // 添加平面
        const planeGeometry = new THREE.PlaneGeometry(20, 10);
        const planeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x333333,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.1;
        chart.add(plane);
    
        return chart;
    }

    return chart;
}

export default createBarChart();
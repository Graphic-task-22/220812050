import * as THREE from 'three';

// 创建房子mesh
function createHouse() {
    const house = new THREE.Group();
    
    // 1. 创建墙壁
    const wallGeometry = new THREE.BoxGeometry(10, 6, 10);
    const wallMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf0e4d0,
        roughness: 0.8
    });
    const walls = new THREE.Mesh(wallGeometry, wallMaterial);
    walls.position.y = 3; // 墙壁高度的一半
    house.add(walls);

    // 2. 创建屋顶
    const roofGeometry = new THREE.ConeGeometry(7, 5, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8b4513,
        roughness: 0.6
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 6 + 2.5; // 墙壁高度 + 屋顶高度的一半
    roof.rotation.y = Math.PI / 4; // 旋转45度使屋顶有棱角
    house.add(roof);

    // 3. 创建门
    const doorGeometry = new THREE.BoxGeometry(2, 3, 0.2);
    const doorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x654321,
        roughness: 0.4
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1.5, 5); // 放在前墙中间
    house.add(door);

    // 4. 创建窗户
    const windowGeometry = new THREE.BoxGeometry(2, 2, 0.1);
    const windowMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x87ceeb,
        transparent: true,
        opacity: 0.7
    });
    
    // 左侧窗户
    const windowLeft = new THREE.Mesh(windowGeometry, windowMaterial);
    windowLeft.position.set(-3, 3, 5);
    house.add(windowLeft);
    
    // 右侧窗户
    const windowRight = new THREE.Mesh(windowGeometry, windowMaterial);
    windowRight.position.set(3, 3, 5);
    house.add(windowRight);

    return house;
}

// 导出房子mesh
const houseMesh = createHouse();
export default houseMesh;
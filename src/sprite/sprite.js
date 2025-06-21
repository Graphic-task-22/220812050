import * as THREE from 'three';

// 加载雪花纹理
const texture = new THREE.TextureLoader().load("./src/assets/snowflake1.png");
const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const group = new THREE.Group();

// 雪花数据结构
const snowflakes = [];

for (let i = 0; i < 16000; i++) {
    const sprite = new THREE.Sprite(spriteMaterial);
    group.add(sprite);
    
    // 随机大小 (0.2 - 1.5)
    const size = 0.2 + Math.random() * 1.3;
    sprite.scale.set(size, size, size);
    
    // 初始位置
    const x = 1000 * (Math.random() - 0.5);
    const y = 600 * Math.random();
    const z = 1000 * (Math.random() - 0.5);
    sprite.position.set(x, y, z);
    
    // 存储雪花属性
    snowflakes.push({
        sprite,
        speed: 0.5 + Math.random(), // 下落速度
        rotationSpeed: (Math.random() - 0.5) * 0.02, // 旋转速度
        sway: Math.random() * 0.1, // 左右摇摆幅度
        swaySpeed: Math.random() * 0.01 // 摇摆速度
    });
}

let time = 0;
function loop() {
    time += 0.01;
    
    snowflakes.forEach(flake => {
        const { sprite } = flake;
        
        // 下落
        sprite.position.y -= flake.speed;
        
        // 左右摇摆
        sprite.position.x += Math.sin(time * flake.swaySpeed) * flake.sway;
        
        // 旋转 (修改这里)
        sprite.rotation.z += flake.rotationSpeed;
        
        // 重置位置
        if (sprite.position.y < 0) {
            sprite.position.y = 600;
            sprite.position.x = 1000 * (Math.random() - 0.5);
            sprite.position.z = 1000 * (Math.random() - 0.5);
        }
    });
    
    requestAnimationFrame(loop);
}
loop();

export default group;
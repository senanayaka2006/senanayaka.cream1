// Three.js Background Animation (Elegant Premium Skincare Vibe)

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#ffffff', 0.001); // Soft fade

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true, // Transparent background
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xD4AF37, 2, 100); // Gold light
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100); // White light
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // OBJECTS (Soft glowing floating spheres -> like cream drops)
    const drops = [];
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // Premium soft physical material
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.9, // glass-like look
        ior: 1.5,
        thickness: 0.5,
    });

    const dropCount = 40; // Number of floating objects

    for (let i = 0; i < dropCount; i++) {
        const mesh = new THREE.Mesh(geometry, material);

        // Random position
        mesh.position.x = (Math.random() - 0.5) * 40;
        mesh.position.y = (Math.random() - 0.5) * 40;
        mesh.position.z = (Math.random() - 0.5) * 20 - 10;

        // Random scale (different sizes of drops)
        const scale = Math.random() * 1.5 + 0.5;
        mesh.scale.set(scale, scale, scale);

        // Custom animation data
        mesh.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            ),
            rotationSpeed: new THREE.Vector3(
                Math.random() * 0.01,
                Math.random() * 0.01,
                Math.random() * 0.01
            )
        };

        drops.push(mesh);
        scene.add(mesh);
    }

    // MOUSE INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.0005;
        mouseY = (event.clientY - windowHalfY) * 0.0005;
    });

    // RESIZE EVENT
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Parallax camera movement based on mouse
        targetX = mouseX * 2;
        targetY = mouseY * 2;

        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        // Move drops softly
        drops.forEach((drop, i) => {
            // Float movement
            drop.position.add(drop.userData.velocity);

            // Rotation
            drop.rotation.x += drop.userData.rotationSpeed.x;
            drop.rotation.y += drop.userData.rotationSpeed.y;

            // Add a soft sine wave bounce pattern
            drop.position.y += Math.sin(elapsedTime * 0.5 + i) * 0.01;

            // Simple boundary reflection to keep them in view
            if (drop.position.x > 20 || drop.position.x < -20) drop.userData.velocity.x *= -1;
            if (drop.position.y > 20 || drop.position.y < -20) drop.userData.velocity.y *= -1;
            if (drop.position.z > 5 || drop.position.z < -30) drop.userData.velocity.z *= -1;
        });

        renderer.render(scene, camera);
    }

    animate();
});

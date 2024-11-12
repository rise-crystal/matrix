const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create an icosahedron geometry
const radius = 1; // Radius of the icosahedron
const geometry = new THREE.IcosahedronGeometry(radius);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const icosahedron = new THREE.Mesh(geometry, material);
scene.add(icosahedron);

// Set camera position
camera.position.z = 5;

// Raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const targetScale = new THREE.Vector3(1, 1, 1); // Before hover, tetap 1,1,1
const normalScale = new THREE.Vector3(1, 1, 1); // Normal scale

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Check for hover
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([icosahedron]);

    // Determine target scale based on hover state
    if (intersects.length > 0) {
        targetScale.set(1.5, 1.5, 1.5); // Lebih besar lagi saat hover
    } else {
        targetScale.set(1, 1, 1);
    }

    // Smoothly interpolate the scale with a more gradual transition
    const scaleSpeed = 0.03; // Adjust this value for smoother effect
    icosahedron.scale.lerpVectors(icosahedron.scale, targetScale, scaleSpeed); // Smooth transition to target scale

    // Rotate the icosahedron
    icosahedron.rotation.x += 0.01;
    icosahedron.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// Handle mouse move
window.addEventListener('mousemove', (event) => {
    // Normalize mouse coordinates to [-1, 1]
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});



        // MATRIX effect in canvas3D
        const canvas3D = document.getElementById('canvas3D');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas3D, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const radius = 1;
        const geometry = new THREE.IcosahedronGeometry(radius);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const icosahedron = new THREE.Mesh(geometry, material);
        scene.add(icosahedron);

        camera.position.z = 5;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const targetScale = new THREE.Vector3(1.5, 1.5, 1.5);
        const normalScale = new THREE.Vector3(1, 1, 1);

        function animate() {
            requestAnimationFrame(animate);

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects([icosahedron]);

            if (intersects.length > 0) {
                icosahedron.scale.lerpVectors(icosahedron.scale, targetScale, 0.1);
            } else {
                icosahedron.scale.lerpVectors(icosahedron.scale, normalScale, 0.1);
            }

            icosahedron.rotation.x += 0.01;
            icosahedron.rotation.y += 0.01;

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
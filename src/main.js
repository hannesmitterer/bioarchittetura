// Interactive navigation for mobile
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
navToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// Sample gallery images (replace with CMS fetch if needed)
const images = [
  "assets/images/33n001.jpg",
  "assets/images/33n002.jpg",
  "assets/images/33n003.jpg",
  "assets/images/33n004.jpg",
  "assets/images/33n005.jpg"
];
const gallery = document.getElementById('gallery');
gallery.innerHTML = images.map(src =>
  `<img src="${src}" alt="Gallery image" class="gallery-img">`
).join('');

// Modal for gallery images
gallery.addEventListener('click', e => {
  if (e.target.classList.contains('gallery-img')) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.85)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 9999;
    modal.innerHTML = `<img src="${e.target.src}" alt="${e.target.alt}" style="max-width:90vw;max-height:80vh;border-radius:14px;box-shadow:0 2px 32px #222;"><span style="position:absolute;top:20px;right:32px;font-size:2.2em;color:#fff;cursor:pointer;">&times;</span>`;
    document.body.appendChild(modal);
    modal.querySelector('span').onclick = () => document.body.removeChild(modal);
    modal.onclick = event => { if (event.target === modal) document.body.removeChild(modal); };
  }
});

// Optimized Three.js 3D graphics
function init3DScene() {
  const container = document.getElementById('threejs-container');
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  renderer.setClearColor(0x1a237e, 1); // brand blue
  container.appendChild(renderer.domElement);

  // Example: animated torus knot
  const geometry = new THREE.TorusKnotGeometry(0.7, 0.23, 120, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0x00bcd4, metalness: 0.6, roughness: 0.3 });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.72);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set(2, 2, 4);
  scene.add(directionalLight);

  camera.position.z = 2.5;
  function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.012;
    torusKnot.rotation.y += 0.017;
    renderer.render(scene, camera);
  }
  animate();
}
init3DScene();

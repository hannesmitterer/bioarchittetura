// Responsive navigation for mobile
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
navToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// Gallery images with fallback, title, description
const images = [
  {
    src: "assets/images/33n001.jpg",
    fallback: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    title: "Casa Passiva",
    description: "Progetto di casa a basso consumo energetico e massimo comfort."
  },
  {
    src: "assets/images/33n002.jpg",
    fallback: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Materiali Naturali",
    description: "Approfondimento sui materiali sostenibili e riciclabili."
  },
  {
    src: "assets/images/33n003.jpg",
    fallback: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=400&q=80",
    title: "Workshop Fondazione di Bioarchitettura",
    description: "Formazione sulle tecniche di costruzione ecocompatibili."
  },
  {
    src: "assets/images/33n004.jpg",
    fallback: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80",
    title: "Verde Urbano",
    description: "Soluzioni innovative per spazi pubblici naturali."
  },
  {
    src: "assets/images/33n005.jpg",
    fallback: "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?auto=format&fit=crop&w=400&q=80",
    title: "Casa in Paglia",
    description: "Edilizia sostenibile con materiali a basso impatto."
  }
];

// Gallery rendering with fallback
const gallery = document.getElementById('gallery');
Promise.all(
  images.map(img =>
    fetch(img.src, {method: "HEAD"})
      .then(response => response.ok ? img.src : img.fallback)
      .catch(() => img.fallback)
  )
).then(srcs => {
  gallery.innerHTML = images.map((img, i) =>
    `<figure class="gallery-item">
      <img src="${srcs[i]}" alt="${img.title}" class="gallery-img" loading="lazy">
      <figcaption>
        <strong>${img.title}</strong><br>
        <span>${img.description}</span>
      </figcaption>
    </figure>`
  ).join('');
});

// Modal for gallery images
gallery.addEventListener('click', e => {
  const img = e.target.closest('.gallery-img');
  if (img) {
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
    modal.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="max-width:90vw;max-height:80vh;border-radius:14px;box-shadow:0 2px 32px #222;"><span style="position:absolute;top:20px;right:32px;font-size:2.2em;color:#fff;cursor:pointer;">&times;</span>`;
    document.body.appendChild(modal);
    modal.querySelector('span').onclick = () => document.body.removeChild(modal);
    modal.onclick = event => { if (event.target === modal) document.body.removeChild(modal); };
  }
});

// Advanced 3D architectural scene
function init3DScene() {
  const container = document.getElementById('threejs-container');
  if (!container) return;
  const width = container.offsetWidth || 400;
  const height = container.offsetHeight || 340;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeaf6fb);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(5, 3.7, 9);

  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const dirLight = new THREE.DirectionalLight(0xf5f5dc, 0.9);
  dirLight.position.set(6, 8, 7);
  scene.add(dirLight);

  // Ground
  const groundGeo = new THREE.CircleGeometry(7, 32);
  const groundMat = new THREE.MeshStandardMaterial({color: 0xc8e6c9});
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -1.1;
  scene.add(ground);

  // House base
  const baseGeo = new THREE.BoxGeometry(3, 1.7, 2.2);
  const baseMat = new THREE.MeshStandardMaterial({color: 0xffffff});
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0;
  scene.add(base);

  // Roof
  const roofGeo = new THREE.ConeGeometry(2.3, 1.1, 4);
  const roofMat = new THREE.MeshStandardMaterial({color: 0x009688});
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = 1.45;
  roof.rotation.y = Math.PI/4;
  scene.add(roof);

  // Door
  const doorGeo = new THREE.BoxGeometry(0.4, 0.7, 0.09);
  const doorMat = new THREE.MeshStandardMaterial({color: 0x795548});
  const door = new THREE.Mesh(doorGeo, doorMat);
  door.position.set(0, -0.55, 1.13);
  scene.add(door);

  // Windows
  const windowGeo = new THREE.BoxGeometry(0.45, 0.45, 0.07);
  const windowMat = new THREE.MeshStandardMaterial({color: 0x90caf9});
  const window1 = new THREE.Mesh(windowGeo, windowMat);
  window1.position.set(-0.7, 0.1, 1.13);
  scene.add(window1);
  const window2 = window1.clone();
  window2.position.set(0.7, 0.1, 1.13);
  scene.add(window2);

  // Trees (left/right)
  for(let i=0;i<2;i++){ 
    const trunkGeo = new THREE.CylinderGeometry(0.09,0.12,0.62,8);
    const trunkMat = new THREE.MeshStandardMaterial({color:0x8d6e63});
    const trunk = new THREE.Mesh(trunkGeo,trunkMat);
    trunk.position.set(-2.7+i*5.4,-0.7,0.8);
    scene.add(trunk);

    const crownGeo = new THREE.SphereGeometry(0.37,16,16);
    const crownMat = new THREE.MeshStandardMaterial({color:0x388e3c});
    const crown = new THREE.Mesh(crownGeo,crownMat);
    crown.position.set(-2.7+i*5.4,0.0,0.8);
    scene.add(crown);
  }

  // Sun
  const sunGeo = new THREE.SphereGeometry(0.35,24,24);
  const sunMat = new THREE.MeshBasicMaterial({color: 0xffeb3b});
  const sun = new THREE.Mesh(sunGeo, sunMat);
  sun.position.set(3, 3.7, -4);
  scene.add(sun);

  // Animate: roof rotates, sun moves, trees sway
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    roof.rotation.y += 0.005;
    t += 0.008;
    sun.position.y = 3.7 + Math.sin(t)*0.18;
    scene.children.forEach(obj => {
      if (obj.geometry && obj.geometry.type === "SphereGeometry" && obj !== sun) {
        obj.position.x += Math.sin(t*2 + obj.position.x)/280;
      }
    });
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
init3DScene();// Modal for gallery images
gallery.addEventListener('click', e => {
  const img = e.target.closest('.gallery-img');
  if (img) {
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
    modal.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="max-width:90vw;max-height:80vh;border-radius:14px;box-shadow:0 2px 32px #222;"><span style="position:absolute;top:20px;right:32px;font-size:2.2em;color:#fff;cursor:pointer;">&times;</span>`;
    document.body.appendChild(modal);
    modal.querySelector('span').onclick = () => document.body.removeChild(modal);
    modal.onclick = event => { if (event.target === modal) document.body.removeChild(modal); };
  }
});

// Advanced 3D architectural scene
function init3DScene() {
  const container = document.getElementById('threejs-container');
  if (!container) return;
  const width = container.offsetWidth || 400;
  const height = container.offsetHeight || 340;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeaf6fb);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(5, 3.7, 9);

  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const dirLight = new THREE.DirectionalLight(0xf5f5dc, 0.9);
  dirLight.position.set(6, 8, 7);
  scene.add(dirLight);

  // Ground
  const groundGeo = new THREE.CircleGeometry(7, 32);
  const groundMat = new THREE.MeshStandardMaterial({color: 0xc8e6c9});
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -1.1;
  scene.add(ground);

  // House base
  const baseGeo = new THREE.BoxGeometry(3, 1.7, 2.2);
  const baseMat = new THREE.MeshStandardMaterial({color: 0xffffff});
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0;
  scene.add(base);

  // Roof
  const roofGeo = new THREE.ConeGeometry(2.3, 1.1, 4);
  const roofMat = new THREE.MeshStandardMaterial({color: 0x009688});
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = 1.45;
  roof.rotation.y = Math.PI/4;
  scene.add(roof);

  // Door
  const doorGeo = new THREE.BoxGeometry(0.4, 0.7, 0.09);
  const doorMat = new THREE.MeshStandardMaterial({color: 0x795548});
  const door = new THREE.Mesh(doorGeo, doorMat);
  door.position.set(0, -0.55, 1.13);
  scene.add(door);

  // Windows
  const windowGeo = new THREE.BoxGeometry(0.45, 0.45, 0.07);
  const windowMat = new THREE.MeshStandardMaterial({color: 0x90caf9});
  const window1 = new THREE.Mesh(windowGeo, windowMat);
  window1.position.set(-0.7, 0.1, 1.13);
  scene.add(window1);
  const window2 = window1.clone();
  window2.position.set(0.7, 0.1, 1.13);
  scene.add(window2);

  // Trees (left/right)
  for(let i=0;i<2;i++){ 
    const trunkGeo = new THREE.CylinderGeometry(0.09,0.12,0.62,8);
    const trunkMat = new THREE.MeshStandardMaterial({color:0x8d6e63});
    const trunk = new THREE.Mesh(trunkGeo,trunkMat);
    trunk.position.set(-2.7+i*5.4,-0.7,0.8);
    scene.add(trunk);

    const crownGeo = new THREE.SphereGeometry(0.37,16,16);
    const crownMat = new THREE.MeshStandardMaterial({color:0x388e3c});
    const crown = new THREE.Mesh(crownGeo,crownMat);
    crown.position.set(-2.7+i*5.4,0.0,0.8);
    scene.add(crown);
  }

  // Sun
  const sunGeo = new THREE.SphereGeometry(0.35,24,24);
  const sunMat = new THREE.MeshBasicMaterial({color: 0xffeb3b});
  const sun = new THREE.Mesh(sunGeo, sunMat);
  sun.position.set(3, 3.7, -4);
  scene.add(sun);

  // Animate: roof rotates, sun moves, trees sway
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    roof.rotation.y += 0.005;
    t += 0.008;
    sun.position.y = 3.7 + Math.sin(t)*0.18;
    scene.children.forEach(obj => {
      if (obj.geometry && obj.geometry.type === "SphereGeometry" && obj !== sun) {
        obj.position.x += Math.sin(t*2 + obj.position.x)/280;
      }
    });
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
init3DScene();

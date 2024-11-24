import * as THREE from './libs/three.module.js';
import { FontLoader } from './libs/FontLoader.js';
// Vytvoření scény
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1c0f2e); // Dark purple background

// Kamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Terminálový rám
const frameGeometry = new THREE.BoxGeometry(4, 3, 0.2);
const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
const frame = new THREE.Mesh(frameGeometry, frameMaterial);
scene.add(frame);

// Obrazovka
const screenGeometry = new THREE.PlaneGeometry(3.8, 2.8);
const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const screen = new THREE.Mesh(screenGeometry, screenMaterial);
screen.position.z = 0.11; // Slightly above the frame
scene.add(screen);

// Text na obrazovce
const loader = new FontLoader(); // Opravený loader
loader.load(
  'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', // Cesta k fontu
  function (font) {
    const textGeometry = new THREE.TextGeometry('Tor@terminal:~$', {
      font: font,
      size: 0.5,      // Velikost textu
      height: 0.05,   // Hloubka textu
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Neon green
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-1.8, 0, 0.2); // Umístění textu
    scene.add(textMesh);
  },
  undefined,
  function (error) {
    console.error('Chyba při načítání fontu:', error);
  }
);

// Světlo
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Animace
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Responsivní okno
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

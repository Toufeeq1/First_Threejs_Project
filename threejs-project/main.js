// Import necessary modules and libraries
import * as THREE from "three"; // Import the THREE library
import "./style.css"; // Import the CSS file
import gsap from "gsap"; // Import the GSAP library for animations
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // Import OrbitControls for camera control

// Scene setup
const scene = new THREE.Scene(); // Create a new Three.js scene

// Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64); // Define sphere geometry
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83", // Set sphere color
  roughness: 0.4, // Set material roughness
});
const mesh = new THREE.Mesh(geometry, material); // Create a mesh with the defined geometry and material
scene.add(mesh); // Add the mesh to the scene

// Sizes configuration
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Light setup
const light = new THREE.PointLight(0xffffff, 200, 100); // Create a point light
light.position.set(0, 10, 10); // Set light position
scene.add(light); // Add light to the scene

// Camera setup
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
); // Create a perspective camera
camera.position.z = 20; // Set camera position
scene.add(camera); // Add camera to the scene

// Renderer setup
const canvas = document.querySelector(".webgl"); // Select the canvas element
const renderer = new THREE.WebGLRenderer({ canvas }); // Create a WebGL renderer
renderer.setSize(sizes.width, sizes.height); // Set renderer size
renderer.setPixelRatio(2); // Set renderer pixel ratio
renderer.render(scene, camera); // Render the scene with the camera

// Controls setup
const controls = new OrbitControls(camera, canvas); // Create OrbitControls for camera interaction
controls.enableDamping = true; // Enable damping for smooth camera movement
controls.enablePan = false; // Disable panning
controls.enableZoom = false; // Disable zooming
controls.autoRotate = true; // Enable auto rotation
controls.autoRotateSpeed = 5; // Set auto rotation speed

// Resize event listener
window.addEventListener("resize", () => {
  // Update sizes on window resize
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera aspect ratio and projection matrix
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(sizes.width, sizes.height);
});

// Animation loop
const loop = () => {
  // Update controls and render the scene
  controls.update();
  renderer.render(scene, camera);

  // Request the next animation frame
  window.requestAnimationFrame(loop);
};
loop();

// Timeline animation with GSAP
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 }); // Scale animation for the sphere
tl.fromTo("nav", { y: "-100%" }, { y: "0%" }); // Animation for the navigation element
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 }); // Animation for an element with class "title"

// Mouse Animation Color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true)); // Set mouseDown to true on mouse down
window.addEventListener("mouseup", () => (mouseDown = false)); // Set mouseDown to false on mouse up

// Mousemove event listener for color animation
window.addEventListener("mousemove", (e) => {
  // Check if the mouse is held down
  if (mouseDown) {
    // Calculate RGB values based on mouse position within the window
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150, // Fixed blue value
    ];

    // Create a new THREE.Color object with the calculated RGB values
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);

    // Use GSAP to animate the color change of the sphere's material
    gsap.to(mesh.material.color, {
      r: newColor.r, // Animate red component
      g: newColor.g, // Animate green component
      b: newColor.b, // Animate blue component
    });
  }
});

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // sky blue

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0,2,5);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,10,5);
scene.add(light);

// Controls
const controls = new THREE.PointerLockControls(camera, document.body);
document.body.addEventListener('click', ()=>{controls.lock();});

// Floor / ground
const groundGeo = new THREE.BoxGeometry(50,1,50);
const groundMat = new THREE.MeshStandardMaterial({color:0x228B22});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.y = -0.5;
scene.add(ground);

// Basic block for testing
const blockGeo = new THREE.BoxGeometry(1,1,1);
const blockMat = new THREE.MeshStandardMaterial({color:0x8B4513});
for(let x=-5;x<=5;x++){
  for(let z=-5;z<=5;z++){
    const block = new THREE.Mesh(blockGeo, blockMat);
    block.position.set(x,0,z);
    scene.add(block);
  }
}

// Movement
const move = {forward:false,back:false,left:false,right:false};
const velocity = new THREE.Vector3();

document.addEventListener('keydown',(e)=>{
  if(e.code==='KeyW') move.forward=true;
  if(e.code==='KeyS') move.back=true;
  if(e.code==='KeyA') move.left=true;
  if(e.code==='KeyD') move.right=true;
});
document.addEventListener('keyup',(e)=>{
  if(e.code==='KeyW') move.forward=false;
  if(e.code==='KeyS') move.back=false;
  if(e.code==='KeyA') move.left=false;
  if(e.code==='KeyD') move.right=false;
});

// Animation loop
function animate(){
  requestAnimationFrame(animate);

  // basic movement
  const speed = 0.1;
  if(move.forward) velocity.z = -speed;
  else if(move.back) velocity.z = speed;
  else velocity.z = 0;

  if(move.left) velocity.x = -speed;
  else if(move.right) velocity.x = speed;
  else velocity.x = 0;

  controls.moveRight(velocity.x);
  controls.moveForward(velocity.z);

  renderer.render(scene, camera);
}
animate();
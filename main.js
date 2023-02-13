

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 15, -35)

let renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor(0x100d29);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement)

// const geometry = new THREE.BoxGeometry( 1, 2, 1 );
const playerGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 2, 32 );

const playerMaterial = new THREE.MeshToonMaterial( {
    color: 0xfc036b,
    fog: true
});

const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.rotation.x = 1.5
camera.lookAt(player.position.x, player.position.y + 15, player.position.z)

const playerLight = new THREE.PointLight( 0xff6b30, 2, 100);
playerLight.position.set( 0, 0, 0 );

const axesHelper = new THREE.AxesHelper( 50 );
scene.add( axesHelper );

const playerGroup = new THREE.Group();
playerGroup.add( player );
playerGroup.add( playerLight );
playerGroup.add( camera );
scene.add(playerGroup)


const ambient = new THREE.AmbientLight(0xc7eaff, 0.1);
scene.add(ambient);


const torusMaterial = new THREE.MeshToonMaterial( {
    color: 0x549471,
    fog: true
});



createWorld(60, 150, 0x246343, 25);
createWorld(-20, 50, 0x9e3a85, 15);


function createWorld(xCoord, zCoord, colour, size){
  var worldMaterial = new THREE.MeshToonMaterial( {
    color: colour,
    fog: true
});
  let globe = new THREE.Mesh( new THREE.SphereGeometry( size, 64, 24 ), worldMaterial );
  globe.position.set(xCoord, 0, zCoord)
  scene.add(globe);
}

// const controls = new OrbitControls(camera, renderer.domElement)


const point = new THREE.PointLight(0xc7eaff, 2);
point.position.set(0,20,0);
point.lookAt(player.position)
scene.add( point );

window.addEventListener('resize', onWindowResize, false)

let mouseXDif = 0;
let mouseYDif = 0;

let mouseDown = false;
let joystickAngle = 0;

let downMousePosX;
let downMousePosY;

function down(mouseX, mouseY){
  mouseDown = true;
  downMousePosX = mouseX;
  downMousePosY = mouseY;
  $("#joystick").show();

  $("#joystick").css({
    "top": mouseY + "px",
    "left": mouseX + "px"
  });
  $("#moving-touch-dot").css({
    "top": mouseY - 25 + "px",
    "left": mouseX - 25 + "px"
  })
}

window.addEventListener("mousedown", (e) => {
  down(e.clientX, e.clientY)
});
window.addEventListener("touchstart", (e) => {
  var touch = e.touches[0] || e.changedTouches[0];
  down(touch.pageX, touch.pageY)
});

function up(){
  $("#joystick").hide();
  mouseDown = false;
  mouseXDif = 0;
  mouseYDif = 0;
}
window.addEventListener("touchend", up);
window.addEventListener("mouseup", up);

function move(mouseX, mouseY){
    const maxMoveDist = 50;
    mouseXDif = mouseX - downMousePosX;
    mouseYDif = mouseY - downMousePosY;

    if(Math.abs(mouseXDif) > maxMoveDist){
        mouseX = downMousePosX + ((mouseXDif / Math.abs(mouseXDif)) * maxMoveDist)
        mouseXDif = mouseX - downMousePosX;
    }
    if(Math.abs(mouseYDif) > maxMoveDist){
        mouseY = downMousePosY + ((mouseYDif / Math.abs(mouseYDif)) * maxMoveDist)
        mouseYDif = mouseY - downMousePosY;
    }

    try{
        joystickAngle = Math.atan(mouseYDif,mouseXDif);
    }catch{
        joystickAngle = 0
    }

    $("#moving-touch-dot").css({
        "top": mouseY - 25 + "px",
        "left": mouseX - 25 + "px"
    })
}
window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    move(e.clientX, e.clientY)
  }
});
window.addEventListener('touchmove', (e) => {
  if(mouseDown){
    var touch = e.touches[0] || e.changedTouches[0];
    move(touch.pageX, touch.pageY)
  }
});

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}

const rotationSpeed = 0.000000002;
const movementSpeed = 0.01;
const joystickMoveRotateBounds = 30

function animate() {
    if(mouseDown){
      if(mouseXDif > joystickMoveRotateBounds){
        playerGroup.rotation.set(playerGroup.rotation.x, playerGroup.rotation.y - rotationSpeed * Math.pow(mouseXDif, 4), playerGroup.rotation.z)
      }else if(mouseXDif < -joystickMoveRotateBounds){
        playerGroup.rotation.set(playerGroup.rotation.x, playerGroup.rotation.y + rotationSpeed * Math.pow(mouseXDif, 4), playerGroup.rotation.z)
      }

      if(mouseYDif > joystickMoveRotateBounds || mouseYDif < -joystickMoveRotateBounds){
        var vector = new THREE.Vector3( 0, 0, -1 );
        vector.applyQuaternion( playerGroup.quaternion );
        playerGroup.position.add( vector.multiplyScalar( movementSpeed * mouseYDif ) );
      }
    }
    
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();


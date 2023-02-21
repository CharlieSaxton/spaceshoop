// import * as THREE from "./node_modules/three"
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/FBXLoader'

const fbxLoader = new FBXLoader()


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 15, -35)

let renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor(0x08060f);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement)

let trail = [];




var player = new THREE.Group();
fbxLoader.load(
  'models/spaceship.fbx',
  (object) => {
      object.traverse( function ( child ) {
        if ( child.isMesh ) {
          new THREE.TextureLoader().load( 'maps/spaceship-map.jpg', ( texture ) => {
              child.material.map = texture;
              child.material.needsupdate = true;
            });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      object.scale.set(0.005, 0.005, 0.005)
      player.add( object );
  },
  (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
      console.log(error)
  }
)

camera.lookAt(player.position.x, player.position.y + 15, player.position.z)

const playerLight = new THREE.PointLight( 0xff6b30, 3, 100);
playerLight.position.set( 0, 0, 0 );


// const axesHelper = new THREE.AxesHelper( 50 );
// scene.add( axesHelper );

const playerGroup = new THREE.Group();
playerGroup.add( player );
playerGroup.add( playerLight );
playerGroup.add( camera );

scene.add(playerGroup)


const ambient = new THREE.AmbientLight(0xc7eaff, 0.5);
scene.add(ambient);



var starMaterial = new THREE.MeshToonMaterial( {
  color: 0xfff3db,
  fog: true
});

// create stars
const starGroup = new THREE.Group();
for(let i = 0; i < 4; i++){
  const starSide = new THREE.Group();
  for(let i = 0; i < 250; i++){
    let star = new THREE.Mesh( new THREE.SphereGeometry( generateRandomNumber(0.05, 1), 6, 6 ), starMaterial )
    star.position.set(generateRandomNumber(-700, 700), generateRandomNumber(-700, 700), 500)
    starSide.add(star)
  }
  starSide.rotation.y = i * 2;
  starGroup.add(starSide);
}
playerGroup.add(starGroup);

createWorld(60, 230, 0x376942, 20, [ {
  path: 'models/BirchTree_1.fbx', 
  scaleRange: {min: 0.01, max: 0.09}, 
  amount: 3
},
{
  path: 'models/Bush_2.fbx', 
  scaleRange: {min: 0.01, max: 0.09}, 
  amount: 8
},
{
  path: 'models/Flowers.fbx', 
  scaleRange: {min: 0.01, max: 0.09}, 
  amount: 12
},], false, true);

createWorld(-50, 150, 0xe1f2f2, 32, [{
  path: 'models/CommonTree_Snow_1.fbx', 
  scaleRange: {min: 0.01, max: 0.09}, 
  amount: 3
},
{
  path: 'models/CommonTree_Snow_2.fbx', 
  scaleRange: {min: 0.01, max: 0.09}, 
  amount: 10
},
{
  path: 'models/CommonTree_Snow_3.fbx', 
  scaleRange: {min: 0.01, max: 0.09}, 
  amount: 10
},
{
  path: 'models/Rock_Snow_1.fbx', 
  scaleRange: {min: 0.01, max: 0.09}, 
  amount: 10
},
{
  path: 'models/Rock_Snow_2.fbx', 
  scaleRange: {min: 0.01, max: 0.09}, 
  amount: 15
},
{
  path: 'models/Rock_Snow_3.fbx', 
  scaleRange: {min: 0.01, max: 0.09}, 
  amount: 4
},
{
  path: 'models/Rock_Snow_3.fbx', 
  scaleRange: {min: 0.01, max: 0.09}, 
  amount: 4
},
{
  path: 'models/WoodLog_Snow.fbx', 
  scaleRange: {min: 0.01, max: 0.09}, 
  amount: 10
},], true, true);



function createWorld(xCoord, zCoord, colour, size, models = [], hasRing = false, hasOcean = false){
  let globeGroup = new THREE.Group();
  let num = generateRandomNumber(1, 3, 0)
  let heightMap = new THREE.TextureLoader().load('maps/height-map-' + num + '.jpeg')
  var worldMaterial = new THREE.MeshToonMaterial( {
    color: colour,
    fog: true,
    displacementMap: heightMap
  });

  worldMaterial.displacementScale = 10


  if(hasRing){
    const ringGeometry = new THREE.RingGeometry( size + 18, size + 18 + generateRandomNumber(5, 15), 32 );
    const ringMaterial = new THREE.MeshToonMaterial( { 
      color: 0xf7e0b7, 
      side: THREE.DoubleSide, 
      fog: true,
      transparent: true,
      opacity: generateRandomNumber(0.3, 0.9)
    } );
    const ring = new THREE.Mesh( ringGeometry, ringMaterial );
    ring.rotation.x = generateRandomNumber(-2, 2)
    globeGroup.add( ring );
  }


  if(hasOcean){
    var oceanMaterial = new THREE.MeshToonMaterial( {
      color: 0x0f3b75,
      fog: true
    });
    let ocean = new THREE.Mesh( new THREE.SphereGeometry( size +  worldMaterial.displacementScale/2, 64, 24 ), oceanMaterial );
    globeGroup.add(ocean)
  }
  let globe = new THREE.Mesh( new THREE.SphereGeometry( size, 64, 24 ), worldMaterial );
  globe.recieveShadow = true
  globeGroup.add(globe);
  globeGroup.position.set(xCoord, 0, zCoord)

  models.forEach(model => {
    for(let i = 0; i < model.amount; i++){
      fbxLoader.load(
          model.path,
          (object) => {
              var objectMaterial = new THREE.MeshToonMaterial( {
                fog: true
              });
              object.material = objectMaterial
              var pivot = new THREE.Group();
              let scale = generateRandomNumber(model.scaleRange.min, model.scaleRange.max)
              object.scale.set(scale, scale, scale)
              object.position.set(0, size + worldMaterial.displacementScale/2, 0)
              pivot.add( object );
              pivot.rotation.set(generateRandomNumber(-2, 2), generateRandomNumber(-2, 2), generateRandomNumber(-2, 2))
              globeGroup.add( pivot );
          },
          (xhr) => {
              console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
          },
          (error) => {
              console.log(error)
          }
      )
    }
    
    
  });
  scene.add(globeGroup)
}

// const controls = new OrbitControls(camera, renderer.domElement)

function generateRandomNumber(min, max, decimalPlaces = 5) {
  var rand = Math.random()*(max-min) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand*power) / power;
}

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

var trailMaterialStart = new THREE.MeshToonMaterial( {
  color: 0xd14949,
  fog: true,
});

var trailMaterialMid = new THREE.MeshToonMaterial( {
  color: 0xd66127,
  fog: true,
});

var trailMaterialEnd = new THREE.MeshToonMaterial( {
  color: 0xd1b149,
  fog: true,
});

let trailScaleFallOff = 0.05;
let trailSpeedFallOff = 0.2

function animate() {
    trail.forEach(function(trailPiece, i) {
      if(trailPiece.scale.x <= 0){
        playerGroup.remove(trailPiece);
        trail.splice(i, 1);
      }else if(trailPiece.scale.x < 0.5){
        trailPiece.material = trailMaterialEnd;
      }else if(trailPiece.scale.x < 0.75){
        trailPiece.material = trailMaterialMid;
      }
      trailPiece.position.set(trailPiece.position.x + generateRandomNumber(-0.3, 0.3), trailPiece.position.y, trailPiece.position.z - trailSpeedFallOff);
      trailPiece.scale.set(trailPiece.scale.x - trailScaleFallOff, trailPiece.scale.y - trailScaleFallOff, trailPiece.scale.z - trailScaleFallOff)
    })

    if(mouseDown){
      if(mouseXDif > joystickMoveRotateBounds){
        playerGroup.rotation.set(playerGroup.rotation.x, playerGroup.rotation.y - rotationSpeed * Math.pow(mouseXDif, 4), playerGroup.rotation.z)
      }else if(mouseXDif < -joystickMoveRotateBounds){
        playerGroup.rotation.set(playerGroup.rotation.x, playerGroup.rotation.y + rotationSpeed * Math.pow(mouseXDif, 4), playerGroup.rotation.z)
      }
      starGroup.rotation.set(starGroup.rotation.x, -playerGroup.rotation.y, starGroup.rotation.z)

      if(mouseYDif > joystickMoveRotateBounds || mouseYDif < -joystickMoveRotateBounds){
        let trailPiece = new THREE.Mesh( new THREE.SphereGeometry(generateRandomNumber(0.3, 0.7), 12, 12 ), trailMaterialStart );
        trailPiece.position.set(0, 0, -5);
        trail.push(trailPiece)
        playerGroup.add(trailPiece)

        var vector = new THREE.Vector3( 0, 0, -1 );
        vector.applyQuaternion( playerGroup.quaternion );
        playerGroup.position.add( vector.multiplyScalar( movementSpeed * mouseYDif ) );

     
      }
    }
    
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();


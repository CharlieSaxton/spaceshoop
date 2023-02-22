// import * as THREE from "./node_modules/three"
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/FBXLoader'
import { FontLoader, TextGeometry } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import Bender from 'https://cdn.jsdelivr.net/gh/Sean-Bradley/Bender@main/dist/client/bender.js'

import Worlds from './worlds.json' assert { type: "json" };


let worlds = Worlds.Worlds;
console.log(worlds);


const bender = new Bender()

const fbxLoader = new FBXLoader()

const clock = new THREE.Clock();

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
let worldHeaders = []

const loader = new FontLoader();


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

worlds.forEach(world =>{
  createWorld(world)
})

function createWorld(worldData){
  let globeGroup = new THREE.Group();
  let heightMap = new THREE.TextureLoader().load(worldData.landHeightMap)
  var worldMaterial = new THREE.MeshToonMaterial( {
    color: Number(worldData.landColour),
    fog: true,
    displacementMap: heightMap
  });
  worldMaterial.displacementScale = 10
  loader.load( 'fonts/Work_Sans_Bold.json', function ( font ) {
    let textGroup = new THREE.Group();
    const textGeometry = new TextGeometry( worldData.title, {
      font: font,
      size: 7,
      height: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1
    } );


    const textMaterial = new THREE.MeshToonMaterial( { 
      color: Number(worldData.titleColour), 
      fog: true
    } );
    bender.bend(textGeometry, 'z', -1 / (worldData.size + 20) )

    const text = new THREE.Mesh( textGeometry, textMaterial );
    text.rotation.set(0, Math.PI, 0) 
    text.position.y = worldData.size + 20
    textGroup.add(text)
    worldHeaders.push(textGroup)
    globeGroup.add(textGroup)
  } );



  if(worldData.hasOcean){
    var oceanMaterial = new THREE.MeshToonMaterial( {
      color: Number(worldData.oceanColour),
      fog: true
    });
    let ocean = new THREE.Mesh( new THREE.SphereGeometry( worldData.size +  worldMaterial.displacementScale/2, 64, 24 ), oceanMaterial );
    globeGroup.add(ocean)
  }
  let globe = new THREE.Mesh( new THREE.SphereGeometry( worldData.size, 64, 24 ), worldMaterial );
  globe.recieveShadow = true
  globeGroup.add(globe);
  globeGroup.position.set(worldData.xCoord, 0, worldData.zCoord)

  worldData.models.forEach(model => {
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
              object.position.set(0, worldData.size + worldMaterial.displacementScale/2, 0)
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

const rotationSpeed = 0.0000002;
const movementSpeed = 1;
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

const headerRotationSpeed = 0.005
const worldRotationSpeed = 0.001

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

    worldHeaders.forEach(header => {
      header.rotation.z = header.rotation.z + headerRotationSpeed
    });

    if(mouseDown){
      let deltaTime = clock.getDelta()
      if(deltaTime > 0.01){
        deltaTime = 0.01
      }

      if(mouseXDif > joystickMoveRotateBounds){
        playerGroup.rotation.set(playerGroup.rotation.x, playerGroup.rotation.y - rotationSpeed * Math.pow(mouseXDif, 4) * deltaTime, playerGroup.rotation.z)
      }else if(mouseXDif < -joystickMoveRotateBounds){
        playerGroup.rotation.set(playerGroup.rotation.x, playerGroup.rotation.y + rotationSpeed * Math.pow(mouseXDif, 4) * deltaTime, playerGroup.rotation.z)
      }
      starGroup.rotation.set(starGroup.rotation.x, -playerGroup.rotation.y, starGroup.rotation.z)

      if(mouseYDif > joystickMoveRotateBounds || mouseYDif < -joystickMoveRotateBounds){
        let trailPiece = new THREE.Mesh( new THREE.SphereGeometry(generateRandomNumber(0.3, 0.7), 12, 12 ), trailMaterialStart );
        trailPiece.position.set(0, 0, -5);
        trail.push(trailPiece)
        playerGroup.add(trailPiece)

        var vector = new THREE.Vector3( 0, 0, -1 );
        vector.applyQuaternion( playerGroup.quaternion );

        playerGroup.position.add( vector.multiplyScalar( movementSpeed * mouseYDif * deltaTime) );
      }
    }
    
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();


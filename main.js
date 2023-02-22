// import * as THREE from "./node_modules/three"

import { FBXLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/FBXLoader'
import { FontLoader, TextGeometry } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import Bender from 'https://cdn.jsdelivr.net/gh/Sean-Bradley/Bender@main/dist/client/bender.js'

// import Planets from "./planets.json" assert { type: 'json' };

// let planetsData = Planets.planets;

let planetsData = [
  {
    name: "about",
    xCoord: 40,
    zCoord: 80,
    size: 10,
    landColour: "0x47EFC7",
    landHeightMap: "maps/height-map-3.jpeg",
    hasOcean: true,
    oceanColour: "0xEF476F",
    atmosphereColour: "0x36bdd9",
    title: "ABOUT ME    ABOUT ME    ABOUT ME",
    titleColour: "0xe1f2f2",
    models: [
      {
        path: "models/Rock_1.fbx",
        scaleRange: {
          min: 0.01,
          max: 0.09
        },
        amount: 5
      },
      {
        path: "models/Rock_2.fbx",
        scaleRange: {
          min: 0.01,
          max: 0.09
        },
        amount: 5
      },
      {
        path: "models/Rock_Moss_4.fbx",
        scaleRange: {
          min: 0.01,
          max: 0.09
        },
        amount: 7
      },
      {
        path: "models/PineTree_3.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.05
        },
        amount: 3
      },
      {
        path: "models/PineTree_2.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.05
        },
        amount: 2
      },
      {
        path: "models/PineTree_Autumn_5.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.05
        },
        amount: 3
      }
    ]
  },
  {
    name: "droppah",
    xCoord: -40,
    zCoord: 200,
    size: 31,
    landColour: "0xe2faff",
    landHeightMap: "maps/height-map-2.jpeg",
    hasOcean: true,
    oceanColour: "0x2b70ee",
    atmosphereColour: "0x36bdd9",
    title: "DROPPAH  DROPPAH  DROPPAH  DROPPAH  DROPPAH  DROPPAH",
    titleColour: "0xe1f2f2",
    models: [
      {
        path: "models/Rock_Snow_1.fbx",
        scaleRange: {
          min: 0.04,
          max: 0.11
        },
        amount: 5
      },
      {
        path: "models/Rock_Snow_2.fbx",
        scaleRange: {
          min: 0.04,
          max: 0.11
        },
        amount: 5
      },
      {
        path: "models/Rock_Snow_3.fbx",
        scaleRange: {
          min: 0.04,
          max: 0.11
        },
        amount: 5
      },
      {
        path: "models/CommonTree_Snow_1.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.06
        },
        amount: 10
      },
      {
        path: "models/CommonTree_Snow_2.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.06
        },
        amount: 7
      },
      {
        path: "models/CommonTree_Snow_3.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.06
        },
        amount: 7
      },
      {
        path: "models/BirchTree_Snow_1.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.06
        },
        amount: 10
      },
      {
        path: "models/BirchTree_Snow_2.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.06
        },
        amount: 3
      }
    ]
  },
  {
    name: "vinyl",
    xCoord: 50,
    zCoord: 300,
    size: 17,
    landColour: "0xfcec91",
    landHeightMap: "maps/height-map-1.jpeg",
    hasOcean: true,
    oceanColour: "0x91A2FC",
    atmosphereColour: "0x36bdd9",
    title: "VINYL   VINYL   VINYL   VINYL   VINYL   VINYL",
    titleColour: "0xe1f2f2",
    models: [
      {
        path: "models/Rock_1.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.07
        },
        amount: 5
      },
      {
        path: "models/Rock_2.fbx",
        scaleRange: {
          min: 0.04,
          max: 0.08
        },
        amount: 5
      },
      {
        path: "models/Rock_3.fbx",
        scaleRange: {
          min: 0.04,
          max: 0.08
        },
        amount: 5
      },
      {
        path: "models/Bush_1.fbx",
        scaleRange: {
          min: 0.04,
          max: 0.08
        },
        amount: 5
      },
      {
        path: "models/Cactus_1.fbx",
        scaleRange: {
          min: 0.04,
          max: 0.08
        },
        amount: 5
      },
      {
        path: "models/Cactus_2.fbx",
        scaleRange: {
          min: 0.04,
          max: 0.08
        },
        amount: 5
      },
      {
        path: "models/Cactus_3.fbx",
        scaleRange: {
          min: 0.04,
          max: 0.08
        },
        amount: 5
      },
      {
        path: "models/PalmTree_1.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.04
        },
        amount: 10
      },
      {
        path: "models/PalmTree_2.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.04
        },
        amount: 7
      },
      {
        path: "models/PalmTree_3.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.04
        },
        amount: 7
      },
      {
        path: "models/PalmTree_4.fbx",
        scaleRange: {
          min: 0.02,
          max: 0.04
        },
        amount: 3
      }
    ]
  },
  {
    name: "kitomba",
    xCoord: -120,
    zCoord: 400,
    size: 23,
    landColour: "0xB23911",
    landHeightMap: "maps/height-map-2.jpeg",
    hasOcean: true,
    oceanColour: "0x118AB2",
    atmosphereColour: "0x36bdd9",
    title: "KITOMBA   KITOMBA   KITOMBA   KITOMBA   KITOMBA",
    titleColour: "0xe1f2f2",
    models: [
      {
        path: "models/Rock_1.fbx",
        scaleRange: {
          min: 0.01,
          max: 0.09
        },
        amount: 50
      }
    ]
  },
  {
    name: "contact",
    xCoord: 140,
    zCoord: 500,
    size: 18,
    landColour: "0x2A9D8F",
    landHeightMap: "maps/height-map-1.jpeg",
    hasOcean: true,
    oceanColour: "0x9D2A38",
    atmosphereColour: "0x36bdd9",
    title: "CONTACT ME   CONTACT ME   CONTACT ME   ",
    titleColour: "0xe1f2f2",
    models: [
      {
        path: "models/Rock_1.fbx",
        scaleRange: {
          min: 0.01,
          max: 0.09
        },
        amount: 50
      }
    ]
  }
]
let loading = true;
let paused = false;
setTimeout(() =>{
  loading = false
}, 1000);




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
let planets = [];
let planetHeaders = []

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


var fadeGeometry = new THREE.BoxGeometry( 2000, 500, 200 );
var fadeMaterial = new THREE.MeshToonMaterial( {
  color: 0x08060f,
  fog: true,
  transparent: true,
  opacity: 0.8
});

var fade = new THREE.Mesh(fadeGeometry, fadeMaterial);
fade.position.set(0,0,300)
playerGroup.add(fade);

// create stars
const starGroup = new THREE.Group();
for(let i = 0; i < 4; i++){
  const starSide = new THREE.Group();
  for(let i = 0; i < 250; i++){
    let star = new THREE.Mesh( new THREE.SphereGeometry( generateRandomNumber(0.01, 0.5), 6, 6 ), starMaterial )
    star.position.set(generateRandomNumber(-300, 300), generateRandomNumber(-300, 300), 100)
    starSide.add(star)
  }
  starSide.rotation.y = i * 2;
  starGroup.add(starSide);
}
playerGroup.add(starGroup);

planetsData.forEach(planet =>{
  createplanet(planet)
})


function createplanet(planetData){
  let planetGroup = new THREE.Group();
  let heightMap = new THREE.TextureLoader().load(planetData.landHeightMap)
  var planetMaterial = new THREE.MeshToonMaterial( {
    color: Number(planetData.landColour),
    fog: true,
    displacementMap: heightMap
  });
  planetMaterial.displacementScale = 10
  let planet = new THREE.Mesh( new THREE.SphereGeometry( planetData.size, 64, 24 ), planetMaterial );
  planet.recieveShadow = true
  planetGroup.add(planet);

  let planetBounds = new THREE.Mesh( new THREE.SphereGeometry( planetData.size + 15, 64, 24 ),  new THREE.MeshToonMaterial( {color: Number(planetData.atmosphereColour), transparent: true, opacity: 0.2}) );
  planetGroup.add(planetBounds);


  loader.load( 'fonts/Work_Sans_Bold.json', function ( font ) {
    let textGroup = new THREE.Group();
    const textGeometry = new TextGeometry( planetData.title, {
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
      color: Number(planetData.titleColour), 
      fog: true
    } );
    bender.bend(textGeometry, 'z', -1 / (planetData.size + 20) )

    const text = new THREE.Mesh( textGeometry, textMaterial );
    text.rotation.set(0, Math.PI, 0) 
    text.position.y = planetData.size + 20
    textGroup.add(text)
    planetHeaders.push(textGroup)
    textGroup.position.set(planetData.xCoord, 0, planetData.zCoord)
    scene.add(textGroup)
  });
  if(planetData.hasOcean){
    var oceanMaterial = new THREE.MeshToonMaterial( {
      color: Number(planetData.oceanColour),
      fog: true
    });
    let ocean = new THREE.Mesh( new THREE.SphereGeometry( planetData.size +  planetMaterial.displacementScale/2, 64, 24 ), oceanMaterial );
    planetGroup.add(ocean)
  }
  planetGroup.position.set(planetData.xCoord, 0, planetData.zCoord)

  planetData.models.forEach(model => {
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
              object.position.set(0, planetData.size + planetMaterial.displacementScale/2, 0)
              pivot.add( object );
              pivot.rotation.set(generateRandomNumber(-2, 2), generateRandomNumber(-2, 2), generateRandomNumber(-2, 2))
              planetGroup.add( pivot );
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
  planets.push(planetGroup)
  planetGroup.userData.planetName = planetData.name
  scene.add(planetGroup)
}

function generateRandomNumber(min, max, decimalPlaces = 5) {
  var rand = Math.random()*(max-min) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand*power) / power;
}

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}

let mouseXDif = 0;
let mouseYDif = 0;

let mouseDown = false;
let joystickAngle = 0;

let downMousePosX;
let downMousePosY;

function down(mouseX, mouseY){
  if(!paused){
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
  if(!paused){
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

$(".close-button").click(function(e){
  let target = e.target;
  $(target).closest(".planet-overlay").hide();
  paused = false;
});


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
const planetRotationSpeed = 0.001

function animate() {
    if(!paused){
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
  
      planetHeaders.forEach(header => {
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
  
      planets.forEach(planet => {
        planet.rotation.y = planet.rotation.y + planetRotationSpeed
        // if(!loading){
        //   var playerBB = new THREE.Box3().setFromObject(player)
        //   var planetBB = new THREE.Box3().setFromObject(planet);
        //   var inPlanetBounds = planetBB.containsBox(playerBB);
        //   if(inPlanetBounds){
        //     playerGroup.rotation.set(playerGroup.rotation.x, 0, playerGroup.rotation.z)
        //     playerGroup.position.set(planet.position.x, playerGroup.position.y, planet.position.z - 100)
        //     $("#planet-overlay-" + planet.userData.planetName).show();
        //     $("#joystick").hide();
        //     paused = true;
        //   }
        // }
       
      });
    }
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
   
}
animate();


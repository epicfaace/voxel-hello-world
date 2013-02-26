var createGame = require('voxel-engine');
var player = require('voxel-player');
var texturePath = require('painterly-textures')(__dirname);
var createTerrain = require('voxel-perlin-terrain');
var highlight = require('voxel-highlight'); //special
var game = createGame({
  //lower scale factor = smoother
  generateVoxelChunk: createTerrain({ scaleFactor: 20 }),
  chunkDistance: 2, //2 in front, 2 behind, etc. for 16 chunks total
  materials: [
    'obsidian',
    ['grass', 'dirt', 'grass_dirt'], //multiple sides
    'brick',
    'grass',
    'plank'
    //materials [1,2,3...etc]; index[0] is air, NOT the first item.
  ],
  texturePath: texturePath,
  worldOrigin: [0, 0, 0],
  controls: { discreteFire: true }
});

// create the player from a minecraft skin file and tell the
// game to use it as the main player
var createPlayer = player(game);
var substack = createPlayer('substack.png');
substack.yaw.position.set(0, -1200, 0);
substack.possess();

game.on('fire', function(target, state) {
  //when block is clicked to get destroyed
  //console.log([target,state]);
  
  /*var pos=target.position;
  pos.x=Math.round(pos.x);
  pos.y=Math.round(pos.y);
  pos.z=Math.round(pos.z);
  console.log(pos);
  console.log(target.position);
  game.setBlock(pos,0);*/

  var vec = game.cameraVector()
  var pos = game.cameraPosition()
  var point = game.raycast(pos, vec, 100)
  if (! (!state.firealt && !state.alt)) {
    console.log("special circ!!!");
    game.createBlock(point.addSelf(vec.multiplyScalar(-game.cubeSize/2)), currentMaterial)
  }
  else if (point){
    game.setBlock(point, 0);
  }

  //playerPos: game.controls.target().avatar.position()
  /*var vec = game.cameraVector()
  var pos = game.cameraPosition()
  var point = game.raycast(pos, vec, 100)
  if (!point) return
  var erase = !state.firealt && !state.alt
  if (erase) {
    //erases the clicked block
    game.setBlock(point, 1)
  } else {
    game.setBlock(point,3);
    //game.createBlock(point.addSelf(vec.multiplyScalar(-game.cubeSize/2)), currentMaterial)
  }*/
});
highlight(game)
var container = document.querySelector('#container')
game.appendTo(container);
window.game=game;
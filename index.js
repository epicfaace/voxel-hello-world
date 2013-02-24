var createGame = require('voxel-engine');
var player = require('voxel-player');
var texturePath = require('painterly-textures')(__dirname);
var createTerrain = require('voxel-perlin-terrain');
var game = createGame({
  generateVoxelChunk: createTerrain({ scaleFactor: 10 }),
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

var container = document.querySelector('#container')
game.appendTo(container);
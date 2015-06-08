var PIXI = require('pixi.js')
var math = require('mathjs')
var astar = require('./lib/astar')

var TILE_WIDTH = 64
var TILE_HEIGHT = 32
var OFFSET_X = 200
var OFFSET_Y = 200

// function coordsToPos (x, y) {
//   return {
//     x: 200 + (x * 32 - y * 32),
//     y: 200 + (x * 16 + y * 16)
//   }
// }

function coordsToPos (x, y) {
  var r = m1.multiply([x ,y, 1]).toArray()
  return {
    x: r[0],
    y: r[1]
  }
}

var m1 = math.matrix([
  [TILE_WIDTH / 2, -TILE_WIDTH / 2, OFFSET_X],
  [TILE_HEIGHT / 2, TILE_HEIGHT / 2, OFFSET_Y],
  [0, 0, 1]
])
window.m1 = m1

var m2 = math.matrix([
  [TILE_HEIGHT, TILE_WIDTH, -OFFSET_X * TILE_HEIGHT - OFFSET_Y * TILE_WIDTH],
  [-TILE_HEIGHT, TILE_WIDTH, OFFSET_X * TILE_HEIGHT - OFFSET_Y * TILE_WIDTH],
  [0, 0, 2 * TILE_WIDTH * TILE_HEIGHT]
]).multiply(1 / (2 * TILE_WIDTH * TILE_HEIGHT))
window.m2 = m2

var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

PIXI.loader
    .add('/assets/tiles.json')
    .load(onAssetsLoaded);

var map = [
  [1, 0, 0, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
]
window.map = map
window.astar = astar

function onAssetsLoaded () {
  var grassTileTexture = PIXI.Texture.fromFrame('grass_tile.png')

  var x = 0
  var y = 0
  var s

  while (x < map.length) {
    while (y < map[0].length) {
      if (map[y][x]) {
        s = new PIXI.Sprite(grassTileTexture)
        s.position = coordsToPos(x, y)
        stage.addChild(s)
      }
      y = y + 1
    }
    y = 0
    x = x + 1
  }

  animate()
}

// function onAssetsLoaded () {
//   // create a texture from an image path
//   var grassTileTexture = PIXI.Texture.fromFrame('grass_tile.png')
//
//   var x = 0
//   var y = 0
//   var s
//   while (x <= 5) {
//     while (y <= 5) {
//       s = new PIXI.Sprite(grassTileTexture)
//       // s.position.x
//       // s.position.y
//       s.position = coordsToPos(x, y)
//       stage.addChild(s)
//       y++
//     }
//     y = 0
//     x++
//   }
//
//   animate()
// }

function animate() {
  requestAnimationFrame(animate)
  renderer.render(stage)
}

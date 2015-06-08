var PIXI = require('pixi.js')
var math = require('mathjs')

var TILE_WIDTH = 64
var TILE_HEIGHT = 32
var OFFSET_X = 200
var OFFSET_Y = 200

function coordsToPos (x, y) {
  return {
    x: 200 + (x * 32 - y * 32),
    y: 200 + (x * 16 + y * 16)
  }
}

var m1 = math.matrix([
  [64, -64, 200],
  [32, 32, 200],
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

var bunny

function onAssetsLoaded()
{
  // create a texture from an image path
  var grassTileTexture = PIXI.Texture.fromFrame('grass_tile.png')

  var x = 0
  var y = 0
  var s
  while (x <= 5) {
    while (y <= 5) {
      s = new PIXI.Sprite(grassTileTexture)
      // s.position.x
      // s.position.y
      s.position = coordsToPos(x, y)
      stage.addChild(s)
      y++
    }
    y = 0
    x++
  }

  // // create a new Sprite using the texture
  // var d = new PIXI.Sprite(texture);
  // // move the sprite to the center of the screen
  // d.position.x = 132;
  // d.position.y = 84;
  // stage.addChild(d);
  //
  // // create a new Sprite using the texture
  // var a = new PIXI.Sprite(texture);
  // // move the sprite to the center of the screen
  // a.position.x = 100;
  // a.position.y = 100;
  // stage.addChild(a);
  //
  // // create a new Sprite using the texture
  // var b = new PIXI.Sprite(texture);
  // // move the sprite to the center of the screen
  // b.position.x = 164;
  // b.position.y = 100;
  // stage.addChild(b);
  //
  // // create a new Sprite using the texture
  // var c = new PIXI.Sprite(texture);
  // // move the sprite to the center of the screen
  // c.position.x = 132;
  // c.position.y = 116;
  // stage.addChild(c);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // just for fun, let's rotate mr rabbit a little
  // bunny.rotation += 0.1;

  // render the container
  renderer.render(stage);
}

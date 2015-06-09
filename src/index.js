var PIXI = require('pixi.js')
var astar = require('./lib/astar')
var Map = require('./map')
var Actor = require('./actor')
var Game = require('./game')

var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

PIXI.loader
    .add('/assets/tiles.json')
    .add('/assets/bunny.png')
    .load(onAssetsLoaded);

var mapData = [
  [1, 0, 0, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
]
window.mapData = mapData
window.astar = astar

function onAssetsLoaded () {
  var map = new Map(mapData)
  map.render()

  var game = new Game({
    renderer,
    map
  })

  var actor = new Actor({
    game
  })
  actor.render()

  game.start()
}

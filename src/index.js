"use strict"

const PIXI = require('pixi.js')
require('./lib/vector')
const astar = require('./lib/astar')
const Map = require('./map')
const Game = require('./game')
const Actor = require('./actor')

const renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

PIXI.loader
    .add('/assets/tiles.json')
    .add('/assets/bunny.png')
    .load(onAssetsLoaded);

const mapData = [
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
    map
  })
  actor.gotoTile ({ x: 0, y: 3 })
  game.addActor(actor)

  game.start()
}

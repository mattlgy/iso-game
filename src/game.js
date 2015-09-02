var PIXI = require('pixi.js')
var astar = require('./lib/astar')
var Map = require('./map')
// var Actor = require('./actor')
var math = require('mathjs')
var config = require('./config')

var m1 = math.matrix([
  [config.TILE_WIDTH / 2, -config.TILE_WIDTH / 2, config.OFFSET_X],
  [config.TILE_HEIGHT / 2, config.TILE_HEIGHT / 2, config.OFFSET_Y],
  [0, 0, 1]
])
// window.m1 = m1

var m2 = math.matrix([
  [config.TILE_HEIGHT, config.TILE_WIDTH, -config.OFFSET_X * config.TILE_HEIGHT - config.OFFSET_Y * config.TILE_WIDTH],
  [-config.TILE_HEIGHT, config.TILE_WIDTH, config.OFFSET_X * config.TILE_HEIGHT - config.OFFSET_Y * config.TILE_WIDTH],
  [0, 0, 2 * config.TILE_WIDTH * config.TILE_HEIGHT]
]).multiply(1 / (2 * config.TILE_WIDTH * config.TILE_HEIGHT))
// window.m2 = m2
console.log('pants');
class Game {
  constructor ({ map, renderer }) {
    this.renderer = renderer
    this.map = map
    this.stage = new PIXI.Container()
    this.stage.addChild(map.container)
    this.actors = []
  }

  tick (delta) {
    this.renderer.render(this.stage)
    for (var i = 0; i < this.actors.length; i++) {
      this.actors[i].tick(delta)
    }
  }

  start () {
    var then = 0
    var animate = (now) => {
      var d = now - then
      if (d > 20) d = 20
      requestAnimationFrame(animate)
      this.tick(d)
      then = now
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(animate)
    })
  }

  addActor (actor) {
    this.stage.addChild(actor.sprite)
    this.actors.push(actor)
  }


  static toScreenPos ({ x, y }) {
    var r = m1.multiply([x ,y, 1]).toArray()
    return {
      x: r[0],
      y: r[1]
    }
  }
}

module.exports = Game

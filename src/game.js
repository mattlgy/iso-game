var PIXI = require('pixi.js')
var astar = require('./lib/astar')
var Map = require('./map')
var Actor = require('./actor')

class Game {
  constructor ({ map, renderer }) {
    this.renderer = renderer
    this.map = map
    this.stage = new PIXI.Container()
    this.stage.addChild(map.container)
  }

  tick (delta) {
    this.renderer.render(this.stage)
  }

  start () {
    var then = 0
    var animate = (now) => {
      requestAnimationFrame(animate)
      this.tick(now - then)
      then = now
    }
    requestAnimationFrame(animate)
  }
}

module.exports = Game

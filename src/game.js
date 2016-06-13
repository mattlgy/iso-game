"use strict"

const PIXI = require('pixi.js')
const astar = require('./lib/astar')
const Map = require('./map')

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
}

module.exports = Game

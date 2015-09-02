var PIXI = require('pixi.js')
var Game = require('./game')
var astar = require('./lib/astar')
// window.Game = Game

class Actor {
  constructor ({ map, x, y, pos, dir, speed }) {
    // this.game = game

    this.sprite = null

    this.speed = speed || 1
    this.pos = pos || new PIXI.Vector(0.5, 0.5)
    this.dir = dir || new PIXI.Vector(0 ,1)

    this.path = []
    this.next = null

    this.sprite = PIXI.Sprite.fromImage('/assets/bunny.png')
    this.sprite.position = Game.toScreenPos(this.pos)
    this.sprite.anchor.x = -0.5;
    this.sprite.anchor.y = 1.0;
  }

  step (d) {
    var delta = this.dir.clone().multiplyScalar(this.speed * (d / 600))
    this.pos.add(delta)
    this.sprite.position = Game.toScreenPos(this.pos)
  }

  tick (d) {
    this.step(d)
  }
}

module.exports = Actor

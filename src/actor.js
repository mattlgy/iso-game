var PIXI = require('pixi.js')
var astar = require('./lib/astar')
var helpers = require('./lib/helpers')

class Actor {
  constructor ({ game, x, y }) {
    this.game = game
    this.x = x || 0
    this.y = y || 0

    this.sprite = null
  }

  render () {
    // var pos = helpers.toPos(this)
    this.sprite = PIXI.Sprite.fromImage('/assets/bunny.png')
    this.sprite.position = helpers.toPos(this)
    this.sprite.anchor.x = -0.5;
    this.sprite.anchor.y = 0.5;
    this.game.stage.addChild(this.sprite)
  }

  tick () {

  }
}

module.exports = Actor

var PIXI = require('pixi.js')
// var helpers = require('./lib/helpers')
var astar = require('./lib/astar')
var Game = require('./game')

class Map {
  constructor(data) {
    this.data = data
    this.graph = new astar.Graph(this.data)
    this.container = new PIXI.Container()
  }

  render () {
    var grassTileTexture = PIXI.Texture.fromFrame('grass_tile.png')

    var x = 0
    var y = 0
    var s

    while (x < this.data.length) {
      while (y < this.data[0].length) {
        if (this.data[x][y]) {
          s = new PIXI.Sprite(grassTileTexture)
          s.position = Game.toScreenPos({ x, y })
          this.container.addChild(s)
        }
        y = y + 1
      }
      y = 0
      x = x + 1
    }
  }
}

module.exports = Map

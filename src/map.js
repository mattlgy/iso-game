"use strict"

const PIXI = require('pixi.js')
const astar = require('./lib/astar')

const math = require('mathjs')
const config = require('./config')
const m1 = math.matrix([
  [config.TILE_WIDTH / 2, -config.TILE_WIDTH / 2, config.OFFSET_X],
  [config.TILE_HEIGHT / 2, config.TILE_HEIGHT / 2, config.OFFSET_Y],
  [0, 0, 1]
])
const m2 = math.multiply(math.matrix([
  [config.TILE_HEIGHT, config.TILE_WIDTH, -config.OFFSET_X * config.TILE_HEIGHT - config.OFFSET_Y * config.TILE_WIDTH],
  [-config.TILE_HEIGHT, config.TILE_WIDTH, config.OFFSET_X * config.TILE_HEIGHT - config.OFFSET_Y * config.TILE_WIDTH],
  [0, 0, 2 * config.TILE_WIDTH * config.TILE_HEIGHT]
]), 1 / (2 * config.TILE_WIDTH * config.TILE_HEIGHT))

class Map {
  constructor(data) {
    this.data = data
    // this.graph = new astar.Graph(this.data)
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
          s.position = this.toScreenPos({ x, y })
          this.container.addChild(s)
        }
        y = y + 1
      }
      y = 0
      x = x + 1
    }
  }

  getTileAtPos (pos) {
    return {
      x: Math.floor(pos.x),  
      y: Math.floor(pos.y),  
    }
  }

  toScreenPos ({ x, y }) {
    var r = math.multiply(m1, [x ,y, 1]).toArray()
    return {
      x: r[0],
      y: r[1]
    }
  }

  toAstarGraph () {
    return new astar.Graph(this.data)
  }
}

module.exports = Map

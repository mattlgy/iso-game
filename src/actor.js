"use strict"

const PIXI = require('pixi.js')
const astar = require('./lib/astar')

class Actor {
  constructor ({ map, x, y, pos, dir, speed }) {
    this.map = map

    this.speed = speed || 1
    this.pos = pos || new PIXI.Vector(0.5, 0.5)
    this.dir = dir || new PIXI.Vector(0 ,1)

    this.tile = this.map.getTileAtPos(this.pos)

    this.path = null

    this.sprite = PIXI.Sprite.fromImage('/assets/bunny.png')
    this.sprite.position = this.map.toScreenPos(this.pos)
    this.sprite.anchor.x = -0.5;
    this.sprite.anchor.y = 1.0;
  }

  step (d) {

    this.dir = this.path[0].clone().add({ x: 0.5, y: 0.5 }).sub(this.pos).normalize()

    var delta = this.dir.clone().multiplyScalar(this.speed * (d / 1000))
    this.pos.add(delta)
    this.sprite.position = this.map.toScreenPos(this.pos)

    if (
      Math.abs(this.pos.x - (this.path[0].x + .5)) < 0.1 && 
      Math.abs(this.pos.y - (this.path[0].y + .5)) < 0.1
    ) {
      this.path.shift()
    }
    if (!this.path.length) {
      this.path = 0
    }
  }

  gotoTile (tile) {
    const graph = this.map.toAstarGraph()
    const start = graph.grid[this.tile.x][this.tile.y]
    const end = graph.grid[tile.x][tile.y]

    this.path = astar.search(graph, start, end).map(function (p) {
      return new PIXI.Vector(p.x, p.y)
    })
    console.log(this.path)
  }

  tick (d) {
    this.tile = this.map.getTileAtPos(this.pos)

    if (this.path) {
      this.step(d)
    } else {
    
    }
  }
}

module.exports = Actor

var math = require('mathjs')
var config = require('../config')

function toPos ({ x, y }) {
  var r = math.multiply(m1, [x ,y, 1]).toArray()
  return {
    x: r[0],
    y: r[1]
  }
}

var m1 = math.matrix([
  [config.TILE_WIDTH / 2, -config.TILE_WIDTH / 2, config.OFFSET_X],
  [config.TILE_HEIGHT / 2, config.TILE_HEIGHT / 2, config.OFFSET_Y],
  [0, 0, 1]
])
window.m1 = m1

var m2 = math.multiply(math.matrix([
  [config.TILE_HEIGHT, config.TILE_WIDTH, -config.OFFSET_X * config.TILE_HEIGHT - config.OFFSET_Y * config.TILE_WIDTH],
  [-config.TILE_HEIGHT, config.TILE_WIDTH, config.OFFSET_X * config.TILE_HEIGHT - config.OFFSET_Y * config.TILE_WIDTH],
  [0, 0, 2 * config.TILE_WIDTH * config.TILE_HEIGHT]
]), 1 / (2 * config.TILE_WIDTH * config.TILE_HEIGHT))
window.m2 = m2

exports.toPos = toPos
exports.m1 = m1
exports.m2 = m2

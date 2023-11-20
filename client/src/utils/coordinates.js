class Coord {
  constructor(deg, min, sec, direction) {
    this.deg = deg
    this.min = min
    this.sec = sec
    this.direction = direction
  }

  static fromString(coordString) {
    const [deg, min, sec, direction] = coordString?.match(/\d+(\.\d{1,3})?|[NSEW]/g) || []
    return new Coord(parseInt(deg), parseInt(min), parseFloat(sec), direction)
  }

  toDecimal() {
    return (this.deg + this.min / 60 + this.sec / 3600) * (['S', 'W'].includes(this.direction) ? -1 : 1)
  }
}

class CoordPair {
  constructor(latitude, longitude) {
    this.lat = latitude
    this.lng = longitude
  }
}

export {Coord, CoordPair}
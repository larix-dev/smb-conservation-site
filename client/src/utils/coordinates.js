class Coordinate {
  constructor(deg, min, sec, direction) {
    this.deg = deg
    this.min = min
    this.sec = sec
    this.direction = direction
  }

  static fromString(coordString) {
    const [deg, min, sec, direction] = coordString.match(/\d+(\.\d{1,3})?|[NSEW]/g) || []
    return new Coordinate(deg, min, sec, direction)
  }

  toDecimal() {
    if (this.direction === "S" || this.direction === "W") {
      return -1 * (this.deg + this.min / 60 + this.sec / 3600)
    }
    return this.deg + this.min / 60 + this.sec / 3600
  }
}

class CoordPair {
  constructor(latitude, longitude) {
    this.latitude = latitude
    this.longitude = longitude
  }
}
export {Coordinate, CoordPair}
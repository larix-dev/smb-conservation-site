class Coord {
  constructor(deg, min, sec, direction) {
    this.deg = deg
    this.min = min
    this.sec = sec
    this.direction = direction
  }

  static fromString(coordString) {
    const fields = coordString?.match(/-?\d+(\.\d*)?|[NSEW]/g) || []
    if(fields.length === 1) {
      return new Coord(parseFloat(fields[0]), 0, 0, undefined)
    } else {
      const [deg, min, sec, direction] = fields
      return new Coord(parseInt(deg), parseInt(min), parseFloat(sec), direction)
   }
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

  static fromString(coordString) {
    const [lat, lng] = coordString.split(/\,\s*/)
    return new CoordPair(Coord.fromString(lat), Coord.fromString(lng))
  }

  toInvArray() {
    return [this.lng.toDecimal(), this.lat.toDecimal()]
  }
}

export {Coord, CoordPair}

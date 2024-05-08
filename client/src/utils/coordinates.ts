export class Coord {
  deg: number
  min: number
  sec: number
  direction: string

  constructor(deg: number, min: number, sec: number, direction: string) {
    this.deg = deg
    this.min = min
    this.sec = sec
    this.direction = direction
  }

  static fromString(coordString: string) {
    const fields = coordString?.match(/-?\d+(\.\d*)?|[NSEW]/g) || []
    if (fields.length === 1) {
      return new Coord(parseFloat(fields[0]), 0, 0, '')
    } else {
      const [deg, min, sec, direction] = fields
      return new Coord(parseInt(deg!), parseInt(min), parseFloat(sec), direction)
    }
  }

  toDecimal() {
    if (!this.deg) {
      throw new Error('Coordinate does not have any value')
    }
    return (this.deg + this.min / 60 + this.sec / 3600) * (['S', 'W'].includes(this.direction) ? -1 : 1)
  }
}

export class CoordPair {
  lat: Coord
  lng: Coord

  constructor(lat: Coord, lng: Coord) {
    this.lat = lat
    this.lng = lng
  }

  static fromString(coordString: string): CoordPair {
    const [lat, lng] = coordString.split(/\,\s*/)
    return new CoordPair(Coord.fromString(lat), Coord.fromString(lng))
  }

  toInvArray(): [number, number] {
    return [this.lng.toDecimal(), this.lat.toDecimal()]
  }
}

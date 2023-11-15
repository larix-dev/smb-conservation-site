import mapboxgl from 'mapbox-gl'
import {useEffect, useRef} from 'react'
import {useQuery, gql} from '@apollo/client'
import 'mapbox-gl/dist/mapbox-gl.css'

import {Coord, CoordPair} from '../utils/coordinates'

function Mapbox(props) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

  const query = gql`
    query Map {
      map {
        latitude
        longitude
        zoom
      }
    }
  `

  const {data} = useQuery(query)

  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current || !data) {
      return
    }

    const center = new CoordPair(Coord.fromString(data?.map?.latitude), Coord.fromString(data?.map?.longitude))
    const zoom = data?.map?.zoom
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [center.lng.toDecimal(), center.lat.toDecimal()],
      zoom: zoom,
      attributionControl: false,
      minZoom: zoom,
      interactive: props.interactive
    })
    map.current.resize()

    if (props.interactive) {
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-left')
      map.current.addControl(new ExitControl(), 'top-right')
    }
  }, [data])

  return <div ref={mapContainer} className="w-full h-full"></div>
}

class ExitControl {
  onAdd(map) {
    this._map = map
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'

    this._container.innerHTML = `
      <button>
        <svg class="mapboxgl-ctrl-icon" version="1.2" xmlns="http://www.w3.org/2000/svg" fill="#333" width="29" height="29" viewBox="0 0 29 29">
        <path d="M10.3,10.3c-0.5,0.5-0.5,1.6,0,2.1l2.1,2.1l-2.1,2.1c-0.5,0.5-0.5,1.6,0,2.1c0.5,0.5,1.6,0.5,2.1,0l2.1-2.1l2.1,2.1
          c0.5,0.5,1.6,0.5,2.1,0c0.5-0.5,0.5-1.6,0-2.1l-2.1-2.1l2.1-2.1c0.5-0.5,0.5-1.6,0-2.1c-0.5-0.5-1.6-0.5-2.1,0l-2.1,2.1l-2.1-2.1
          C11.8,9.7,10.8,9.7,10.3,10.3z"/>
        </svg>
      </button>
    `

    this._container.addEventListener('contextmenu', e => e.preventDefault())
    this._container.addEventListener('click', e => this.onClick())
    return this._container
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container)
    this._map = undefined
  }

  onClick() {
    window.location.href = '/map'
  }
}

export default Mapbox

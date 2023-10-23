import mapboxgl from 'mapbox-gl'
import {useEffect, useRef, useState} from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'

function InterMap() {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

  const mapContainer = useRef(null)
  const map = useRef(null)

  const [lng, setLng] = useState(-63.916881)
  const [lat, setLat] = useState(44.624944)

  const d = 0.01
  const bounds = [
    [lng - d, lat - d],
    [lng + d, lat + d]
  ]

  const minZoom = 15
  const [zoom, setZoom] = useState(minZoom)

  useEffect(() => {
    if (map.current) {
      return
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
      maxBounds: bounds,
      minZoom: minZoom
    })
    map.current.resize()
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left')
    map.current.addControl(new ExitControl(), 'top-right')
  }, [])

  return <div ref={mapContainer} className="w-screen h-screen"></div>
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

export default InterMap

import mapboxgl, {GeolocateControl} from '!mapbox-gl'
import {useEffect, useRef} from 'react'
import {useQuery, gql} from '@apollo/client'
import 'mapbox-gl/dist/mapbox-gl.css'

import {CoordPair} from '../utils/coordinates'

const toCoordArray = coords => {
  return coords
    .trim()
    .split('\n')
    .map(CoordPair.fromString)
    .map(pair => {
      try {
        return pair.toInvArray()
      } catch {
        return undefined
      }
    })
    .filter(pair => pair)
}

const buildGeoJson = trail => ({
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: toCoordArray(trail.trailCoords)
  },
  properties: {
    name: trail.name,
    description: trail.name
  }
})

const addLayers = (trail, map) => {
  map.addSource(trail.id, {
    type: 'geojson',
    data: buildGeoJson(trail)
  })

  map.addLayer({
    id: trail.name,
    source: trail.id,
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': trail.colour,
      'line-width': 8
    }
  })

  map.addLayer({
    id: `${trail.name}_symbols`,
    type: 'symbol',
    source: trail.id,
    layout: {
      'symbol-placement': 'line',
      'text-field': trail.name
    },
    paint: {
      'text-halo-color': '#fff',
      'text-halo-width': 2
    }
  })
}

function Mapbox(props) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

  const query = gql`
    query Map {
      trails {
        name
        trailCoords
        id
        colour
      }
      map {
        centreCoords
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

    const centre = CoordPair.fromString(data?.map?.centreCoords).toInvArray()
    const zoom = data?.map?.zoom
    const scaledZoom = zoom - Math.log2(992 / mapContainer.current.clientWidth) // scale relative to 992 pixels (full map width)
    const trails = data?.trails

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: centre,
      zoom: scaledZoom,
      attributionControl: false,
      minZoom: scaledZoom
    })

    map.current.addControl(new ExitControl(), 'top-right')
    map.current.addControl(
      new CustomGeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-left'
    )
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left')

    map.current.on('load', () => trails.forEach(trail => addLayers(trail, map.current)))
    map.current.resize()
  }, [data])

  return <div ref={mapContainer} className="w-full h-full"></div>
}

class CustomGeolocateControl extends GeolocateControl {
  _setupUI(supported) {
    super._setupUI(supported)
    this._geolocateButton.classList.add('geolocate-button')
    this._geolocateButton.appendChild(document.createTextNode('Enable Geolocation'))
  }
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
    window.location.href = '/trails'
  }
}

function Map() {
  // disable scrolling on the map
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="w-screen" style={{height: window.innerHeight}}>
      <Mapbox />
    </div>
  )
}

export default Map

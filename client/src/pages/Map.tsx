import mapboxgl from 'mapbox-gl'
import {useEffect, useRef} from 'react'
import {useQuery, gql} from '@apollo/client'
import 'mapbox-gl/dist/mapbox-gl.css'

import {CustomGeolocateControl, ExitControl} from '../utils/mapbox_controls'
import {CoordPair} from '../utils/coordinates'
import {TrailType} from './Trails'

export default function Map() {
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

const toCoordArray = (coords: string) => {
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

const buildGeoJson = (trail: TrailType): GeoJSON.Feature<GeoJSON.Geometry> => ({
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: toCoordArray(trail.trailCoords) as GeoJSON.Position[]
  },
  properties: {
    name: trail.name,
    description: trail.name
  }
})

const addLayers = (trail: TrailType, map: mapboxgl.Map) => {
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

function Mapbox() {
  mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN

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

  interface MapData {
    trails: TrailType[]
    map: {
      centreCoords: string
      zoom: number
    }
  }

  const {data} = useQuery<MapData>(query)

  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)

  useEffect(() => {
    if (map.current || !data) {
      return
    }

    const centre = CoordPair.fromString(data?.map?.centreCoords).toInvArray()
    const zoom = data?.map?.zoom
    // scale relative to 992 pixels (full map width)
    const scaledZoom = zoom - Math.log2(992 / mapContainer.current!.clientWidth)
    const trails = data?.trails

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
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

import mapboxgl from 'mapbox-gl'
import {useEffect, useRef, useState} from 'react'

import Page from '../components/Page'
import placeholderMap from '../assets/images/Temp_Map.jpg'
import 'mapbox-gl/dist/mapbox-gl.css'

function Map() {
  return (
    <Page name="Map">
      <div>
        <Mapbox />
      </div>
    </Page>
  )
}

function Mapbox() {
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

  const [zoom, setZoom] = useState(15)

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
      maxBounds: bounds
    })
    map.current.resize()
    map.current.addControl(new mapboxgl.FullscreenControl())
  }, [])

  return <div ref={mapContainer} className="w-full aspect-video"></div>
}

export default Map

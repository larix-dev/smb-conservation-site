import {DocumentRenderer} from '@keystone-6/document-renderer'
import {FaMap} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useQuery, gql} from '@apollo/client'

import Page from '../components/Page'

function Map() {

  const query = gql`
    query Query {
      map {
        latitudeDeg
        latitudeMin
        latitudeSec
        longitudeDeg
        longitudeMin
        longitudeSec
        zoom
      }
    }`

  const {loading, error, data} = useQuery(query)

  if (loading || error || !data) {
    return null
  }
// coordinates should be converted to decimal for the mapbox url
  const lon = (data.map.longitudeDeg + data.map.longitudeMin / 60 + data.map.longitudeSec / 3600) * -1 
  const lat = data.map.latitudeDeg + data.map.latitudeMin / 60 + data.map.latitudeSec / 3600
  const zoom = data.map.zoom 

  // this should be built based on the CMS. see https://docs.mapbox.com/api/maps/static-images/
  const mapSrc =
    `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/${lon},${lat},${zoom},0/600x400@2x?access_token=pk.eyJ1IjoiZ3JvdXBmIiwiYSI6ImNsbnhsYWV1dDBoaXEybW8zMzRka3c0eWsifQ.cVCT0voobYso8dwg8t6ufQ`

  return (
    <Page name="Conservation Site Map">
      <div className="flex flex-col gap-8">
      {/* Add this in once the AboutMap item is added to the CMS
      <DocumentRenderer document={document} /> */}
      <Link to="/interactive-map" className="cta-button">
        <FaMap className="inline" />
        &nbsp;Go to the Interactive Map
      </Link>
      <img src={mapSrc} alt="Conservation Site Map" />
      </div>
    </Page>
  )
}

export default Map

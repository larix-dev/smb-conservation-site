import {DocumentRenderer} from '@keystone-6/document-renderer'
import {FaMap} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useQuery, gql} from '@apollo/client'

import Page from '../components/Page'

function Map() {

  const query = gql`
    query Query {
      map {
        content {
          document
        }
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
  const lon = (data.map.longitudeDeg + data.map.longitudeMin / 60 + data.map.longitudeSec / 3600) * -1 //multiplied by -1 since we are in the west
  const lat = data.map.latitudeDeg + data.map.latitudeMin / 60 + data.map.latitudeSec / 3600 //not neegative since we are in the north
  const zoom = data.map.zoom 

  const document = data.map.content.document

  // this should be built based on the CMS. see https://docs.mapbox.com/api/maps/static-images/
  const mapSrc =
    `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/${lon},${lat},${zoom},0/600x400@2x?access_token=pk.eyJ1IjoiZ3JvdXBmIiwiYSI6ImNsbnhsYWV1dDBoaXEybW8zMzRka3c0eWsifQ.cVCT0voobYso8dwg8t6ufQ`

  return (
    <Page name="Conservation Site Map">
      <div className="flex flex-col gap-8">
      <DocumentRenderer document={document} />
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

import {DocumentRenderer} from '@keystone-6/document-renderer'
import {FaMap} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useQuery, gql} from '@apollo/client'

import Page from '../components/Page'
import Mapbox from '../components/Mapbox'

function Map() {
  const query = gql`
    query Map {
      map {
        content {
          document
        }
      }
    }
  `

  const {data} = useQuery(query)

  if (!data) {
    return null
  }

  const document = data?.map?.content.document

  return (
    <Page name="Conservation Site Map">
      <div className="flex flex-col gap-8">
        <DocumentRenderer document={document} />
        <Link to="/interactive-map" className="cta-button">
          <FaMap className="inline" />
          &nbsp;Go to the Interactive Map
        </Link>
        <div className="aspect-video">
          <Mapbox interactive={false} />
        </div>
      </div>
    </Page>
  )
}

export default Map

import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'
import {useParams} from 'react-router-dom'
import {FaScroll, FaLeaf, FaPaw, FaInfoCircle} from 'react-icons/fa'
import {GiMushroomGills} from 'react-icons/gi'

import {getStatusInfo} from '../utils/status-info'

import Page from '../components/Page'

function Organism() {
  const {id} = useParams()

  const query = gql`
    query Query($where: OrganismWhereInput!) {
      organisms(where: $where, take: 1) {
        name
        scientificName
        type
        conservationStatus
        image {
          url
        }
        description {
          document
        }
      }
    }
  `

  const {data, loading} = useQuery(query, {
    variables: {where: {urlId: {equals: id}}}
  })

  if (loading) {
    return null
  }

  const organism = data?.organisms[0] || {}
  const {name, scientificName, type, conservationStatus, image, description} = organism

  const statusInfo = getStatusInfo(conservationStatus)

  const typeIcons = {
    Flora: <FaLeaf className="inline" />,
    Fauna: <FaPaw className="inline" />,
    Fungi: <GiMushroomGills className="inline" />
  }

  return (
    <Page name={`${name}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 prose">
          <div className="font-bold">
            <FaScroll className="inline" />
            &nbsp;Scientific Name: <span className="italic">{scientificName}</span>
          </div>
          <div>
            {typeIcons[type]}&nbsp;Organism Type: {type}
          </div>
          <div>
            <FaInfoCircle className="inline" />
            &nbsp;Conservation Status: <span className={`font-bold ${statusInfo.class}`}>{statusInfo.label}</span>
          </div>
          <DocumentRenderer document={description.document} />
        </div>
        <div className="flex-1">
          <img src={image.url} alt={name} />
        </div>
      </div>
    </Page>
  )
}

export default Organism

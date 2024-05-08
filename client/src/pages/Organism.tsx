import {ReactElement} from 'react'
import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'
import {Link, useParams} from 'react-router-dom'
import {FaScroll, FaLeaf, FaPaw, FaInfoCircle} from 'react-icons/fa'
import {GiMushroomGills} from 'react-icons/gi'

import Page from '../components/Page'

export interface StatusInfo {
  label: string
  class: string
}

const statusInfo: {[key: string]: StatusInfo} = {
  NC: {label: 'Not Classified', class: 'text-stone-600'},
  LC: {label: 'Least Concern', class: 'text-green-600'},
  NT: {label: 'Near Threatened', class: 'text-lime-600'},
  VU: {label: 'Vulnerable', class: 'text-yellow-600'},
  EN: {label: 'Endangered', class: 'text-amber-600'},
  CE: {label: 'Critically Endangered', class: 'text-orange-600'},
  EW: {label: 'Extinct in the Wild', class: 'text-red-600'},
  EX: {label: 'Extinct', class: 'text-red-800'}
}

export const getStatusInfo = (status: string): StatusInfo => {
  return statusInfo[status]
}

export interface OrganismType {
  name: string
  scientificName: string
  type: string
  conservationStatus: string
  urlId: string
  image: {
    url: string
  }
  description: any
}

export default function Organism() {
  const {id} = useParams<string>()

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

  const {data, loading} = useQuery<{organisms: OrganismType[]}>(query, {
    variables: {where: {urlId: {equals: id}}}
  })

  if (loading) {
    return null
  }

  const organism = data?.organisms[0]
  const {name, scientificName, type, conservationStatus, image, description} = organism!

  const statusInfo = getStatusInfo(conservationStatus)

  const typeIcons: {[key: string]: ReactElement} = {
    Flora: <FaLeaf className="inline" />,
    Fauna: <FaPaw className="inline" />,
    Fungi: <GiMushroomGills className="inline" />
  }

  return (
    <Page name={`${name}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 prose">
          <div className="mb-4">
            <Link className="text-blue-600 font-bold no-underline hover:underline" to={`/ecosystem`}>
              &lsaquo; Back to Ecosystem
            </Link>
          </div>
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

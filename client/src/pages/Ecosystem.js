import {useState} from 'react'
import {gql, useQuery} from '@apollo/client'
import {Link} from 'react-router-dom'

import {getStatusInfo} from '../utils/status-info'

import Page from '../components/Page'
import Filter from '../components/Filter'

function Ecosystem() {
  const [filter, setFilter] = useState(null)

  const query = gql`
    query Query {
      organisms {
        name
        scientificName
        type
        urlId
        conservationStatus
        image {
          url
        }
      }
    }
  `

  const {data} = useQuery(query)
  const organisms = data?.organisms || []

  return (
    <Page name="Ecosystem">
      <div className="mb-4">Placeholder text</div>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <Filter tag="Flora" filter={filter} callback={filter => setFilter(filter)} />
        <Filter tag="Fauna" filter={filter} callback={filter => setFilter(filter)} />
        <Filter tag="Fungi" filter={filter} callback={filter => setFilter(filter)} />
      </div>
      <div className="columns-xs gap-4">
        {organisms
          .filter(organism => filter === null || organism.type === filter)
          .map((organism, i) => (
            <EcosystemItem key={i} organism={organism} filter={filter} />
          ))}
      </div>
    </Page>
  )
}

function EcosystemItem(props) {
  const {name, scientificName, type, urlId, conservationStatus, image} = props.organism

  const statusInfo = getStatusInfo(conservationStatus)

  return (
    <div
      key={props.filter}
      className="flex flex-col mb-4 break-inside-avoid bg-stone-300 rounded overflow-hidden animate-expand"
    >
      <img src={image.url} alt={name} />
      <div className="px-2 py-4 prose">
        <div className="bg-stone-400 rounded px-1 text-xs w-fit">{type}</div>
        <div className="text-md hyphens-auto break-words">
          <span className="font-bold">{name}</span> (<span className="italic">{scientificName}</span>)
        </div>
        <div className="text-sm">
          Conservation Status:
          <span className={`font-bold ${statusInfo.class}`}>&nbsp;{statusInfo.label}</span>
        </div>
        <Link className="text-blue-600 font-bold no-underline hover:underline" to={`/ecosystem/${urlId}`}>
          Learn More &rsaquo;
        </Link>
      </div>
    </div>
  )
}

export default Ecosystem

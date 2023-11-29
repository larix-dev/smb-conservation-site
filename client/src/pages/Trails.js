import {gql, useQuery} from '@apollo/client'
import {Link} from 'react-router-dom'
import {FaArrowsUpDown, FaArrowsLeftRight, FaChartSimple} from 'react-icons/fa6'

import Page from '../components/Page'
import Document from '../components/Document'

function Trails() {
  const query = gql`
    query Query {
      trailPage {
        content {
          document
        }
      }
      trails {
        name
        image {
          url
        }
        length
        elevationGain
        difficulty
        description {
          document
        }
      }
    }
  `

  const {data} = useQuery(query)
  const document = data?.trailPage?.content.document
  const trails = data?.trails || []

  return (
    <Page name="Trails and Interactive Map">
      <div className="flex flex-col gap-8">
        <div>
          <div className="prose mb-4 max-w-none">
            <Document document={document} />
          </div>
          <Link className="text-blue-600 font-bold hover:underline" to="/map">
            Launch The Interactive Trail Map &rsaquo;
          </Link>
        </div>
        <div className="flex flex-col gap-8">
          {trails.map((trail, i) => (
            <TrailInfo key={i} trail={trail} />
          ))}
        </div>
      </div>
    </Page>
  )
}

function TrailInfo(props) {
  const {name, image, length, elevationGain, difficulty, description} = props.trail

  const difficultyInfo = {
    E: {label: 'Easy', class: 'text-green-600'},
    M: {label: 'Moderate', class: 'text-amber-600'},
    D: {label: 'Difficult', class: 'text-red-600'}
  }

  const diff = difficultyInfo[difficulty]

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="basis-1/3">
        <img src={image.url} alt={name} />
      </div>
      <div className="basis-2/3 flex flex-col gap-4">
        <div className="font-bold text-xl">{name}</div>
        <div className="flex gap-4">
          <div>
            <FaArrowsLeftRight className="inline" />
            &nbsp;Length: {length} km
          </div>
          <div>
            <FaArrowsUpDown className="inline" />
            &nbsp;Elevation Gain: {elevationGain} m
          </div>
          <div>
            <FaChartSimple className="inline" />
            &nbsp;Difficulty: <span className={diff.class}>{diff.label}</span>
          </div>
        </div>
        <Document document={description.document} />
      </div>
    </div>
  )
}

export default Trails

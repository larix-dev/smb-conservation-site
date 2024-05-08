import {useQuery, gql} from '@apollo/client'

import Document from '../components/Document'
import Page from '../components/Page'

import forest from '../assets/images/about.jpg'

export default function About() {
  const query = gql`
    query Query {
      about {
        content {
          document
        }
      }
    }
  `

  const {data} = useQuery(query)
  const document = data?.about?.content.document

  return (
    <Page name="About Us">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 prose">
          <Document document={document} />
        </div>
        <div className="flex-1">
          <img className="w-full" src={forest} alt="Forest" />
        </div>
      </div>
    </Page>
  )
}

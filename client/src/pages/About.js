import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'

import Page from '../components/Page'

import forest from '../assets/images/about.jpg'

function About() {
  const query = gql`
    query Query {
      about {
        content {
          document
        }
      }
    }
  `
  const {loading, error, data} = useQuery(query)

  if (loading || error || !data) {
    return null
  }

  const document = data.about.content.document

  return (
    <Page name="About Us">
      <div className="flex gap-8">
        <div className="flex-1 prose">
          <DocumentRenderer document={document} />
        </div>
        <div className="flex-1">
          <img src={forest} alt="Forest" />
        </div>
      </div>
    </Page>
  )
}

export default About

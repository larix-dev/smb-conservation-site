import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'

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

  if(loading || error) {
    return null
  }

  const document = data.about.content.document

  return (
    <div>
      <DocumentRenderer document={document} />
    </div>
  )
}

export default About
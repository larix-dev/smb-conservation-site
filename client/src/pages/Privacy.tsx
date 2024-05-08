import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'

import Page from '../components/Page'

export default function Privacy() {
  const query = gql`
    query Privacy {
      privacy {
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

  const document = data?.privacy?.content.document

  return (
    <Page name="Privacy Policy">
      <div className="prose max-w-none">
        <DocumentRenderer document={document} />
      </div>
    </Page>
  )
}

import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'

import Page from '../components/Page'

function Disclaimer() {
  const query = gql`
    query Disclaimer {
      disclaimer {
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

  const document = data.disclaimer.content.document

  return (
    <Page name="Disclaimer">
      <div prose max-w-none>
        <DocumentRenderer document={document} />
      </div>
    </Page>
  )
}

export default Disclaimer

import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'

import Page from '../components/Page'

function ProductsServices() {
  const query = gql`
    query Query {
      productservices(where: {available: {equals: true}}) {
        title
        image
        description
      }
    }
  `
  const {loading, error, data} = useQuery(query)

  if (loading || error || !data) {
    return null
  }

  const document = data.ProductsServices

  return (
    <Page name="Products and Services">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 prose">
          <DocumentRenderer document={document} />
        </div>
      </div>
    </Page>
  )
}

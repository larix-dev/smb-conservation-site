import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'
import { useParams } from 'react-router-dom'
import Page from '../components/Page'

function ProductInfo() {
  const item = useParams()
  
  const query = gql`
  query Query($item: String!) {
    product(filter: { title: { eq: $item } }) {
       title
       image {
        url
       }
       description {
        document
       }
    }
   }
   `
  const {loading, error, data} = useQuery(query, {
    variables: { item },
  })

  if (loading || error || !data) {
    return null
  }

  const document = data.product.description.document

  return (
    <Page name="ProductInfo">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 prose">
          <DocumentRenderer document={document} />
        </div>
        <div className="flex-1">
          <img src={data.products.image.url} alt={data.products.title} />
        </div>
      </div>
    </Page>
  )
}
export default ProductInfo
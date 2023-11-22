import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'
import {useParams} from 'react-router-dom'
import Page from '../components/Page'

function ProductInfo() {
  const {itemId} = useParams()

  const query = gql`
    query Product($where: ProductWhereUniqueInput!) {
      product(where: $where) {
        id
        title
        isService
        image {
          url
        }
        origin
        description {
          document
        }
      }
    }
  `

  const {loading, error, data} = useQuery(query, {
    variables: {where: {id: itemId}}
  })

  if (loading || error || !data) {
    return null
  }

  const document = data?.product?.description.document
  const {title, isService, image, origin} = data?.product

  return (
    <Page name={title}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 prose">
          {!isService && <div className="font-bold">Product Origin: {origin}</div>}
          <DocumentRenderer document={document} />
        </div>
        <div className="flex-1">
          <img src={image.url} alt={title} />
        </div>
      </div>
    </Page>
  )
}
export default ProductInfo

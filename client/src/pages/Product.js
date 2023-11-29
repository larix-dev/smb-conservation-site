import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'
import {useParams} from 'react-router-dom'
import Page from '../components/Page'

function Product() {
  const {id} = useParams()

  const query = gql`
    query Products($where: ProductWhereInput!) {
      products(where: $where, take: 1) {
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
    variables: {where: {urlId: {equals: id}}}
  })

  if (loading || error || !data) {
    return null
  }

  const product = data?.products[0]
  const {title, isService, image, origin, description} = product

  return (
    <Page name={title}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 prose">
          {!isService && <div className="font-bold">Product Origin: {origin}</div>}
          <DocumentRenderer document={description.document} />
        </div>
        <div className="flex-1">
          <img src={image.url} alt={title} />
        </div>
      </div>
    </Page>
  )
}

export default Product

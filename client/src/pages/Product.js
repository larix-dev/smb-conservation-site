import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'
import {Link, useParams} from 'react-router-dom'
import {FaMapPin} from 'react-icons/fa'

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
        source
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
  const {title, isService, image, source, description} = product

  return (
    <Page name={title}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 prose">
          <div className="mb-4">
            <Link className="text-blue-600 font-bold no-underline hover:underline" to={`/products-services`}>
              &lsaquo; Back to Products & Services
            </Link>
          </div>
          {!isService && (
            <div className="font-bold">
              <FaMapPin className="inline" />
              &nbsp;Source: {source}
            </div>
          )}
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

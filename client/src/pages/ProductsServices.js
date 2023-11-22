import {useQuery, gql} from '@apollo/client'
import {Link} from 'react-router-dom'
import Page from '../components/Page'
import {DocumentRenderer} from '@keystone-6/document-renderer'

function ProductsServices() {
  const query = gql`
    query Query {
      products {
        id
        title
        image {
          url
        }
      }
      productsServicesPage {
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

  const document = data?.productsServicesPage?.content.document

  return (
    <Page name="Products and Services">
      <div className="flex flex-col gap-4">
        <DocumentRenderer document={document} />
        <div className="font-bold text-lg">Our current offerings</div>
        <div className="columns-xs gap-4">
          {data.products.map((product, i) => (
            <Product key={i} product={product} />
          ))}
        </div>
      </div>
    </Page>
  )
}

function Product(props) {
  const {id, title, image} = props.product
  return (
    <div className="flex flex-col mb-4 break-inside-avoid bg-stone-300 rounded overflow-hidden">
      <Link className="text-lg font-bold" to={`/product-info/${id}`}>
        <img src={image.url} alt={title} />
        <div className="p-2">{title}</div>
      </Link>
    </div>
  )
}

export default ProductsServices

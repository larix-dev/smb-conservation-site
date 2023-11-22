import {useQuery, gql} from '@apollo/client'
import {Link} from 'react-router-dom'
import Page from '../components/Page'
import {DocumentRenderer} from '@keystone-6/document-renderer'

function ProductsServices() {
  const query = gql`
    query Query {
      products {
        urlId
        title
        origin
        isService
        image {
          url
        }
        description {
          document
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
        <div className="flex flex-col gap-8">
          {data.products.map((product, i) => (
            <Product key={i} product={product} />
          ))}
        </div>
      </div>
    </Page>
  )
}

function Product(props) {
  const {urlId, title, image, description, isService, origin} = props.product

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="basis-1/3">
        <img src={image.url} alt={title} />
      </div>
      <div className="basis-2/3 flex flex-col gap-4">
        <div className="font-bold text-xl">{title}</div>
        {!isService && <div className="font-bold">Product Origin: {origin}</div>}
        <DocumentRenderer document={[description.document[0]]} />
        <Link className="text-blue-600 font-bold hover:underline" to={`/products-services/${urlId}`}>
          Learn More &rsaquo;
        </Link>
      </div>
    </div>
  )
}

export default ProductsServices
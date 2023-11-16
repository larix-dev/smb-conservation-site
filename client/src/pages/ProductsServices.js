import {useQuery, gql} from '@apollo/client'
import {Link} from 'react-router-dom'
import Page from '../components/Page'

function ProductsServices() {

  const query = gql`
  query Query {
    products {
      previewImage {
        url
      }
      title
    }
  }
  `
  const {loading, error, data} = useQuery(query)

  if (loading || error || !data) {
    return null
  }

  return (
    <Page name="Products and Services">
      <div className="columns-xs gap-4">
        {data.products.map((product, i) => (
            <Product key={i} url={product.previewImage.url} title={product.title} />
          ))}
      </div>
    </Page>
  )
}
function Product(props) {
  return (
    <div className="flex flex-col mb-4 break-inside-avoid bg-stone-300 rounded overflow-hidden">
      <img src={props.url} alt={props.title} />
      <div className="p-2">
        <Link className="text-lg font-bold" to={"/products-services"}>{props.title}</Link>
      </div>
    </div>
  )
}
export default ProductsServices
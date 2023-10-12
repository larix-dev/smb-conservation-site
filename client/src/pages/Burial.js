import {DocumentRenderer} from '@keystone-6/document-renderer'
import {Link} from 'react-router-dom'
import {HiSparkles} from 'react-icons/hi2'
import {useQuery, gql} from '@apollo/client'

import Page from '../components/Page'

function Burial() {
  const query = gql`
  query Query {
    Burial {
      content {
        document
      }
    }
  }
  `

  const {loading, error, data} = useQuery(query)

  if (loading || error) {
    return null
  }

  const document = data.about_Burial.content.document


    return (
      <Page name="Green Burial: Resting in Nature's Embrace">
      <div className="flex gap-8">
        <div className="flex-1 prose">
          <DocumentRenderer document={document} />
          <div className="inline" >
          <Link to="home" className="accent-button">
            Learn More&nbsp;
            <HiSparkles className="inline" />
          </Link>
          <Link to="home" className="accent-button">
            Login&nbsp;
          </Link>
          </div>
        </div>
      </div>
    </Page>
    )
  }
  
  export default Burial
  
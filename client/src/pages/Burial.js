import {DocumentRenderer} from '@keystone-6/document-renderer'
import Signup from '../components/Signup'
import {useQuery, gql} from '@apollo/client'

import Page from '../components/Page'

import burial from '../assets/images/burial.jpg'

function Burial() {
  const query = gql`
    query Query {
      burial {
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

  const document = data.burial.content.document

  return (
    <Page name="Green Burial: Resting in Nature's Embrace">
      <div className="flex flex-col gap-8">
        <div className="prose max-w-none">
          <DocumentRenderer document={document} />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <img src={burial} alt="Burial" />
          </div>
          <div className="flex-1 bg-stone-300 p-4">
            <div className="text-2xl lg:text-4xl tracking-tight font-bold mb-4">Get In Touch</div>
            <Signup />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Burial

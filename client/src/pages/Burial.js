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

  if (loading || error) {
    return null
  }

  const document = data.burial.content.document

  return (
    <Page name="Green Burial: Resting in Nature's Embrace">
      <div className="prose w-full">
      <DocumentRenderer document={document} />
      </div>
      <div className="flex gap-8">
        <div className="flex-1 prose">
          <div className="inline">
            <div className="flex-1">
              <img src={burial} alt="Burial" />
              <div>
                <h1 className="text-2xl lg:text-4xl tracking-tight font-bold mb-4">Inquery form:</h1>
                <Signup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Burial

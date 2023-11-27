import {DocumentRenderer} from '@keystone-6/document-renderer'

function Document(props) {
  if (!props.document) {
    return <div className="text-sm text-center">This document does not exist</div>
  } else {
    return <DocumentRenderer document={props.document} />
  }
}

export default Document

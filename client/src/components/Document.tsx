import {DocumentRenderer, DocumentRendererProps} from '@keystone-6/document-renderer'

export default function Document(props: DocumentRendererProps) {
  if (!props.document) {
    return <div className="text-sm text-center">This document does not exist</div>
  } else {
    return <DocumentRenderer document={props.document} />
  }
}

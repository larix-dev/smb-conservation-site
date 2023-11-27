import Page from './Page'

function MessagePage(props) {
  return (
    <Page name={props.name}>
      <div className="bg-stone-300 text-center p-2">{props.children}</div>
    </Page>
  )
}

export default MessagePage

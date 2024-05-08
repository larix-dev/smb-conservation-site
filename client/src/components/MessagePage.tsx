import {PropsWithChildren} from 'react'

import Page from './Page'

export default function MessagePage(props: PropsWithChildren<{name: string}>) {
  return (
    <Page name={props.name}>
      <div className="bg-stone-300 text-center p-2">{props.children}</div>
    </Page>
  )
}

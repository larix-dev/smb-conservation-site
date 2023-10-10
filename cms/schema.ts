import {list} from '@keystone-6/core'
import {allowAll} from '@keystone-6/core/access'
import {text, relationship, password, timestamp, select, checkbox} from '@keystone-6/core/fields'
import {document} from '@keystone-6/fields-document'

import type {Lists} from '.keystone/types'

export const lists: Lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({validation: {isRequired: true}}),
      email: text({
        validation: {isRequired: true},
        isIndexed: 'unique'
      }),
      password: password({validation: {isRequired: true}}),
      createdAt: timestamp({
        defaultValue: {kind: 'now'}
      }),
      idAdmin: checkbox()
    }
  }),
  Announcement: list({
    access: allowAll,
    fields: {
      text: text({validation: {isRequired: true}}),
      color: select({
        options: [
          {label: 'Red', value: 'r'},
          {label: 'Green', value: 'g'},
          {label: 'Blue', value: 'b'},
          {label: 'Orange', value: 'o'},
          {label: 'Yellow', value: 'y'},
          {label: 'Violet', value: 'v'}
        ]
      }),
      enabled: checkbox()
    }
  }),
  About: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      content: document({
        formatting: true
      })
    }
  })
}

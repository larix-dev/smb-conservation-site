import {list} from '@keystone-6/core'
import {allowAll} from '@keystone-6/core/access'
import {text, password, timestamp, select, checkbox, image, relationship} from '@keystone-6/core/fields'
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
      isAdmin: checkbox()
    }
  }),
  Announcement: list({
    access: allowAll,
    fields: {
      text: text({validation: {isRequired: true}}),
      colour: select({
        type: 'string',
        options: [
          {label: 'Red', value: 'red'},
          {label: 'Orange', value: 'orange'},
          {label: 'Yellow', value: 'yellow'},
          {label: 'Green', value: 'green'},
          {label: 'Blue', value: 'blue'},
          {label: 'Violet', value: 'violet'}
        ],
        defaultValue: 'blue',
        validation: {isRequired: true}
      }),
      active: checkbox({defaultValue: true})
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
  }),
  ProductCategory: list({
    access: allowAll,
    fields: {
      title: text({validation: {isRequired: true}}),
      tags: relationship({ref: 'Product', many: true})
      
  }}),
  Product: list({
    access: allowAll,
    fields: {
      title: text({validation: {isRequired: true}}),
      image: image({ storage: 'local_images' }),
      description: text({validation: {isRequired: true}}),
      available: checkbox({defaultValue: true})
  }})
}

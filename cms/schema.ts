import {list, group} from '@keystone-6/core'
import {allowAll} from '@keystone-6/core/access'
import {relationship, image, text, password, timestamp, select, checkbox, calendarDay} from '@keystone-6/core/fields'
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
  Burial: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      image: image({storage: 'localImages'}),
      content: document({
        formatting: true
      })
    }
  }),
  Feedback: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      image: image({storage: 'localImages'}),
      content: document({
        formatting: true
      })
    }
  }),
  Footer: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      address: text({
        validation: {
          isRequired: true
        },
        ui: {
          displayMode: 'textarea'
        }
      }),
      phone: text({validation: {isRequired: true}}),
      ...group({
        label: 'Instagram',
        fields: {
          instagramHandle: text({validation: {isRequired: true}})
        }
      }),
      ...group({
        label: 'Facebook',
        fields: {
          facebookHandle: text({validation: {isRequired: true}})
        }
      })
    }
  }),
  GalleryTag: list({
    access: allowAll,
    fields: {
      tagName: text({validation: {isRequired: true}})
    }
  }),
  GalleryImage: list({
    access: allowAll,
    fields: {
      image: image({storage: 'localImages'}),
      caption: text({validation: {isRequired: true, length: {max: 100}}}),
      author: text({validation: {isRequired: true}}),
      dateTaken: calendarDay({validation: {isRequired: true}}),
      tags: relationship({
        ref: 'GalleryTag',
        many: true,
        ui: {
          labelField: 'tagName'
        }
      })
    }
  }),
  Privacy: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      content: document({
        formatting: true
      })
    }
  }),
  Disclaimer: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      content: document({
        formatting: true
      })
    }
  })
}

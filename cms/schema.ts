import {list, group} from '@keystone-6/core'
import {allowAll} from '@keystone-6/core/access'
import {relationship, image, calendarDay, text, password, timestamp, select, checkbox, integer, json} from '@keystone-6/core/fields'
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
      content: document({
        formatting: true
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
  Map: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      content: document({
        formatting: true
      }),
      ...group({
        label: 'Map Centre Coordinates',
        fields: {
          latitude: text({
            validation: {
              isRequired: true,
              match: {
                regex: /^([0-8]?\d|90)\:(0\d|[1-5]\d|60)\:(0\d|[1-5]\d|60)(\.\d{1,3})?[NS]$/,
                explanation: 'Latitude coordinate must be in DMS format e.g. 44:48:54.123N'
              }
            }
          }),
          longitude: text({
            validation: {
              isRequired: true,
              match: {
                regex: /^(\d{1,2}|1[0-7][0-9]|180)\:(0\d|[1-5]\d|60)\:(0\d|[1-5]\d|60)(\.\d{1,3})?[EW]$/,
                explanation: 'Longitude coordinate must be in DMS format e.g. 63:38:18.123W'
              }
            }
          })
        }
      }),
      trailCoordsTest: text({
        ui: {
          displayMode: 'textarea',
          description: 'Coordinates representing a trail. Each set of coordinates should be on a new line.'
        },
        validation: {
          isRequired: true,
         
        }
      }),
      zoom: integer({validation: {isRequired: true}})
    }
  })
}

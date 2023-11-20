import {list, group} from '@keystone-6/core'
import {allowAll} from '@keystone-6/core/access'
import {
  relationship,
  image,
  calendarDay,
  text,
  password,
  timestamp,
  select,
  checkbox,
  integer
} from '@keystone-6/core/fields'
import {document} from '@keystone-6/fields-document'

import type {Lists} from '.keystone/types'

const latitudeRegex = new RegExp(/([0-8]?\d|90)\:(0\d|[1-5]\d|60)\:(0\d|[1-5]\d|60)(\.\d{1,3})?[NS]/)
const longitudeRegex = new RegExp(/(\d{1,2}|1[0-7][0-9]|180)\:(0\d|[1-5]\d|60)\:(0\d|[1-5]\d|60)(\.\d{1,3})?[EW]/)
const trailList =
  /^(([0-8]?\d|90)\:(0\d|[1-5]\d|60)\:(0\d|[1-5]\d|60)(\.\d{1,3})?[NS]\, (\d{1,2}|1[0-7][0-9]|180)\:(0\d|[1-5]\d|60)\:(0\d|[1-5]\d|60)(\.\d{1,3})?[EW]\n?)*$/
//const trailList = new RegExp(`(${latitudeRegex.source}, ${longitudeRegex.source}\n)+`)
console.log(trailList)
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
                regex: latitudeRegex,
                explanation: 'Latitude coordinate must be in DMS format e.g. 44:48:54.123N'
              }
            }
          }),
          longitude: text({
            validation: {
              isRequired: true,
              match: {
                regex: longitudeRegex,
                explanation: 'Longitude coordinate must be in DMS format e.g. 63:38:18.123W'
              }
            }
          })
        }
      }),
      zoom: integer({validation: {isRequired: true}})
    }
  }),
  Trail: list({
    access: allowAll,
    fields: {
      name: text({validation: {isRequired: true}}),
      trailCoords: text({
        ui: {
          displayMode: 'textarea',
          description:
            'Coordinates representing a trail. Each set of coordinates should be on a new line. Must include at least 2 coordinates.'
        },
        validation: {
          isRequired: true,
          match: {
            regex: trailList,
            explanation:
              'Coordinates must be given in DMS format, each on their own line. Example coordinate: 44:37:54.004N, 63:34:49.997W'
          }
        }
      }),
      colour: select({
        type: 'string',
        options: [
          {label: 'Red', value: '#dc2626'},
          {label: 'Orange', value: '#f97316'},
          {label: 'Yellow', value: '#eab308'},
          {label: 'Green', value: '#22c55e'},
          {label: 'Blue', value: '#3b82f6'},
          {label: 'Violet', value: '#8b5cf6'}
        ],
        defaultValue: 'blue',
        validation: {isRequired: true}
      })
    }
  })
}

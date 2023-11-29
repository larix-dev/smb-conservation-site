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

/* validation regex */
const latRegex = /([0-8]?\d|90)\:(0\d|[1-5]\d|60)\:(0\d|[1-5]\d|60)(\.\d{1,3})?[NS]/
const lngRegex = /(\d{1,2}|1[0-7][0-9]|180)\:(0\d|[1-5]\d|60)\:(0\d|[1-5]\d|60)(\.\d{1,3})?[EW]/
const coordRegex = new RegExp(`^${latRegex.source},\\s*${lngRegex.source}\\s*\\n?$`)
const trailRegex = new RegExp(`^(${latRegex.source},\\s*${lngRegex.source}\\s*\\n?){2,}$`)
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

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
  Map: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      content: document({
        formatting: true
      }),
      centreCoords: text({
        ui: {
          description:
            'Coordinates representing the centre point of the map\n\nCoordinates must be latitude-longitude in DMS format\ni.e. 00:00:00.000N, 00:00:00.000W'
        },
        validation: {
          isRequired: true,
          match: {regex: coordRegex, explanation: 'Coordinate pair must be in valid DMS format (see above)'}
        }
      }),
      zoom: integer({
        ui: {
          description: 'The initial and maximum zoom factor of the map'
        },
        validation: {isRequired: true}
      })
    }
  }),
  Trail: list({
    access: allowAll,
    fields: {
      name: text({
        ui: {
          description: 'Trail name that will be displayed on the map'
        },
        validation: {isRequired: true}
      }),
      trailCoords: text({
        ui: {
          displayMode: 'textarea',
          description:
            'A list of coordinates representing a trail\n\nCoordinates must be latitude-longitude in DMS format\ni.e. 00:00:00.000N, 00:00:00.000W\nEach coordinate pair must be on its own line\nAt least two points are required to create a trail'
        },
        validation: {
          isRequired: true,
          match: {
            regex: trailRegex,
            explanation: 'Coordinate pairs must be in valid DMS format (see above), each on their own line'
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
        defaultValue: '#3b82f6',
        validation: {isRequired: true}
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
  }),
  ProductsServicesPage: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      content: document({
        formatting: true
      })
    }
  }),
  Product: list({
    access: allowAll,
    fields: {
      title: text({validation: {isRequired: true}}),
      urlId: text({
        label: 'URL ID',
        validation: {
          isRequired: true,
          match: {
            regex: /^[a-z\-]*$/,
            explanation: 'URL ID must only contain lowercase letters, hypens, and no spaces'
          }
        }
      }),
      image: image({storage: 'localImages'}),
      isService: checkbox(),
      source: text({ui: {description: 'Not required for services'}}),
      description: document({
        formatting: true,
        ui: {
          description: 'First paragraph is used for the preview'
        }
      })
    }
  }),
  EcosystemPage: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      content: document({
        formatting: true
      })
    }
  }),
  Organism: list({
    access: allowAll,
    fields: {
      name: text({validation: {isRequired: true}}),
      scientificName: text({validation: {isRequired: true}}),
      urlId: text({
        label: 'URL ID',
        validation: {
          isRequired: true,
          match: {
            regex: /^[a-z\-]*$/,
            explanation: 'URL ID must only contain lowercase letters, hypens, and no spaces'
          }
        }
      }),
      type: select({
        type: 'string',
        options: [
          {label: 'Flora', value: 'Flora'},
          {label: 'Fauna', value: 'Fauna'},
          {label: 'Fungi', value: 'Fungi'}
        ],
        validation: {isRequired: true}
      }),
      conservationStatus: select({
        type: 'string',
        options: [
          {label: 'Not Classified', value: 'NC'},
          {label: 'Least Concern', value: 'LC'},
          {label: 'Near Threatened', value: 'NT'},
          {label: 'Vulnerable', value: 'VU'},
          {label: 'Endangered', value: 'EN'},
          {label: 'Critically Endangered', value: 'CE'},
          {label: 'Extinct in the Wild', value: 'EW'},
          {label: 'Extinct', value: 'EX'}
        ],
        defaultValue: 'Unclassified',
        validation: {isRequired: true}
      }),
      image: image({storage: 'localImages'}),
      description: document({
        formatting: true
      })
    }
  }),
  MailRecipient: list({
    access: allowAll,
    fields: {
      name: text({validation: {isRequired: true}}),
      email: text({
        validation: {
          isRequired: true,
          match: {
            regex: emailRegex,
            explanation: 'Must be a valid email'
          }
        }
      })
    }
  })
}

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
  integer,
  float
} from '@keystone-6/core/fields'
import {document} from '@keystone-6/fields-document'

import type {Lists} from '.keystone/types'

/* validation regex */
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
  TrailPage: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      content: document({
        formatting: true
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
      image: image({storage: 'localImages'}),
      length: float({
        validation: {
          isRequired: true
        },
        ui: {
          description: 'Trail length in kilometres'
        }
      }),
      elevationGain: float({
        validation: {
          isRequired: true
        },
        ui: {
          description: 'Trail elevation gain in metres'
        }
      }),
      difficulty: select({
        type: 'string',
        options: [
          {label: 'Easy', value: 'E'},
          {label: 'Moderate', value: 'M'},
          {label: 'Difficult', value: 'D'}
        ],
        validation: {isRequired: true}
      }),
      description: document({
        formatting: true
      }),
      trailCoords: text({
        ui: {
          displayMode: 'textarea',
          description:
            'A list of coordinate pairs representing a trail\n\nCoordinates must be in latitude-longitude order, comma separated, in either\n\u2022 Decimal format e.g. 44.631536, -63.580812\n\u2022 DMS format with any delimiter e.g. 44 37 53.5N, 63 34 50.9W\nEach coordinate pair must be on its own line\nAny invalid coordinates will be removed from the list'
        },
        validation: {
          isRequired: true
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
  Map: list({
    access: allowAll,
    isSingleton: true,
    fields: {
      centreCoords: text({
        ui: {
          description:
            'Coordinate pair representing the centre point of the map\n\nCoordinates must be in latitude-longitude order, comma separated, in either\n\u2022 Decimal format e.g. 44.631536, -63.580812\n\u2022 DMS format with any delimiter e.g. 44 37 53.5N, 63 34 50.9W\nInvalid coordinates will result in the map page displaying a generic error'
        },
        validation: {
          isRequired: true
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

import {config} from '@keystone-6/core'
import {lists} from './schema'
import {withAuth, session} from './auth'
import 'dotenv/config'

import extendApp from './extensions'

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000

const apiUrl = process.env.API_URL || `http://localhost:${port}`

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: process.env.DB_URL!
    },
    lists,
    session,
    storage: {
      localImages: {
        kind: 'local',
        type: 'image',
        generateUrl: path => `${apiUrl}/images${path}`,
        serverRoute: {
          path: '/images'
        },
        storagePath: 'storage/localImages'
      }
    },
    server: {
      cors: {origin: [process.env.CLIENT_URL!], credentials: true},
      port: port,
      extendExpressApp: app => extendApp(app)
    }
  })
)

import {config} from '@keystone-6/core'
import {lists} from './schema'
import {withAuth, session} from './auth'
import 'dotenv/config'

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db'
    },
    lists,
    session,
    server: {
      cors: {origin: [process.env.CLIENT_URL!], credentials: true},
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000
    }
  })
)
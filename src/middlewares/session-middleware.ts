import session from 'express-session'
import MongoStore from 'connect-mongo'
import { type Mongoose } from 'mongoose'
import { wrapExpressMiddleware } from './wrap-express-middleware'

export const sessionMiddleware = (mongoose?: Mongoose) => {
  if (!mongoose) throw new Error('Mongoose instance is required')

  const mongoStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    stringify: false,
  })

  return wrapExpressMiddleware(
    session({
      secret: process.env.SESSION_SECRET || 'dev-secret',
      resave: false,
      saveUninitialized: false,
      store: mongoStore,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
      proxy: true,
    })
  )
}

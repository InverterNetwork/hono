import 'hono'

import type { Session } from 'express-session'
import type { Auth } from './user'

interface ExtendedSession extends Session {
  auth: Auth
}

// Extend the Hono Request type to include the session property
declare module 'hono' {
  interface HonoRequest {
    session: ExtendedSession
  }
}

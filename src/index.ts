import { Hono } from 'hono'
import { ascii_welcome_div } from './ascii-welcome'
import { connectDB } from '@/utils/connect-db'

const app = new Hono()

await connectDB()

// ROUTES
app.get('/', (c) => c.html(ascii_welcome_div))

export default {
  port: 8080,
  fetch: app.fetch,
}

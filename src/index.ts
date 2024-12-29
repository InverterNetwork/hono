import { Hono } from 'hono'

import { Routes } from '@/routes'
import { serveStatic } from 'hono/bun'
import { serveClientHtml, ascii_welcome_div } from './utils'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import mongoose from 'mongoose'
import { MainService } from '@/services'
import { connectDB } from '@/utils'
import { sessionMiddleware } from '@/middlewares'

// Step 1: Initialize Hono
const app = new Hono()
const isDev = process.env.NODE_ENV === 'development'

if (isDev) app.use(logger())

// Step 2: Connect to MongoDB
await connectDB()

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type'],
    credentials: true,
  })
)

// Step 3: Initialize middlewares
app.use(sessionMiddleware(mongoose))

// Step 4: Initialize services
export const mainService = new MainService()

// ROUTES
app.use('/static/*', serveStatic({ root: './' }))

// Create an API group first
const api = app.basePath('/api')
api.get('/', (c) => c.html(ascii_welcome_div))
api.get('/verify', Routes.verify)

// Catch-all route for static files should be last
if (isDev) {
  app.all('/*', serveClientHtml)
} else {
  app.all('/*', serveStatic({ root: './client/dist' }))
  app.all('/*', serveStatic({ path: './client/dist/index.html' }))
}

// Then add the static/client routes - MOVED TO END
export default {
  port: 8080,
  fetch: app.fetch,
}

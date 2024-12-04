import { Hono } from 'hono'
import mongoose from 'mongoose'

import { ascii_welcome_div } from './ascii-welcome'

import { MainService } from '@/services'
import { connectDB } from '@/utils'
import { sessionMiddleware } from '@/middlewares'
import { Routes } from '@/routes'

// Step 1: Initialize Hono
const app = new Hono()

// Step 2: Connect to MongoDB
await connectDB()

// Step 3: Initialize middlewares
app.use(sessionMiddleware(mongoose))

// Step 4: Initialize services
export const mainService = new MainService()

// ROUTES
app.get('/', (c) => c.html(ascii_welcome_div))
app.get('/exemple', Routes.exemple)

export default {
  port: 8080,
  fetch: app.fetch,
}

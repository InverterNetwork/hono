// This File Can Not Contain use server or use client,
// it is meant to be consumed by next.js primitively
// parent folder can contain server or client code

import { connect } from 'mongoose'
import { mongoUri } from './env'

const MONGO_URI = mongoUri()

if (!MONGO_URI || typeof MONGO_URI !== 'string')
  throw new Error('Please add your MongoDB URI to .env')

export async function connectDB(): Promise<void> {
  try {
    await connect(MONGO_URI!, {
      bufferCommands: false,
    })

    console.log('✅ New connection established')
  } catch {
    console.error('❌ Connection to database failed')
  }

  return
}

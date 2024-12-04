import mongoose from 'mongoose'
import { mongoUri } from './env'

const MONGO_URI = mongoUri()

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI!, {
      bufferCommands: false,
    })
    mongoose.connection.bucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db!,
      {
        bucketName: 'images',
      }
    )
    console.log('✅ New connection established')
  } catch (error) {
    console.error('❌ Connection to database failed')
    throw error
  }

  return
}

import { Schema } from 'mongoose'
import { type CacheBase, ECacheStatus, ECacheType } from '@/lib/mongo/types'

export const CacheSchema = new Schema<CacheBase>(
  {
    type: {
      type: String,
      enum: ECacheType,
      required: true,
    },
    status: {
      type: String,
      enum: ECacheStatus,
      default: 'STALE',
    },
  },
  { timestamps: true, discriminatorKey: 'type' }
)

export * from './job-schedule-cache'

import type { JobScheduleCache } from '@/lib/mongo/types'

import { EJobType } from '@/lib/mongo/types'
import { Schema } from 'mongoose'

export const JobScheduleCacheSchema = new Schema<JobScheduleCache>({
  data: {
    jobType: { type: String, enum: EJobType, required: true },
    schedule: { type: String, required: true },
  },
})

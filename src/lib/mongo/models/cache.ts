import { model, models } from 'mongoose'
import { CacheSchema, JobScheduleCacheSchema } from '@/lib/mongo/schemas'
import { ECacheType, type JobScheduleCache } from '@/lib/mongo/types'

const setModels = () => {
  const Base = model('caches', CacheSchema)

  return {
    [ECacheType.JOB_SCHEDULE]: Base.discriminator<JobScheduleCache>(
      ECacheType.JOB_SCHEDULE,
      JobScheduleCacheSchema
    ),
  }
}

if (!models.caches) setModels()

export const CacheModel = {
  [ECacheType.JOB_SCHEDULE]:
    models.caches.discriminators![ECacheType.JOB_SCHEDULE],
} as ReturnType<typeof setModels>

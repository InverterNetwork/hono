import type { CacheBase } from './cache'

export enum EJobType {
  EXEMPLE_JOB = 'EXEMPLE_JOB',
}

export type JobType = keyof typeof EJobType

export interface JobScheduleCache extends CacheBase {
  type: 'JOB_SCHEDULE'
  data: {
    jobType: JobType
    schedule: string
  }
}

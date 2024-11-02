export enum ECacheStatus {
  FRESH = 'FRESH',
  PENDING = 'PENDING',
  STALE = 'STALE',
}

export type CacheStatus = keyof typeof ECacheStatus

export enum ECacheType {
  JOB_SCHEDULE = 'JOB_SCHEDULE',
}

export type CacheType = keyof typeof ECacheType

export interface CacheBase {
  type: CacheType
  status: CacheStatus
  createdAt: Date
  updatedAt: Date
}

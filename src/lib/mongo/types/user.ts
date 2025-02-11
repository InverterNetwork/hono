import type { ApiSecret } from '@/types'

export enum EUserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER = 'SUPER',
}

export type UserRole = keyof typeof EUserRole

export type User = {
  uid: string
  address: string
  username?: string
  role: UserRole
  email?: string
  apiSecrets: ApiSecret[]
  webHookUrl?: string
  createdAt: Date
  updatedAt: Date
}

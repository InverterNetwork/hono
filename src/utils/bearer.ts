import { isNotEmpty } from '@inverter-network/sdk'
import type { Context } from 'hono'

export const getBearerToken = (c: Context) => {
  const token = c.req.header('authorization')?.split(' ')[1]
  return token
}

export const splitBearerToken = (token: string) => {
  const [key, secret] = token.split(':')

  isNotEmpty(key || secret, 'Key or Secret is empty')

  return { key, secret }
}

export const getBearerConfig = (token?: string) => {
  if (!token) throw new Error('No token provided')

  const config: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }

  return config
}

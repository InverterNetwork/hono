import { apiResponse } from '@inverter-network/sdk'
import type { Context } from 'hono'
import { verify } from './verify'

export class Routes {
  static verify(c: Context) {
    return apiResponse(async () => {
      return verify(c)
    })
  }
}

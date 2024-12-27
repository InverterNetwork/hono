import { apiResponse } from '@inverter-network/sdk'
import type { Context } from 'hono'

export class Routes {
  static exemple(c: Context) {
    return apiResponse(async () => {
      return 'Exemple Response'
    })
  }
}

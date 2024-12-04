import type { Context } from 'hono'
import { apiResponse } from '@/utils'

export class Routes {
  static exemple(c: Context) {
    return apiResponse(() => {
      return 'Exemple Response'
    })
  }
}

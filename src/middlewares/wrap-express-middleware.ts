import type { Request, Response, NextFunction } from 'express'
import type { MiddlewareHandler } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'

export const wrapExpressMiddleware = (
  middleware: (req: Request, res: Response, next: NextFunction) => void
): MiddlewareHandler => {
  return async (c, next) => {
    // Clone the original req object to mimic an Express req
    const req = c.req as unknown as Request

    // Ensure req.headers exists
    req.headers = req.headers || {}

    // Convert Hono's cookies into a format Express can understand
    const cookieHeader = Object.entries(getCookie(c))
      .map(([name, value]) => `${name}=${value}`)
      .join('; ')

    // Attach the cookie header to the Express-like request object
    req.headers.cookie = cookieHeader

    // Run the Express middleware
    await new Promise<void>((resolve, reject) => {
      middleware(
        req, // pass the adapted req
        c.res as unknown as Response,
        (err?: any) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })

    // Manually set cookies using Hono's `setCookie`
    const cookies = c.res.headers.get('Set-Cookie')
    if (cookies) {
      ;(Array.isArray(cookies) ? cookies : [cookies]).forEach((cookie) => {
        const [nameValue] = cookie.split('; ')
        const [name, value] = nameValue.split('=')
        setCookie(c, name, value, { path: '/', secure: true, httpOnly: true }) // Customize options based on your needs
      })
    }

    await next()
  }
}

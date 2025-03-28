'use client'

import { getBearerConfig } from '@c/utils'
import type { Auth } from '@/types'
import { getAuthToken, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

export type UseAuthReturnType = ReturnType<typeof useAuth>

export function useAuth() {
  const isLoggedIn = useIsLoggedIn()
  const { isConnected } = useAccount()

  const authQuery = useQuery({
    queryKey: ['auth', isLoggedIn],
    queryFn: async () => {
      const authToken = getAuthToken()
      const config = getBearerConfig(authToken)
      const res = await fetch('/api/verify', config)

      const json = <Auth>await res.json()

      return json
    },
    enabled: isConnected,
    retry: 3,
    refetchOnWindowFocus: false,
  })

  return authQuery
}

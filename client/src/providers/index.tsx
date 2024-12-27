'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { InverterProvider } from './inverter-provider'
import { ConnectorProvider } from './connector-provider'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectorProvider>
        <InverterProvider>
          {/* CHILDREN */}
          {children}
        </InverterProvider>
        <Toaster
          closeButton
          richColors
          position="bottom-right"
          duration={5_000}
        />
      </ConnectorProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

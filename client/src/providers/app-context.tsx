'use client'

import { useAuth, type UseAuthReturnType } from '@c/hooks'
import { createContext, useContext } from 'react'

export type TAppContext = {
  auth: UseAuthReturnType
}

const AppContext = createContext({} as TAppContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth()

  // CONTEXT
  //==============================================
  const contextData: TAppContext = {
    auth,
  }

  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

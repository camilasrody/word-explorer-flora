'use client'

import { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { store } from '@/store'
import { getQueryClient } from '@/lib/queryClient'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { setUser, clearAuth } from '@/store/slices/authSlice'
import { getProfile } from '@/services/user.service'

function AuthInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    getProfile()
      .then((user) => store.dispatch(setUser(user)))
      .catch(() => store.dispatch(clearAuth()))
  }, [])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthInitializer>{children}</AuthInitializer>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  )
}

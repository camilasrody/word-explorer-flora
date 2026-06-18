'use client'

import { useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from './useAuth'
import { useTheme } from '@/contexts/ThemeContext'

export function useNavigation() {
  const pathname = usePathname()
  const { user, signout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleSignout = useCallback(() => signout(), [signout])

  return { pathname, user, theme, toggleTheme, handleSignout }
}

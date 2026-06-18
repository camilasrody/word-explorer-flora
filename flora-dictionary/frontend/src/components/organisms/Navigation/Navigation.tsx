'use client'

import Link from 'next/link'
import { useNavigation } from '@/hooks/useNavigation'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/', label: 'Dictionary' },
  { href: '/favorites', label: 'Favorites' },
]

export function Navigation() {
  const { pathname, user, theme, toggleTheme, handleSignout } = useNavigation()

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3"
      >
        <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
          Flora Dictionary
        </span>

        <ul className="flex items-center gap-0.5" role="list">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'rounded px-3 py-1.5 text-sm transition-colors',
                  pathname === href
                    ? 'bg-violet-100 font-medium text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
                )}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="rounded p-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {user && (
            <Button variant="ghost" size="sm" onClick={handleSignout}>
              Logout
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}

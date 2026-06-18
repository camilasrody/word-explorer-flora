import { Navigation } from '@/components/organisms/Navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navigation />
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  )
}

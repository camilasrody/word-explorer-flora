interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xl font-bold text-violet-600 dark:text-violet-400">
            Flora Dictionary
          </p>
          <p className="mt-1 text-xs text-gray-500">English word explorer</p>
        </div>
        <div className="border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-900">
          {children}
        </div>
      </div>
    </main>
  )
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-950">
      <h1 className="text-5xl font-bold text-gray-300 dark:text-gray-600">404</h1>
      <p className="text-gray-600 dark:text-gray-400">Page not found</p>
      <Link
        href="/"
        className="text-sm text-violet-600 hover:underline dark:text-violet-400"
      >
        Go home
      </Link>
    </main>
  )
}

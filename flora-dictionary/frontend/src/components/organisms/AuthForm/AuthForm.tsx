'use client'

import Link from 'next/link'
import { FormField } from '@/components/molecules/FormField'
import { Button } from '@/components/atoms/Button'
import { useAuthForm } from '@/hooks/useAuthForm'

interface AuthFormProps {
  mode: 'login' | 'register'
}

export function AuthForm({ mode }: AuthFormProps) {
  const { register, handleSubmit, errors, onSubmit, serverError, isLoading, isRegister } = useAuthForm(mode)

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {isRegister ? 'Create account' : 'Sign in'}
      </h1>

      {serverError && (
        <p
          role="alert"
          className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
        >
          {serverError}
        </p>
      )}

      {isRegister && (
        <FormField
          id="name"
          label="Name"
          type="text"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
      )}

      <FormField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        autoComplete={isRegister ? 'new-password' : 'current-password'}
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" loading={isLoading} className="mt-1">
        {isRegister ? 'Create account' : 'Sign in'}
      </Button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        {isRegister ? (
          <>
            Already have an account?{' '}
            <Link href="/login" className="text-violet-600 hover:underline dark:text-violet-400">
              Sign in
            </Link>
          </>
        ) : (
          <>
            No account?{' '}
            <Link href="/register" className="text-violet-600 hover:underline dark:text-violet-400">
              Create one
            </Link>
          </>
        )}
      </p>
    </form>
  )
}

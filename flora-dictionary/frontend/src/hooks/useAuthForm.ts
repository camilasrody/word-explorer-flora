'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from './useAuth'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type RegisterForm = z.infer<typeof registerSchema>

export function useAuthForm(mode: 'login' | 'register') {
  const { signin, signup, signinError, signupError, isSigningIn, isSigningUp } = useAuth()
  const isRegister = mode === 'register'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  })

  function onSubmit(data: RegisterForm) {
    if (isRegister) {
      signup({ name: data.name, email: data.email, password: data.password })
    } else {
      signin({ email: data.email, password: data.password })
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    serverError: isRegister ? signupError : signinError,
    isLoading: isRegister ? isSigningUp : isSigningIn,
    isRegister,
  }
}

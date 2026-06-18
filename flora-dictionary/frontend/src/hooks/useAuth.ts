'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { setUser, clearAuth } from '@/store/slices/authSlice'
import { signin, signup, signout } from '@/services/auth.service'
import type { RootState } from '@/store'

export function useAuth() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const signupMutation = useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      signup(data.name, data.email, data.password),
    onSuccess: ({ id, name }) => {
      dispatch(setUser({ id, name }))
      router.push('/')
    },
  })

  const signinMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      signin(data.email, data.password),
    onSuccess: ({ id, name }) => {
      dispatch(setUser({ id, name }))
      router.push('/')
    },
  })

  const signoutMutation = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      dispatch(clearAuth())
      router.push('/login')
    },
  })

  return {
    user,
    isAuthenticated,
    signup: signupMutation.mutate,
    signin: signinMutation.mutate,
    signout: signoutMutation.mutate,
    signupError: signupMutation.error?.message,
    signinError: signinMutation.error?.message,
    isSigningUp: signupMutation.isPending,
    isSigningIn: signinMutation.isPending,
  }
}

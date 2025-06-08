import {useMutation} from '@tanstack/react-query';
import { sendPasswordResetRequest, resetPassword, logUser, registerUser } from '@/lib/userServices';


export function useLogin() {
  const {isPending, mutate, error} = useMutation({
    mutationFn: logUser,
    onSuccess : (data) => console.log('Success',data),
    onError : (e) => console.log('Error',JSON.parse(e.message))
  })

  return {logging: isPending,login: mutate, logError: error}
}

export function useRegister() {
  const {isPending, mutate, error} = useMutation({
    mutationFn: registerUser,
    onSuccess : (data) => console.log('Success',data),
    onError : (e) => console.log('Error',JSON.parse(e.message))
  })

  return {logging: isPending,login: mutate, logError: error}
}

export function useRequestPasswordReset() {
  const {isPending, mutate, error} = useMutation({
    mutationFn: sendPasswordResetRequest
  })
  return {requesting: isPending,requestReset: mutate, requestError: error}

}

export function useResetPassword() {
  const {isPending, mutate, error} = useMutation({
    mutationFn: resetPassword
  })
  return {restieng: isPending,resetPassword: mutate, resetError: error}

}

import {useMutation} from '@tanstack/react-query';
import { signIn } from "next-auth/react";

export function useAuthenticate(data) {
  const {pending, mutate, error} = useMutation({
    mutationFn: async(pld) => {
      const response = await signIn("credentials",pld);

      if (response.error) {
          // Handle API-level errors
          console.log("dd",JSON.parse(response.error));
          throw new Error(response.error);
          return null
        }

      return response
          },
    onSuccess : (data) => console.log('Success',data),
    onError : (e) => console.log('Error',JSON.parse(e.message))
  })

  return {Authenticating: pending, authonticate: mutate, authError: error}
}

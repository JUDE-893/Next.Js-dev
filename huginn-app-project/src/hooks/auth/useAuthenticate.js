import {useMutation} from '@tanstack/react-query';
import { signIn } from "next-auth/react";

export function useAuthenticate(data) {
  const {isPending, mutate, error} = useMutation({
    mutationFn: async(pld) => {
      const response = await signIn("credentials",pld);

      console.log("dd",response);
      if (response.error) {
          // Handle API-level errors
          throw new Error(response.error);
          return null
        }

      return response
          },
    // onSuccess : (data) => console.log('Success',data),
    onError : (e) => console.log('Error',JSON.parse(e.message))
  })

  return {Authenticating: isPending,authonticate: mutate, authError: error}
}

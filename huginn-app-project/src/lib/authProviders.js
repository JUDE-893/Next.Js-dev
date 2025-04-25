import CredentialsProvider from "next-auth/providers/credentials";
import { AuthError } from "next-auth";

export const credentialOption = CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'email', type: 'text'}
      },
      async authorize(credis, req) {
        try {


          // prepare the payload
          let payload = {email: credis.email, password: credis.password},
          url = '/login';

          if (credis.mode === 'register') {
            payload = {...payload, name: credis.name, passwordConfirm: credis.passwordConfirm};
            url = '/register';
          }

          // make auth request
          let response = await fetch(process.env.API_BASE_URL+url, {
            method: 'POST',
            headers: {
              "content-type": 'application/json'
            },
            body: JSON.stringify(payload)
          })

          // response
          const data = await response.json();

          // if (!response.ok) {
          //   // Create a custom error object that NextAuth won't override
          //   const error = new AuthError(JSON.stringify(data));
          //   error.name = 'ApiError'; // Custom error type
          //   throw error;
          // }

          return {response, data}
        } catch (error) {
          // Preserve API errors, only fallback for unexpected errors
          // if (error?.name === 'ApiError') throw error;
          throw new AuthError(JSON.stringify({
            statusCode: 500,
            message: 'Authentication failed'
          }));
        }
      }
    })

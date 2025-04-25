
import { NextResponse } from 'next/server';
import { auth } from '@/auth'

export const middleware = auth

export const config = {
  matcher: ["/:id"],
}



// export async function middleware(request) {
  //   const response = NextResponse.next();
  //   const session = await auth();
  //   console.log("[middleware]",response);
  //   console.log("[middleware SESSION]",session);
  //
  //   // Set multiple cookies
  //   if (session?.['user']?.['data']?.['token']) {
    //     response.cookies
    //     .set('api_token', session?.['user']?.['data']?.['token'], {
      //       httpOnly: true,
      //       sameSite: 'lax',
      //     })
      //   }
      //
      //   return response;
      // }

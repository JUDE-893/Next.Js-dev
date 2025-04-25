'use client'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const client = new QueryClient();

export default function QueryProvider({children}) {

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
// https://copilot.microsoft.com/chats/qUK3zjPKQ96w5g88xsbJj

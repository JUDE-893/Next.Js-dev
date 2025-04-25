import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import ReactQueryProvider from "@/components/ReactQueryProvider"
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "@/components/ui/sonner"

export default function Providers({children}) {

  return (
    <ReactQueryProvider>
      <SessionProvider>
        <SidebarProvider className='flex justify-start items-start flex-cols-2 w-screen'>
          {children}
          <Toaster />
        </SidebarProvider>
      </SessionProvider>
    </ReactQueryProvider>
  )
}

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import ReactQueryProvider from "@/components/ReactQueryProvider"
import SocketProvider from "@/components/SocketProvider"
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "@/components/ui/sonner"

export default function Providers({children}) {

  return (
    <ReactQueryProvider>
      <SessionProvider>
        <SocketProvider>
          <SidebarProvider className='flex justify-start items-start flex-cols-2 w-screen'>
            {children}
            <Toaster />
          </SidebarProvider>
        </SocketProvider>
      </SessionProvider>
    </ReactQueryProvider>
  )
}

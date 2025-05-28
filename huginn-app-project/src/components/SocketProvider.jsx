"use client"
import { useState, useEffect, createContext } from 'react';
import { getSession } from 'next-auth/react';
import { io } from 'socket.io-client';


const SocketContext = createContext();

export default function SocketProvider({children}) {

  const [socketClient, setSocketClient] = useState();

  // INITIATE THE SOCKET CLIENT
  useEffect(() => {
    (async () => {
      const session = await getSession();

       setSocketClient(io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
         auth: {token: session.user.data.token},
         transports: ['websocket', 'polling'],
         reconnection: true,
         reconnectionAttempts: 3,
         reconnectionDelay: 1000,
         randomizationFactor: 0.5,
         // Add these critical options:
         forceNew: true, // Create new connection instead of reusing
         autoConnect: true
      }));
    })().catch((err) => console.log('socket client error', err));
    return () => {
      newSocket.disconnect();
    };
  },[])

  console.log("socketClient",socketClient);
  return (
    <SocketContext.Provider value={socketClient} >
      { children }
    </SocketContext.Provider>
  )
}

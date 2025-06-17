import { useEffect } from 'react';
import { useSocket } from '@/components/SocketProvider';

export function useSocketEvent(eventName, onEvent, onAkng) {

  const socketClient = useSocket();

  useEffect( () => {
    if (eventName) {
      socketClient?.on(eventName, onEvent);
    }

    return () => socketClient?.off(eventName, onEvent)
  },[eventName, socketClient]);

  return {
    emit: (data) => {
      socketClient?.emit(eventName,data, onAkng)
    }
  }
}

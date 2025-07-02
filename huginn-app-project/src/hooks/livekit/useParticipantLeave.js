"use client"

import { useRoomContext } from '@livekit/components-react';
import { RoomEvent } from 'livekit-client';
import { useEffect } from 'react';

export const  useParticipantLeave = (handleDisconnect) => {
  const room = useRoomContext(); // Get the current room instance

  useEffect(() => {
    room.on(RoomEvent.Disconnected, handleDisconnect);

    return () => {
      room.off(RoomEvent.Disconnected, handleDisconnect);
    };
  }, [room]);


};

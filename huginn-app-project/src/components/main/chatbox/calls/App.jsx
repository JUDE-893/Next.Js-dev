import {useEffect} from 'react';
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  AudioVisualizer ,
  BarVisualizer ,
  VoiceAssistantControlBar ,
  RoomAudioRenderer,
  useTracks,
  useRoomContext
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import useAccessToken from './utils/useAccessToken';



const serverUrl = import.meta.env.VITE_LIVELIT_SERVER_URL;
const promissedToken = await useAccessToken();
const token = promissedToken.access_token;

export default function App() {

  // const audioTrack = await createLocalAudioTrack({
  //   echoCancellation: true,
  //   noiseSuppression: true,
  // });
  console.log('udifvu',token);



  return (
    <LiveKitRoom
      audio={true}
      video={false}
      token={token} // Ensure this token includes `room: "balena-ai-2"` in its payload
      serverUrl={serverUrl}
      data-lk-theme="default"
      style={{ height: '100vh', width: '100vw' }}
    >
      {/* Your custom component with basic video conferencing functionality. */}

      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />

      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}

        <MyVideoConference />
        <VoiceAssistantControlBar />
        <ControlBar />
    </LiveKitRoom>
  );
}


function MyVideoConference() {
  // Fetch camera, screen share, and audio tracks
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
      { source: Track.Source.Audio, withPlaceholder: true },
    ],
    { onlySubscribed: false },
  );

  const { room } = useRoomContext();

  // useEffect(() => {
  //
  //     console.log("🔍 LiveKit Room Name (from client API):", room.name);
  //
  // }, [room]);

  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      <ParticipantTile/>
    </GridLayout>
  );
}

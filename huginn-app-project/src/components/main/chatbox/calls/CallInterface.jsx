"use client"

import {useEffect} from 'react';
import { useCalls } from './CallsProvider'

import {
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference// Use this instead of FocusContextProvider
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Minimize2, Maximize2} from 'lucide-react';


const handleSetupUI = (observer, handleFn) => {
  const chatToggles = document.querySelectorAll('.lk-chat-toggle');
  const disconnectButton = document.querySelector('.lk-disconnect-button');

  // querySelectorAll returns a NodeList
  chatToggles.forEach(element => {
    element.style.display = 'none';
  });


  if (disconnectButton) {
    disconnectButton.removeEventListener('click', handleFn);
    disconnectButton.addEventListener('click', handleFn);
  }

    // Cleanup: Remove the listener on unmount
    return () => {
      if (disconnectButton) {
        disconnectButton.removeEventListener('click', handleFn);
      }
      observer.disconnect(); // Stop observing
    };

}


export default function CallIterface() {

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL;

  const { callData, respondCallEvent, setCallData } = useCalls();
  const {type, expanded, callToken, conv_id, callID } = callData;

  // interface style Expanded | non-Expanded to occupy the full screen
  const styleObject = expanded
    ? {
        position: "absolute",
        width: "100vw",
        height: "100vh",
        zIndex: 1020
      }
    : {
        position: "absolute",
        zIndex: 1020,
        marginLeft: "310px",
        marginTop: "75px",
        height: "400px",
        width: '75%'
      };

  // handles customising call interface after livekit paints
  useEffect(() => {
    const observer = new MutationObserver(() => handleSetupUI(observer, handleDisconnectClick));

    // observe the dom mutations
    const root = document.querySelector('.call-Interface');

    observer.observe(root, {
      childList: true,  // Watch for added/removed elements
      subtree: true     // Check all nested elements
    });

    // clean up observer
    return () => {
      // Cleanup: Remove listener and disconnect observer
      const button = document.querySelector('.lk-disconnect-button');
      if (button) button.removeEventListener('click', handleDisconnectClick);
      observer.disconnect();
    };
},[])

  // handle end call
  const handleDisconnectClick = function(e) {
    e.preventDefault();
    respondCallEvent.emit({
      conv_id,
      callID,
      action: 'end' });
    }

  return (
    <LiveKitRoom
      audio={true}
      video={false}
      token={callToken} // Ensure this token includes `room: "balena-ai-2"` in its payload
      serverUrl={serverUrl}
      data-lk-theme="default"
      style={styleObject}
      className="call-Interface"
    >

      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />

      {true && <VideoConference  />}
      <button className=" absolute mt-[-45px] ml-5" onClick={() => {setCallData({...callData, expanded: !callData.expanded})}}>
        {expanded ? <Minimize2 color="#00bc7d" absoluteStrokeWidth />
         : <Maximize2 color="#00bc7d" absoluteStrokeWidth />}
      </button>
    </LiveKitRoom>
  );
}

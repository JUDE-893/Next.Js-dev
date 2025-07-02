"use client"
import { useState, useEffect, useContext, createContext } from 'react';
import { useSocketEvent } from "@/hooks/socket/useSocketEvent";
import { toast } from "sonner"
import { getSession } from 'next-auth/react';


const CallsContext = createContext();

const initial = {
  onGoingCall: false,
  type: undefined, // audio || video
  expanded: false,
  callToken: undefined,
  tempToken: undefined,
  contact: undefined,
  conv_id: undefined,
  callID: undefined,
}

export default function CallsProvider({children}) {

  const [callData, setCallData] = useState({
    ...initial,
     // contact object
  });


  // set up start calls event emmiter & listener
  const startCallEvent = useSocketEvent('start-call',
    // on new-call event
    (data) => {
      data = JSON.parse(data);
      console.log('recieve new call ', data);
      // set call state
      setCallData({...callData, contact: data.sender, type: data.content.media.metadata.type, onGoingCall: true, tempToken: data.tempToken, callID: data._id, conv_id: data.conv_id});
    },
    // on acknowlege new-call event
    (data) => {
      data = JSON.parse(data);
      console.log('return call DATA', data);
      // the recipent was offline
      if (!data.ready) {
        toast("Unable to reach the recipent!", {
           variant: "primary",
           description: 'Call ended due to the recipent is offline!'
        });
        return
      }
      setCallData({...callData, type: data.type, onGoingCall: true, callToken: data.callToken, callID: data.callID, conv_id: data.conv_id});
    }

)

  // set up end calls event emmiter & listener
  const respondCallEvent = useSocketEvent('respond-call',
    // on end-call event
    (data) => {
      // set call state
      data = JSON.parse(data);
      console.log('r d', data);
      if (data?.action === "end") setCallData({...callData, ...initial});
    },
    // on acknowlege respond | reject | end -call event
    (data) => {
      console.log('d', data);
      data = JSON.parse(data);
      console.log('b d', data);
      if (data.action === "respond") setCallData({...callData, tempToken: null, callToken: callData?.tempToken })
      else setCallData({...callData, ...initial});
    }

)

  // startCall | endCall
  const respondCall = () => setCallData({...callData, tempToken: null, callToken: callData?.tempToken })

  // startCall | endCall
  const setExpandUI = () => setCallData({...callData, expanded: !expanded })



  return (
    <CallsContext.Provider value={{callData, startCallEvent, respondCallEvent, setCallData}} >
      {children}
    </CallsContext.Provider>
  )
}

// custom Hook
export function useCalls() {
  const context = useContext(CallsContext);

  if(!context) {
    throw new Error('useCalls was used outside of the provider scoop')
  }

  return context
}

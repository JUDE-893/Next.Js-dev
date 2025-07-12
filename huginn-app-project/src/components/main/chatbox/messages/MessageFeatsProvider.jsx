"use client"

import { useContext, createContext } from 'react';


const MessageFeatsContext = createContext();

export default function MessageFeatsProvider({children,conv_id, msg, page, deleteEvent}) {

  // trigger delete-message socket event
  const deleteFn = (dfor) => {
    console.log('msg provd', msg);
    deleteEvent.emit({page, conv_id, msgId: msg?._id, deleteFor: dfor})};

  return (
    <MessageFeatsContext.Provider key={msg._id} value={{deleteFn}} >
      { children }
    </MessageFeatsContext.Provider>
  )
}

// // CUSTOM HOOK
export function useMessageFeats() {
  const messageFeats = useContext(MessageFeatsContext);
  if (messageFeats === undefined) throw new Error('messageFeats hook was used outside of provider scoop');
  return messageFeats;
}

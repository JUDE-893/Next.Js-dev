'use client'

import { useState, useEffect, useRef } from 'react'
import { useGetMessages, useUpdateMessage } from '@/hooks/conversation/useMessage';
import { useSocketEvent } from '@/hooks/socket/useSocketEvent';
import dynamic from 'next/dynamic';

import MessageItem from './MessageItem';
import MessageFeatsProvider from './MessageFeatsProvider';
import { Loader2 } from "lucide-react"
// import {ScrollShadow} from "@heroui/react";
const ScrollShadow = dynamic(
  () => import('@heroui/scroll-shadow').then((mod) => mod.ScrollShadow),
  { ssr: false }
);


export default function MessagesBox({className, conv_id}) {

  const bottomRef = useRef(null);
  const [lastSender, setLastSender] = useState(null);
  let sender = lastSender;
  const setDeletedMessage = useUpdateMessage();

  const deleteMessageEvent = useSocketEvent('delete-message',
  // on delete-message event
  (data) => {
    data = JSON.parse(data);
    setDeletedMessage(data.conv_id, {id: data.msgId, content: null, updatedAt: Date.now()}, data.page)
  },
  // on Aknowlege delete message event
  (data) => {
    data = JSON.parse(data);
    setDeletedMessage(data.conv_id, {id: data.msgId, content: null, updatedAt: Date.now()}, data.page)
  },
)

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useGetMessages(conv_id);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [data?.pages?.[0]?.messages]);


  // if( error ) return <p className='text-destructive text-md ml-20 mt-50'> Oops! Something went wrong. try later ..</p>

  if( isFetchingNextPage ) return <Loader2 size={40} className="animate-spin text-primary ml-45 mr-25 mt-50" />

  //  function that decides where the message component should show the user avatar is case of a new chat  <ls_id> : last sender id
  const isJoinMessage = (ls_id) => {
    let r = sender !== ls_id
    if (r) sender = ls_id
    return !r
    // To contenu : && message.date.month & dat & year == new date() => true
  }

  return (
    <ScrollShadow size={100} hideScrollBar className={`h-[80vh] flex-1 ${className}`}>
      <div className={(data?.pages[0].messages.length > 0) ? "h-full" : ""}>
        {(data?.pages[0].messages.length > 0)
          ? data?.pages[0].messages.map((msg) =>
              <MessageFeatsProvider page={0} deleteEvent={deleteMessageEvent} conv_id={conv_id} msg={msg}>
                <MessageItem isJoinMessage={isJoinMessage(msg.sender._id)} message={msg}  />
              </MessageFeatsProvider>
            )
          : <span className='flex flex-col justify-center h-full items-center text-center text-muted italic'>
              No messages yet! Remember, a conversation always starts from one part ;)
            </span>
        }
        <div className='pt-6' ref={bottomRef} />
      </div>
    </ScrollShadow>
  );
}

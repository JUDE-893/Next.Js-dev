'use client'

import { useState } from 'react'
import { useGetMessages } from '@/hooks/conversation/useMessage';
import dynamic from 'next/dynamic';

import MessageItem from './MessageItem';
import { Loader2 } from "lucide-react"
// import {ScrollShadow} from "@heroui/react";
const ScrollShadow = dynamic(
  () => import('@heroui/scroll-shadow').then((mod) => mod.ScrollShadow),
  { ssr: false }
);

export default function MessagesBox({className, conv_id}) {

  const [lastSender, setLastSender] = useState(null);
  let sender = lastSender;

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useGetMessages(conv_id);
  console.log('=============',data);

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
    <ScrollShadow size={100} hideScrollBar className={"h-[80vh] flex-1"+className} >
      <div className={`${!Boolean(data?.pages?.[0]?.messages?.length > 0) && 'h-full'} `}>
      {Boolean(data?.pages?.[0]?.messages?.length > 0) ? data?.pages?.[0]?.messages.map((msg) => <MessageItem isJoinMessage={isJoinMessage(msg.sender._id)} message={msg} /> )
        : <span className=' flex flex-col justify-center h-full items-center text-center text-muted italic'>No messages yet! Remember a conversation <br />always start from one part ;)</span>}
      </div>
    </ScrollShadow>


  )
}

'use client'

import { useState, useEffect, useRef, memo } from 'react'
import { useGetMessages } from '@/hooks/conversation/useMessage';


import MessageItem from './MessageItem';
import MessageFeatsProvider from './MessageFeatsProvider';
import { Loader2 } from "lucide-react"
// import {ScrollShadow} from "@heroui/react";



export default memo(function MessagesBox({className, conv_id, page, setHasNextPage, deleteEvent}) {

  const isInitialMount = useRef(true);
  const [lastSender, setLastSender] = useState(null);
  let sender = lastSender;

  // fetch message page
  const {isLoading, data, error} = useGetMessages(conv_id, page);

  // set the hasNext page param
  useEffect( () => {
    setHasNextPage(data?.messages.length >= +(process.env.NEXT_PUBLIC_MESSAGES_PAGE_LENGTH));
  });


  // go to the bottom as the message object changes

  // useEffect(() => {
  //     let timeoutId;
  //     // Skip effect on initial mount
  //     if (bottomPage.current) {
  //       console.log('/O/O/',bottomPage.current);
  //       timeoutId = setTimeout(() => {
  //         bottomPage.current?.scrollIntoView({ behavior: "smooth" });
  //       }, 1500);
  //     }
  //     // Cleanup function - runs on every re-render and unmount
  //     return () => {
  //       if (timeoutId) {
  //         clearTimeout(timeoutId);
  //       }
  //     };
  //   }, []);

  // go to the bottom as the message object changes
  useEffect(() => {
      let timeoutId;
      if (Boolean(data)) {     
            if (!isInitialMount.current) {
              let bottomRef = document.querySelector('#bottomchat')
              timeoutId = setTimeout(() => {
              bottomRef?.scrollIntoView({ behavior: "smooth" });
            }, 1500);
          }
          isInitialMount.current = false;
        }

      // Cleanup function - runs on every re-render and unmount
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [data?.messages?.length, data]);

  // if( error ) return <p className='text-destructive text-md ml-20 mt-50'> Oops! Something went wrong. try later ..</p>

  if ( isLoading ) return <Loader2 size={40} className="animate-spin text-primary ml-45 mr-25 mt-50" />

  //  function that decides where the message component should show the user avatar is case of a new chat  <ls_id> : last sender id
  const isJoinMessage = (ls_id) => {
    let r = sender !== ls_id
    if (r) sender = ls_id
    return !r
    // To contenu : && message.date.month & dat & year == new date() => true
  }

  return (
      <div className={(data?.messages.length > 0) ? "h-full" : ""}>
        {(data?.messages?.length > 0)
          ? data?.messages.map((msg) =>
              <MessageFeatsProvider page={page} deleteEvent={deleteEvent} conv_id={conv_id} msg={msg}>
                <MessageItem isJoinMessage={isJoinMessage(msg?.sender?._id)} message={msg}  />
              </MessageFeatsProvider>
            )
          : <span className='flex flex-col justify-center h-full items-center text-center text-muted italic'>
              No messages yet! Remember, a conversation always starts from one part ;)
            </span>
        }
      </div>
  );
}
,isNewPage)

function isNewPage(oldP, newP) {
  return oldP.page === newP.page
}

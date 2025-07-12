
import { useState, useRef, useEffect } from 'react';
import { useMessagesInfiniteScroll } from '@/hooks/conversation/useMessagesInfiniteScroll';
import dynamic from 'next/dynamic';
import { useUpdateMessage } from '@/hooks/conversation/useMessage';
import { useSocketEvent } from '@/hooks/socket/useSocketEvent';



import MessagesBox from './MessagesBox'
const ScrollShadow = dynamic(
  () => import('@heroui/scroll-shadow').then((mod) => mod.ScrollShadow),
  { ssr: false }
);


export default function MessageContainer({conv_id, className}) {

  const bottomRef = useRef(null);
  const isInitialMount = useRef(true);
  const [pageLength, setPageLength] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const setDeletedMessage = useUpdateMessage();

  // set delete message socketEvent
  const deleteMessageEvent = useSocketEvent('delete-message',
  // on delete-message event
  (data) => {
    data = JSON.parse(JSON.parse(data));
    setDeletedMessage(data.conv_id, {id: data.msgId, content: null, updatedAt: Date.now()}, data.page)
  },
  // on Aknowlege delete message event
  (data) => {
    data = JSON.parse(data);
    setDeletedMessage(data.conv_id, {id: data.msgId, content: null, updatedAt: Date.now()}, data.page)
 });

 // set up intersectionObserver to watch next page triggerer
 const ref = useMessagesInfiniteScroll(() => {hasNextPage && setPageLength((l) => l+1)});

 // go to the bottom as the initial mount
 useEffect(() => {
     let timeoutId;
     // Skip effect on initial mount
     if (isInitialMount.current && pageLength > 0) {
       isInitialMount.current = false;
       timeoutId = setTimeout(() => {
         bottomRef.current?.scrollIntoView({ behavior: "smooth" });
       }, 1500);
     }

     // Cleanup function - runs on every re-render and unmount
     return () => {
       if (timeoutId) {
         clearTimeout(timeoutId);
       }
     };
   }, [pageLength]);



  return (
    <ScrollShadow size={100} hideScrollBar className={`h-[80vh] ${className}`}>
        <div ref={ref} id='scroll-observer' />
        <div className='flex flex-col-reverse' >
          {Array.from({length: pageLength}).map((_,i) => {
            return <><MessagesBox   page={i+1} key={i} conv_id={conv_id} setHasNextPage={setHasNextPage} deleteEvent={deleteMessageEvent} /><br/></>
          })}
        </div>
        <div ref={bottomRef} id="bottomchat" />
    </ScrollShadow>
  )
}

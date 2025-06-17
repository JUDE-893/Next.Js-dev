
import { useEffect, useState, memo } from 'react';
import { decryptMessage } from '@/lib/messagesServices';
import { timeFormat } from '@/lib/utils';

import Contact from '@/components/main/contact/Contact'
import DateSeparator from '@/components/main/chatbox/DateSeparator'
import MessageContextMenu from './MessageContextMenu'

export default memo(function MessageItem({className, message, isJoinMessage}) {


  const [msg, setMsg] = useState(null)

  useEffect( () => {
    ( async () => {
      let m;
      if (message?.content) m = await decryptMessage(message?.content?.text?.encrypted, message?.content?.text?.iv);
      else m = <p className='text-input text-xs '>this messages was deleted</p>
      setMsg(m)
    })()
  },[message?.updatedAt ?? 0]);


  return (
    <MessageContextMenu  key={message?._id} id={message?._id} >
    <div className="" key={message?._id}>
        {msg && <> {!isJoinMessage && <Contact className={`text-${message.sender.color} mt-3 text-[14.4px] `}contact={message.sender} sideChild={
          <p className='text-xs text-muted ml-3 mt-1'>{timeFormat(message.createdAt)}</p>}
        >
        </Contact>}
        <div className=' text-muted-foreground text-[13.4px] mt-[-3px] pl-2 ml-2 border-rigth-1 hover:bg-card py-1 radius-1'>{msg}</div></>
      }
    </div>
    </MessageContextMenu >
  )
}, isNotUpdatedMessage)


function isNotUpdatedMessage(oldProps, newProps) {
  return oldProps.message?.updatedAt === newProps.message?.updatedAt;
}

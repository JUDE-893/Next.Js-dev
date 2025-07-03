
import { useEffect, useState } from 'react';
import { decryptMessage } from '@/lib/messagesServices';

import DateSeparator from '@/components/main/chatbox/DateSeparator'

export default function MessageText({ className, message, children }) {

    const [msg, setMsg] = useState(null)
    useEffect( () => {
      ( async () => {
        let m;
        if (message?.content) m = await decryptMessage(message?.content?.text?.encrypted, message?.content?.text?.iv);
        else m = <p className='text-input text-xs '>this messages was deleted</p>
        setMsg(m)
      })()
    },[message?.updatedAt ?? 0]);

  return (<div className="" key={message?._id}>
      {msg && <> {children}
      <div className=' text-muted-foreground text-[13.4px] mt-[-3px] pl-2 ml-2 border-rigth-1 hover:bg-card py-1 radius-1'>{msg}</div></>
    }
  </div>)
}

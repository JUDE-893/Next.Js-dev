'use client'

import { useSession } from "next-auth/react";
import { useParams } from 'next/navigation';
import {useState, useRef} from 'react';
import { useSendMessage, useNewMessage } from '@/hooks/conversation/useMessage';
import { useNewConversationMessage } from '@/hooks/conversation/useConversation';
import { encryptMessage, decryptMessage } from '@/lib/messagesServices';
import { uInt8ArrayToHex, generateUniqueStr } from '@/lib/utils';

import {Mic,Forward,Plus,SmilePlus} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function EntryFields({ className, conv_id, socketEvent }) {

  const inputRef = useRef(null);
  const { data: session } = useSession();
  const [ text, setText ] = useState('');
  const { isPending: isSending, mutate: send, error: errorSend } = useSendMessage(conv_id);
  const setNewMessage = useNewMessage();
  const setNewConversationMessage = useNewConversationMessage();


  // const handleSend = async (e) => {
  //   e.preventDefault()
  //   console.log('sending...');
  //   const {encrypted, iv} = await encryptMessage(text);
  //   console.log({e: uInt8ArrayToHex(encrypted), iv: uInt8ArrayToHex(iv)});
  //   let data = {content: {text: {encrypted: uInt8ArrayToHex(encrypted), iv: uInt8ArrayToHex(iv)}}, createdAt: new Date()};
  //   send(data)
  //   setText('')
  //   return 1
  // }
  const handleSend = async (e) => {
    console.log('session',session);

    e.preventDefault()
    console.log('sending...',inputRef.current.value);
    const {encrypted, iv} = await encryptMessage(inputRef.current.value);
    console.log({e: uInt8ArrayToHex(encrypted), iv: uInt8ArrayToHex(iv)});
    let vol_id = generateUniqueStr();
    let data = {vol_id, conv_id, content: {text: {encrypted: uInt8ArrayToHex(encrypted), iv: uInt8ArrayToHex(iv)}}, createdAt: new Date()};
    setNewMessage(conv_id, {...data, sender: session.user.data.user, _id: vol_id})
    setNewConversationMessage(conv_id, {...data, sender: session.user.data.user, _id: vol_id});

    socketEvent.emit(data);
    inputRef.current.value= ""
    return 1
  }

  return (
    <form onSubmit={handleSend}>
    <div className={"bg-secondary py-0 flex w-full items-center rounded-[4px] mr-50 " + className}>
      <Button  className="bg-card hover:bg-card w-1 h-[25px] rounded-full mr-2 ml-2" type="button"><Plus/></Button>
      {false && <Input value={text} onChange={(e) => setText(e.target.value)} className=" focus:border-0 focus:outline-none focus:ring-0 border-0 focus:none"  type="text" placeholder="type message" />}
      {true && <Input ref={inputRef} onChange={(e) => console.log("Current value:", inputRef.current.value)} className=" focus:border-0 focus:outline-none focus:ring-0 border-0 focus:none"  type="text" placeholder="type message" />}

      <div className="justify-end py-4 flex w-fit items-center ml-1">
        <Button key='mic' className="bg-secondary hover:bg-card" type="button"><Mic /></Button>
        <Button key="emo"className="bg-secondary hover:bg-card" type="button"><SmilePlus /></Button>
        <Button key="send" type='submit' className={`bg-${!Boolean(text) ? 'secondary':'primary'} hover:bg-card `} type="submit"><Forward/></Button>
      </div>
    </div>
    </form>
  )
}

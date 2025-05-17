'use client'

import {useState} from 'react';
import { useSendMessage } from '@/hooks/conversation/useMessage';
import { encryptMessage, decryptMessage } from '@/lib/messagesServices';
import { uInt8ArrayToHex } from '@/lib/utils';

import {Mic,Forward,Plus,SmilePlus} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function EntryFields({className,conv_id}) {

  const [text, setText] = useState(''),
  {isPending: isSending, mutate: send, error: errorSend} = useSendMessage(conv_id);

  const handleSend = async (e) => {
    e.preventDefault()
    console.log('sending...');
    const {encrypted, iv} = await encryptMessage(text);
    console.log({e: uInt8ArrayToHex(encrypted), iv: uInt8ArrayToHex(iv)});
    let data = {content: {text: {encrypted: uInt8ArrayToHex(encrypted), iv: uInt8ArrayToHex(iv)}}, createdAt: new Date()};
    send(data)
    setText('')
    return 1
  }

  return (
    <form onSubmit={handleSend}>
    <div className={"bg-secondary py-0 flex w-full items-center rounded-[4px] mr-50 " + className}>
      <Button  className="bg-card hover:bg-card w-1 h-[25px] rounded-full mr-2 ml-2" type="button"><Plus/></Button>
      <Input value={text} onChange={(e) => setText(e.target.value)} className=" focus:border-0 focus:outline-none focus:ring-0 border-0 focus:none"  type="text" placeholder="type message" />

      <div className="justify-end py-4 flex w-fit items-center ml-1">
        <Button key='mic' className="bg-secondary hover:bg-card" type="button"><Mic /></Button>
        <Button key="emo"className="bg-secondary hover:bg-card" type="button"><SmilePlus /></Button>
        <Button key="send" type='submit' className={`bg-${!Boolean(text) ? 'secondary':'primary'} hover:bg-card `} type="submit"><Forward/></Button>
      </div>
    </div>
    </form>
  )
}

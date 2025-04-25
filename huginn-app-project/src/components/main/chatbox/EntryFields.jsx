'use client'
import {useState} from 'react';
import {Mic,Forward,Plus,SmilePlus} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EntryFields({className}) {

  const [text, setText] = useState('')

  return (
    <div className={"bg-secondary py-0 flex w-full items-center rounded-[4px] mr-50 " + className}>
      <Button  className="bg-card hover:bg-card w-1 h-[25px] rounded-full mr-2 ml-2" type="button"><Plus/></Button>
      <Input value={text} onChange={(e) => setText(e.target.value)} className=" focus:border-0 focus:outline-none focus:ring-0 border-0 focus:none"  type="text" placeholder="type message" />

      <div className="justify-end py-4 flex w-fit items-center ml-1">
        <Button key='mic' className="bg-secondary hover:bg-card" type="button"><Mic /></Button>
        <Button key="emo"className="bg-secondary hover:bg-card" type="button"><SmilePlus /></Button>
        <Button key="send" className={`bg-${!Boolean(text) ? 'secondary':'primary'} hover:bg-card `} type="submit"><Forward/></Button>
      </div>
    </div>
  )
}

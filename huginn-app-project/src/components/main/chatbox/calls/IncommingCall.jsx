"use client"

import { useCalls } from './CallsProvider'
import Contact from '@/components/main/contact/Contact';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Video, PhoneMissed, X } from 'lucide-react';

export default function IncommingCall() {

  const { callData, respondCallEvent } = useCalls();
  const {type, contact} = callData;

  let style = {
      position: "absolute",
      zIndex: 1020,
      marginLeft: "310px",
      marginTop: "75px",
      height: "100px",
      width: '75%',
      padding: '15px 50px'
    };
  return (
    <Card style={style}>
      <Contact className='mb-1 relative' contact={contact} avatarClasses='w-15 h-15'
        sideChild={
          <div className=" absolute right-0 flex gap-2">
            <Button  className="bg-primary w-20" variant='primary' onClick={() => respondCallEvent.emit({conv_id: callData.conv_id, callID: callData.callID, action: 'respond' })} >{type === 'audio' ? <Phone/> : <Video/>}</Button>
            <Button className="w-20" variant='destructive' onClick={() => respondCallEvent.emit({conv_id: callData.conv_id, callID: callData.callID, action: 'reject' })} >{type === 'audio' ? <PhoneMissed /> : <X/>}</Button>
          </div>
        }>
        <span className="relative text-xs text-primary">Incomming{type === 'audio' ? ' ' : ' Video ' }Call...</span>
      </Contact>
    </Card>
  )
}

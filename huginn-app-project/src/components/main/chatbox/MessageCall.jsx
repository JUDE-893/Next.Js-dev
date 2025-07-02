
import { useEffect, useState } from 'react';
import { Phone, PhoneMissed, PhoneOff, VideoOff, Video } from 'lucide-react';


import DateSeparator from '@/components/main/chatbox/DateSeparator'

export default function MessageText({ className, message, children }) {
  let Compo;
  let ModelCompo = ({Icon, variation, msg}) => <div className='flex gap-5 mb-2 mt-2 italic'>
                      <Icon size={15} className={`text-${variation}`} strokeWidth={2} absoluteStrokeWidth />
                      <p className='text-gray-500 text-xs '>{msg}</p>
                    </div>


  if (!message.content) {
    Compo = () => <p className='text-input text-xs '>this messages was deleted</p>
  }else {
    switch (message.content.media.metadata.status) {
      case 'responded':
        (message.content.media.metadata.type === 'audio') ?
          Compo = () => <ModelCompo Icon={Phone} variation='primary' msg="Has started a call that last ..." />
          : Compo = () => <ModelCompo Icon={Video} variation='primary' msg="Has started a video call that last ..." />
        break;
      case 'rejected':
        (message.content.media.metadata.type === 'audio') ?
          Compo = () => <ModelCompo Icon={PhoneMissed} variation='destructive' msg="Call was rejected" />
          : Compo = () => <ModelCompo Icon={VideoOff} variation='destructive' msg="Video call was rejected" />
        break;
      case 'non-established':
        (message.content.media.metadata.type === 'audio') ?
          Compo = () => <ModelCompo Icon={PhoneOff} variation='input' msg="Call was did not establish" />
          : Compo = () => <ModelCompo Icon={Video} variation='input' msg="Video call was did not establish" />
        break;
    }
  }


  return (<div className="" key={message?._id}>
      {true && <> {children}
        <Compo />
      </>
    }
  </div>)
}

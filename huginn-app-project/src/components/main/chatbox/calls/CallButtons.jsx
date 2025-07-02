import { useEffect } from 'react';
import {useCalls} from "./CallsProvider"
import { useParams } from 'next/navigation';

import { Button } from "@/components/ui/button"
import { Phone, Video  } from 'lucide-react';

export default function CallButtons({contact}) {

  const { setCallData, startCallEvent} = useCalls();
  const { conversationID } = useParams();

  useEffect(() => {
    setCallData((old) => ({...old, contact}))
  }, [contact?.id ?? 0])

  return (
    <>
      <Button variant="secondary" onClick={() => {
        startCallEvent.emit({conv_id: conversationID, type: 'audio'})
      }}><Phone /></Button>

      <Button variant="secondary" onClick={() => {
        startCallEvent.emit({conv_id: conversationID, type: 'video'})
      }}><Video /></Button>

    </>
  )
}

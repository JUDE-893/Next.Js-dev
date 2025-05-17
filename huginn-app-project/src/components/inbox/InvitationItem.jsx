import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format  } from "date-fns";
import { TabsContent } from "@/components/ui/tabs"
import { getInvitions } from '@/lib/contactServices'
import DisplayInvitation from './DisplayInvitation';
import Contact from '@/components/main/contact/Contact'
import {CircleCheck, CircleX} from 'lucide-react';
import { useRespondInvite, useCancelInvite } from '@/hooks/contact/useInviteContact'




export default function InvitationItem({invitation,type}) {

  const {responding, respond, respondError} = useRespondInvite();
  const {canceling, cancelInv, cancelError} = useCancelInvite();

  const {resp, msg:object} = messageInvitation(invitation)

  let initDate = new Date(invitation.metadata.createdAt);

  const {contact, message, action} = (type === 'sent') ?
    {
      contact: invitation?.recipient,
      message: `${object} ${resp}.`,
      action: <CircleX onClick={() => {!canceling && cancelInv({id:invitation._id})}} size={18} className='text-destructive'/>
    }
    : {
      contact: invitation?.sender,
      message: `${resp} a ${object}.`,
      action: <><CircleCheck onClick={() => {!responding && respond({id:invitation._id,response:1 })}} size={18} className='text-primary' />
                <CircleX size={18} onClick={() => {!responding && respond({id:invitation._id,response:1 })}} className='text-destructive' />
              </>
    }

  return (
    <>
      <Contact className='mb-1' contact={contact} key={invitation._id}
        sideChild={
          <p className="text-input text-xs absolute right-1">{format(initDate, "dd/MM")}</p>
        }>
        <span className="relative text-xs text-muted-forground">
          <p className="text-muted-foreground">{message}</p>
          <span className="flex gap-2 absolute right-1 top-0">{invitation.status === 'hanging' && action}</span>
        </span>
      </Contact>
    </>
  )
}

function messageInvitation({status, type}) {

  let resp='sent',
  msg = 'relation invitation';

  if (type !== 'direct') {
    msg = 'invitation to join ${target.name}';
  }

  if (status !== 'hanging') {
    resp = status
  }
  return {resp, msg}
}
// function RoundButton({children, variation, ...props}) {
//   return (
//     <button className={`ring-full hover:bg-${variation}`} {...props}> {children} </button>
//   )
// }

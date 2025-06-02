'use client'

import { useState } from 'react'
import { useInviteContact } from "@/hooks/contact/useInviteContact"
import AlertDialog from "@/components/ui/custom/AlertDialog";
import { Input } from "@/components/ui/input"

export default function InviteContactModal({children, className}) {

  const [username, setUsername] = useState('')
  const {sending, send, sendError} = useInviteContact()

  const handleInvite = () => {
    send(username)
  }

  return (
    <AlertDialog className={className} pending={sending} label={"Invite Contact"}
      callBack={handleInvite}
      trigger={children}
      disabled={!Boolean(username)}
      >
      <Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='You can send invitation by typing the username : e.g @user_name_01'/>
    </AlertDialog>
  )
}

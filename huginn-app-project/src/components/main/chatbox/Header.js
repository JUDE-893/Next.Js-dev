"use client"

import { EllipsisVertical  } from 'lucide-react';
import CallButtons from "@/components/main/chatbox/calls/CallButtons"
import Contact from "@/components/main/contact/Contact"
import { Separator } from "@/components/ui/separator"
import Menu from "./DropDownMenu"

export default function Header({contact, className}) {
  const theme = 'primary';
  return (
    <div className={'w-full absolute '+className}>
      <div className='relative mt-3 grid w-full px-1'>
        <Contact contact={contact} className=''>
          <p className={`text-${theme} text-sm`}>{contact.status}</p>
        </Contact>
        <div className='flex gap-2 absolute right-0'>
            <CallButtons contact={contact} />
          <Menu />
        </div>
      </div>
      <Separator />
    </div>
  )
}

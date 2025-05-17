"use client"

import { Phone, Video, EllipsisVertical  } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Contact from "@/components/main/contact/Contact"
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
          <Button variant="secondary" onClick={() => console.log('Appel')}><Phone /></Button>
          <Button variant="secondary" onClick={() => console.log('Appel')}><Video  /></Button>
          <Menu />
        </div>
      </div>
      <Separator />
    </div>
  )
}

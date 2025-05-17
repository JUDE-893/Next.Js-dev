'use client'

import { useState } from 'react';
import { Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger } from "@/components/ui/tabs"
import InboxDrawerBody from './InboxDrawerBody';


export default function InboxDrawer() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Inbox />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        {/* SHEET BODY */}
        <Tabs defaultValue="account" className="w-full" >
          <TabsList className="w-full ring-null">
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          {isOpen && <InboxDrawerBody />
          }
        </Tabs>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

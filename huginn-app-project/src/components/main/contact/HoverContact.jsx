import { format } from 'date-fns';

import { CalendarIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


export default function HoverContact({contact, children}) {

  return (
    <HoverCard >
      <HoverCardTrigger asChild>
        <div>{children}</div>
      </HoverCardTrigger>
      <HoverCardContent align="start" side="" className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={contact?.profilePic} />
            <AvatarFallback>{contact?.nameTag}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{contact?.accountSlag}</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {contact?.createdAt ? format(new Date(contact?.createdAt), 'MMMM yyyy') : 'Unknown'}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

import {useState} from 'react';
import { EllipsisVertical  } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertDialog from "@/components/ui/custom/AlertDialog";
import ReportModal from "@/components/ui/custom/ReportModal";
import ComboboxPopover from "@/components/ui/custom/ComboboxPopover";
import ComboModal from "@/components/main/chatbox/ComboModal";
import Contact from "@/components/main/Contact";


export default function Menu() {

  const [val,setVal] = useState(true)

  // function that trigger a re-render to the <DropdownMenu /> by upating the keu-y props
  const handleClose = () => {
    setVal((v) => !v)
  }

  // wrap function that handles adding the closer function to operation function
  const handleWrapCloser= (customHook) => {
    let obj = customHook();
    obj.closer = handleClose;
    return obj
  }
  // placeHolder functions
  const handleBlock = () => handleClose();
  const handleReport = () => handleClose();


  return (
    <DropdownMenu key={val} >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="ml-2"><EllipsisVertical /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-1">

        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Search
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Media
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Pin
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}><ComboModal label='Invite to..' listElement={<Contact className="bg-background" />}>
              Invite
          </ComboModal></DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Share contact</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}><ComboModal label='Add to..' listElement={<Contact className="bg-background" />}>
              Add to
              <DropdownMenuShortcut className='absolute right-2 '>⌘+T</DropdownMenuShortcut>
          </ComboModal></DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />


        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Settings</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
            <DropdownMenuItem>Mode distraction</DropdownMenuItem>
            <DropdownMenuItem>Clear discussion</DropdownMenuItem>
            <DropdownMenuItem>Export discussion</DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* report a contact */}
            <DropdownMenuItem className="text-primary"
            onSelect={(e) => e.preventDefault()}>
              <ReportModal label='Report A Contact' callBack={handleReport}
                message='Thanks for your report. The last 5 messages from this chat will be forwarded to WhatsApp. The contact will not be notified.'
                >
                Report
              </ReportModal>
            </DropdownMenuItem>

              {/* block contact */}
              <DropdownMenuItem className="text-destructive"
                onSelect={(e) => e.preventDefault()}>
                <AlertDialog label='Are you sure you want to block this contact?'
                  callBack={handleBlock}
                  message='Enabling the block on this contact will bisable sending messages and call operations.'
                  >
                  Block
                </AlertDialog>
              </DropdownMenuItem>

            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

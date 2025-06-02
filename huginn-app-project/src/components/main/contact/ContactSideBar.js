'use client'

import { useState, useEffect } from 'react';
import { useGetConversations } from '@/hooks/conversation/useConversation'
import { decryptMessage } from '@/lib/messagesServices';
import { timeFormat, shorterStr } from '@/lib/utils';


import Link from 'next/link';
import { Search, EllipsisVertical, Plus, UserRoundPlus, Loader2 } from "lucide-react"
import Contact from "./Contact"
import InviteContactModal from "./InviteContactModal"
import NewConversationModal from "./NewConversationModal"
import Menu from "@/components/ui/custom/DropCompoundMenu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar"




// Menu items.
// const items = [
//   {
//     name: "Alexis Sanchez",
//     id: "fe425d6de400e7",
//     nameTag: "AS",
//     profileImage: null,
//     message: {content : 'ok later', time: "20:14"},
//     status: "online"
//   },
//   {
//     name: "Lucas coper",
//     id: "fe425d6de400o7",
//     nameTag: "LC",
//     profileImage: null,
//     message: {content : 'allright it Done', time: "10:14"},
//     status: "online"
//   },
//   {
//     name: "Jonnas Schmidtmann",
//     id: "fe425d6de400p7",
//     nameTag: "JS",
//     profileImage: null,
//     message: {content : 'That\'s good', time: "7:14"},
//     status: "online"
//   }
//
// ]

const dropDownOpts = [
  {
    name: <InviteContactModal>
            <span className='flex gap-2'><UserRoundPlus /> <p>Find friend</p> </span>
          </InviteContactModal>,
    callBack: (e) => 1
  },
  {
    name: <NewConversationModal />,
    callBack: () => console.log('contact sidebar')
  },
  {
    name: 'Create group',
    callBack: () => console.log('contact sidebar')
  },
  {
    name: 'Create group',
    callBack: () => console.log('contact sidebar')
  },

]


export default function ContactSideBar() {

  const [messages, setMessages] = useState([]);

  const {data, isLoading, error} = useGetConversations();

  // decrypte message
  useEffect( () =>{

  (async () => {
    if (data) {
      let decryptedMessages = await data?.conversations?.map(async (item) => {
        if (item?.lastMessage) { // message exists
          let { encrypted, iv } = item?.lastMessage?.content?.text;
          let message  = await decryptMessage(encrypted, iv);
          return shorterStr(message,30);
        }
        return null // message inexistant
      });
      setMessages(decryptedMessages)
    }
  })()
  },[data])


  return (
    <Sidebar className="ml-12 relative ">
      <SidebarContent className="relative pt-25">
        <SidebarGroup>
           {/* HEADER */}
          <SidebarHeader className='flex flex-row text-muted-foreground' >
              <SidebarGroupLabel  className='text-lg'>
                Contacts
              </SidebarGroupLabel>
              <div className="flex flex-row gap-2 absolute right-3 top-6">
                <Search size={18} />
                <Menu options={dropDownOpts} className="mr-50">
                  <Menu.Trigger>
                    <EllipsisVertical size={18} />
                  </Menu.Trigger>
                </Menu>
              </div>
          </SidebarHeader>
          { error ? <p className='text-destructive text-center text-sm  mt-50'> Oops! Something went wrong. Try later ..</p>
            : (isLoading ? <Loader2 size={40} className="animate-spin text-primary ml-25 mr-25 mt-50" />
            :<SidebarGroupContent className="px-0 " >
            <SidebarMenu className="mt-4 px-0 " >
              {data && data?.conversations?.map((item, index) => (
                <SidebarMenuItem key={item._id}>
                  <Link href={`/${item?._id}`}>
                    <Contact contact={item?.name ?? item.participants[0].participant} className=' hover:bg-secondary' sideChild={
                      item?.lastMessage ? <p className='text-input text-xs absolute right-0'>{timeFormat(item?.lastMessage?.createdAt)}</p> : ""
                    }>

                      <p className='text-input text-xs'>
                        {item?.lastMessage ? (messages?.[index] ?? <span className=" italic">decrypting messages ..</span> )
                        : <span className=" italic">No messages yet!</span>}
                      </p>
                    </Contact>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>)}
        </SidebarGroup>

        {/* Log In/Out Button */}
        {/*<SidebarMenuButton asChild className="absolute bottom-20">
          <LogOut size={20} />
        </SidebarMenuButton>*/}

      </SidebarContent>
    </Sidebar>

  )
}

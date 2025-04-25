import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

import Contact from "./Contact"

// Menu items.
const items = [
  {
    name: "Alexis Sanchez",
    id: "fe425d6de400e7",
    nameTag: "AS",
    profileImage: null,
    message: {content : 'ok later', time: "20:14"},
    status: "online"
  },
  {
    name: "Lucas coper",
    id: "fe425d6de400o7",
    nameTag: "LC",
    profileImage: null,
    message: {content : 'allright it Done', time: "10:14"},
    status: "online"
  },
  {
    name: "Jonnas Schmidtmann",
    id: "fe425d6de400p7",
    nameTag: "JS",
    profileImage: null,
    message: {content : 'That\'s good', time: "7:14"},
    status: "online"
  }

]

export default function ContactSideBar() {
  return (
    <Sidebar className="ml-12 relative ">
      <SidebarContent className="relative pt-25">
        <SidebarGroup>
          { true && <SidebarGroupLabel>Contacts</SidebarGroupLabel>}
          <SidebarGroupContent className="px-0 " >
            <SidebarMenu className="mt-4 px-0 " >
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <Contact contact={item} className=' hover:bg-secondary' sideChild={
                    <p className='text-input text-xs absolute right-0'>{item.message.time}</p>
                  }>
                  <p className='text-input text-sm'>{item.message.content}</p>
                  </Contact>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Log In/Out Button */}
        {/*<SidebarMenuButton asChild className="absolute bottom-20">
          <LogOut size={20} />
        </SidebarMenuButton>*/}

      </SidebarContent>
    </Sidebar>

  )
}

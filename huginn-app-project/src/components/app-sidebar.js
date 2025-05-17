import { Calendar, Home, Inbox, Search, Settings, LogOut, Box, Radio, Video, Voicemail,Package  } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import InboxDrawer from  '@/components/inbox/InboxDrawer';


// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Box",
    url: "#",
    icon: Box,
  },
  {
    title: "Radio",
    url: "#",
    icon: Radio,
  },
  {
    title: "Video",
    url: "#",
    icon: Video,
  },
  {
    title: "Voicemail ",
    url: "#",
    icon: Voicemail ,
  },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Inbox",
    url: "#",
    icon: InboxDrawer,
  },

]

export function AppSidebar() {
  return (
    <Sidebar className="w-12 relative">
      <SidebarContent className="relative h-1000 pt-20 bg-yellow-000">
        <SidebarGroup>
          {false && <SidebarGroupLabel>Application</SidebarGroupLabel>}
          <SidebarGroupContent >
            <SidebarMenu className="gap-2" >
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      {false && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Log In/Out Button */}
        <div className="absolute flex flex-col bottom-20 gap-2 w-full">
          <SidebarMenuButton asChild >
            <Settings size={20} />
          </SidebarMenuButton>
          <SidebarMenuButton asChild >
            <LogOut size={20} />
          </SidebarMenuButton>
        </div>

      </SidebarContent>
    </Sidebar>

  )
}

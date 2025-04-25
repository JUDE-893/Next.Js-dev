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

// main compo
function Menu({children}) {

  return (
    <DropdownMenu>

<DropdownMenuContent className="w-56 mr-1">

  <DropdownMenuGroup>

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
    <DropdownMenuItem>Invite</DropdownMenuItem>
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
    <DropdownMenuItem>
      Add to group
      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuGroup>

  <DropdownMenuSeparator />

  <DropdownMenuSub>
    <DropdownMenuSubTrigger>Settings</DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
      <DropdownMenuItem>Mode distraction</DropdownMenuItem>
      <DropdownMenuItem>Clear discussion</DropdownMenuItem>
      <DropdownMenuItem>Export discussion</DropdownMenuItem>
        <DropdownMenuItem>Report</DropdownMenuItem>
        <DropdownMenuItem>Block</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>

</DropdownMenuContent>
    </DropdownMenu>
  )
}

function DropDownTrigger({children}) {
  return (
    <DropdownMenuTrigger asChild>
      {children}
    </DropdownMenuTrigger>
  )
}

function MenuItem({name,callBack,kbd}) {
  return (
    <DropdownMenuItem>
      {name}
      <DropdownMenuShortcut>{kbd}</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

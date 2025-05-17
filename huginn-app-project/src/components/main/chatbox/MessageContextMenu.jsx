import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"



export default function MessageContextMenu({children, id}) {

  return (
    <ContextMenu>
      <ContextMenuTrigger className=" items-center justify-center">
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">

        <ContextMenuItem inset>
          Responde
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem inset>
          Responde in private
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem inset disabled>
          React
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem inset>
          Share
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem inset>
          Copy
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem inset>
          Save
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem inset>
          Pin
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem inset>
          Delete
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem inset>
          Repport
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

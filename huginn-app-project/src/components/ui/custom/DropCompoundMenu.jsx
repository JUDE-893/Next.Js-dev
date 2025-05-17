
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

// main compo
function Menu({children, options, className}) {
  
  return (
    <DropdownMenu >
      {/* trigger*/}
      {children}
      <DropdownMenuContent className={"w-56 "+className} >
        <DropdownMenuGroup>
          <Body options={options} />
        </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Trigger({children}) {
  return (
    <DropdownMenuTrigger asChild>
      {children}
    </DropdownMenuTrigger>
  )
}

function Item({name,callBack,kbd}) {
  return (
    <DropdownMenuItem >
      {name}
      {kbd && <DropdownMenuShortcut>{kbd}</DropdownMenuShortcut>}
    </DropdownMenuItem>
  )
}

/* drop down menu body component that revieces a list of options and display them
<arg> : [
          {name,callBack,kbd},
          'sep'
          ...
          {name,callBack,kbd}
        ]
*/
function Body ({options=[{name:'no options', callBack:() => {return 1}}]}) {
  console.log(options);
  return (
    <>
      {options.map((op,ind) => {

        if (op === 'sep') return <DropdownMenuSeparator key={ind} />

        return <DropdownMenuItem  className='text-muted-foreground' key={ind} onSelect={(e) => {e.preventDefault(); op.callBack()}}>
                {op.name}
                {op.kbd && <DropdownMenuShortcut>{op.kbd}</DropdownMenuShortcut>}
               </DropdownMenuItem>
      })}
    </>
  )
}

Menu.Body = Body;
Menu.Trigger = Trigger;

export default Menu

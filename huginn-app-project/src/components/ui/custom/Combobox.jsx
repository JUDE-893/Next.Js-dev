"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"


const labels = [
  {
    name: "Jonnas Schmidtmann",
    id: "fe425d6de000p7",
    nameTag: "JS",
    profileImage: null,
    message: {content : 'That\'s good', time: "7:14"},
    status: "online",
    userSlag: '@jonas_schmidtmann'
  },
  {
    name: "Jonnas Schmidtmann",
    id: "fe425d6dp400p7",
    nameTag: "JS",
    profileImage: null,
    message: {content : 'That\'s good', time: "7:14"},
    status: "online",
    userSlag: '@jonas_schmidtmann'
  },
  {
    name: "Jonnas Schmidtmann",
    id: "fe425d6de400p8",
    nameTag: "JS",
    profileImage: null,
    message: {content : 'That\'s good', time: "7:14"},
    status: "online",
    userSlag: '@jonas_schmidtmann'
  },
  {
    name: "Jonnas Schmidtmann",
    id: "fe425d6de40097",
    nameTag: "JS",
    profileImage: null,
    message: {content : 'That\'s good', time: "7:14"},
    status: "online",
    userSlag: '@jonas_schmidtmann'
  }
]

export default function Combobox({children, className, callBack}) {

  const [selected, setSelected] = React.useState([])


  return (
     <span >
      <Command className={className}>
        <CommandInput
          placeholder="Filter label..."
          autoFocus={true}
          className="h-9"
        />
        <CommandList>
          <CommandEmpty>No label found.</CommandEmpty>
          <CommandGroup>
            {labels.map((label,i) => (
              <CommandItem
                key={label}
                value={label}
                onSelect={(value) => {
                  if (selected.includes(value)) {
                    let labs = selected.filter((sel) => sel !== value )
                    setSelected([...labs])
                  }else {
                    setSelected([...selected, value]);
                  }


                }}
              >
                <span className='flex w-full bg-background items-center gap-4'>
                  <Checkbox type='checkbox' id={i} />
                  <label htmlFor={i} className="w-full"><p>{
                    React.cloneElement(children, {contact: label})
                  }</p></label>
                </span>

              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </span>
  )
}

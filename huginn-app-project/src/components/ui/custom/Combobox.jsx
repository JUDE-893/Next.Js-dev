"use client"

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export default function Combobox({children, className, callBack,type='multiple', handleSelect, labels}) {


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
            <RadioGroup>
              {labels.map((label,i) => (
                <CommandItem
                  key={label._id}
                  value={`${label?.contact.name}-${label._id}`}
                  onSelect={handleSelect()}
                >
                  <span className='flex w-full bg-background items-center gap-4'>
                    {type === 'multiple'? <Checkbox type='checkbox' id={i} /> : <RadioGroupItem id={i} value={i} />}
                    <label htmlFor={i} className="w-full"><p>{
                      React.cloneElement(children, {contact: label.contact})
                    }</p></label>
                  </span>

                </CommandItem>
              ))}
            </RadioGroup>
          </CommandGroup>
        </CommandList>
      </Command>
    </span>
  )
}

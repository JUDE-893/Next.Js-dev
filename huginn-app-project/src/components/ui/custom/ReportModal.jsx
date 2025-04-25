import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Select from './Select'

export default function DialogCloseButton({children, label, message, callBack, options}) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="small" variant="gost" className='px-0 py-0'>{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription className='text-xs'>
            {message}
          </DialogDescription>
        </DialogHeader>
        {/* Body */}
        <div className=" flex flex-col items-center gap-6 px-3 mt-2">
          <Select options={options} className=' w-full' />
          <div className="grid flex-1 gap-2 w-full">

            <Label className='ml-2' htmlFor="message">Additional Information</Label>
            <Textarea placeholder="Explain why you're reporting this content..." id="message" />

          </div>

        </div>
        {/* Footer */}
        <DialogFooter className="sm:justify-start">
          <Button onClick={callBack} type="submit" size="sm" className="px-3">
            Submit
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

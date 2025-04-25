import { Separator } from "@/components/ui/separator"

export default function DateSeparator({date, className}) {

  return (
    <div className='flex m-50 w-12'>
      <Separator />
        <p className="text-muted mb-1 text-xs">{date}</p>
      <Separator />
    </div>
  )
}

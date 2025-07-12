
import { useState } from 'react';
import { useMessageFeats } from './MessageFeatsProvider'
import Dialog from '@/components/ui/custom/AlertDialog'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
export default function DeleteMessageModal() {

  const [deleteFor, setDeleteFor] = useState("user");
  const { deleteFn } = useMessageFeats()

  const handleDelete = () => {
    deleteFn(deleteFor)
  }

  return (
    <Dialog trigger="Delete"
      label='Are you sure you want to delete this message?'
      callBack={handleDelete}
      disabled={false}
      modal={false}
      >
      <RadioGroup
        value={deleteFor}
        onValueChange={setDeleteFor}
        className='flex flex-cols gap-14 mt-6 mb-3'
      >
        <div className='flex flex-cols gap-3 '>
          <RadioGroupItem id='all' value="all"/>
          <label htmlFor='all'>Delete for everyone</label>
        </div>
        <div className='flex flex-cols gap-3'>
          <RadioGroupItem id='user' value="user"/>
          <label htmlFor='user'>Delete for me</label>
        </div>
      </RadioGroup>
    </Dialog>
  )
}

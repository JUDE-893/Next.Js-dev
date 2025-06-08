"use client"


import { useCreateTask } from '@/hooks/useTask';
import TaskForm from '@/components/custom/task-form'

export default function Page() {

  const {isPending, mutate, updateError} = useCreateTask();

  return (
    <div className=' absolute bg-stone-600 w-full h-screen'>
      <TaskForm  submitFn={mutate}/>
    </div>
  )
}

"use client"

import { useParams } from "next/navigation";
import { useGetTask, useUpdateTask } from '@/hooks/useTask';
import TaskForm from '@/components/custom/task-form'

export default function Page() {

  const params = useParams()
  console.log("params",params);
  const {isLoading, data, error} = useGetTask(params?.taskId);
  const {isPending, mutate, updateError} = useUpdateTask();

  return (
    <div className=' absolute bg-stone-600 w-full h-screen'>
      <TaskForm initialValues={data?.task} submitFn={mutate}/>
    </div>
  )
}

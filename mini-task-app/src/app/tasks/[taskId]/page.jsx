"use client"

import { useParams } from "next/navigation";
import { useGetTask, useDeleteTask } from '@/hooks/useTask';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function Page() {

  const params = useParams()
  const {isLoading, data, error} = useGetTask(params.taskId);
  const {isPending, mutate, DeleteError} = useDeleteTask();

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{data?.task?.title}</h1>
          <p className="text-muted-foreground">{data?.task?.description}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-5">Task Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Due Date:</span> June 30, 2024
                </div>
                <div>
                  <span className="font-medium">Priority:</span> {data?.task?.priority}
                </div>
                <div>
                  <span className="font-medium">Difficulty:</span> {data?.task?.difficulty}
                </div>
                <div>
                  <span className="font-medium">Duration (day):</span> {data?.task?.durationDays ? Math.abs(data?.task?.durationDays) : '--'}
                </div>
                <div>
                  <span className="font-medium">Team Size: </span> {data?.task?.groupSize ? Math.abs(data?.task?.groupSize) : ' --' }
                </div>
                <div>
                  <span className="font-medium">Assigned To:</span> {data?.task?.responsible ?  data?.task?.responsible?.map((p) => p.name)?.join(', ') : '--'}
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-medium">More About</h3>
              <p className="text-muted-foreground text-xs">{data?.task?.summary}</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-2 text-sm mt-5">
            <Button className='hover:bg-black-100'><Link href="/"><ArrowLeft className=''/></Link></Button>
            <Button className='bg-stone-600'><Link href={`${data?.task?._id}/update`}>Update</Link></Button>
            <Button className='bg-red-400' onClick={() => mutate(data?.task?._id)}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

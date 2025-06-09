'use client'

import path from "path"
import { useGetTasks } from '@/hooks/useTask';
import Image from "next/image";

import { columns } from "@/components/custom/columns";
import { DataTable } from "@/components/custom/data-table";
import { UserNav } from "@/components/custom/user-nav";
import { ModeToggle } from "@/components/custom/ThemeSwitcher";
import AnimateText from "@/components/custom/AnimateText";
import Spinner from "@/components/custom/Spinner";
import { Moon } from 'lucide-react'
// import { taskSchema } from "./data/schema";




export default function TaskPage() {

  const {isLoading, data, error} = useGetTasks();

  if (isLoading) return <Spinner/>

  return (
    <>
      <div className="md:hidden">

        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight"><AnimateText text='Welcome back!' /></h2>
            <p className="text-muted-foreground">
              <AnimateText text='Here&apos;s a list of your tasks for this month!' />
            </p>
          </div>
          <div className="flex items-center space-x-2 gap-3">
            <ModeToggle className="" />
            <UserNav />
          </div>
        </div>
        <DataTable data={data?.tasks ?? []} columns={columns} />
      </div>
    </>
  )
}

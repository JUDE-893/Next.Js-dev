"use client"

import { X, Plus } from "lucide-react"

import {useRouter} from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/custom/data-table-view-options"

import { priorities, statuses } from "@/dev-data/data"
import { DataTableFacetedFilter } from "@/components/custom/data-table-faceted-filter"

export function DataTableToolbar({
  table,
}) {
  const router = useRouter();
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <Button
        variant="outline"
        onClick={() => router.push('/tasks/new')}
        className="h-8 px-2 lg:px-3 mr-2"
      >
        <Plus /> ADD
      </Button>
      <DataTableViewOptions table={table} />
    </div>
  )
}

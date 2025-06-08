"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"

// Validation schema based on the Mongoose schema
const validationSchema = {
  title: {
    required: "The task title is required",
    minLength: {
      value: 10,
      message: "The task title must be more than 10 characters long",
    },
    maxLength: {
      value: 40,
      message: "The task title must be less than 40 characters long",
    },
    validate: {
      trimmed: (value) => value.trim().length >= 10 || "Title cannot be just whitespace",
    },
  },
  duration: {
    required: "Duration is required",
    min: {
      value: 1,
      message: "Duration must be at least 1",
    },
    max: {
      value: 365,
      message: "Duration cannot exceed 365 days",
    },
  },
  maxGroupSize: {
    required: "Max group size is required",
    min: {
      value: 1,
      message: "Max group size must be at least 1",
    },
    max: {
      value: 6,
      message: "Max group size cannot exceed 6",
    },
  },
  difficulty: {
    required: "Difficulty is required",
    validate: {
      validOption: (value) =>
        ["easy", "medium", "difficult"].includes(value) || "The difficulty must be either easy, medium or difficult",
    },
  },
  priority: {
    required: "Priority is required",
    validate: {
      validOption: (value) =>
        ["low", "medium", "high"].includes(value) || "The priority must be either low, medium or high",
    },
  },
  summary: {
    maxLength: {
      value: 200,
      message: "Summary cannot exceed 200 characters",
    },
  },
  description: {
    maxLength: {
      value: 1000,
      message: "Description cannot exceed 1000 characters",
    },
  },
  startDate: {
    required: "Start date is required",
    validate: {
      notInPast: (value) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const selectedDate = new Date(value)
        return selectedDate >= today || "Start date cannot be in the past"
      },
    },
  },
  finishDate: {
    required: "Finish date is required",
  },
  responsible: {
    validate: {
      notEmpty: (value) => value.length > 0 || "At least one responsible person is required",
    },
  },
}

// Mock users data - in real app, this would come from an API
const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com" },
  { id: "4", name: "Alice Brown", email: "alice@example.com" },
  { id: "5", name: "Charlie Wilson", email: "charlie@example.com" },
]

export default function TaskForm({submitFn, initialValues}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: initialValues ?? {
      title: "",
      duration: 1,
      maxGroupSize: 1,
      difficulty: "medium",
      priority: "medium",
      summary: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      finishDate: new Date().toISOString().split("T")[0],
      responsible: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "responsible",
  })

  const startDate = watch("startDate")
  const finishDate = watch("finishDate")

  // Validate that finish date is after start date
  const validateFinishDate = (value) => {
    if (!startDate || !value) return true
    return new Date(value) > new Date(startDate) || "Finish date must be after start date"
  }

  const onSubmit = async (data) => {
    try {
      // Trim string fields
      const processedData = {
        ...data,
        title: data.title.trim(),
        summary: data.summary?.trim() || "",
        description: data.description?.trim() || "",
      }

      // Simulate API call
      submitFn(processedData, initialValues?._id);
      console.log("Task created:", processedData)
      alert("Task created successfully!")
    } catch (error) {
      console.error("Submission error:", error)
      alert("Failed to create task. Please try again.")
    }
  }

  const addResponsiblePerson = (userId) => {
    const user = mockUsers.find((u) => u.id === userId)
    if (user && !fields.find((f) => f.userId === userId)) {
      append({ userId: user.id, name: user.name, email: user.email })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{`${initialValues ? 'Update' : 'Create New'} Task`}</CardTitle>
          <CardDescription>Fill out the form below to {`${initialValues ? 'update' : 'create new'}`} task</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter task title (10-40 characters)"
                {...register("title", validationSchema.title)}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            {/* Duration and Max Group Size Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (days) *</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="365"
                  {...register("duration", {
                    ...validationSchema.duration,
                    valueAsNumber: true,
                  })}
                  className={errors.duration ? "border-red-500" : ""}
                />
                {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxGroupSize">Max Group Size *</Label>
                <Input
                  id="maxGroupSize"
                  type="number"
                  min="1"
                  max="6"
                  {...register("maxGroupSize", {
                    ...validationSchema.maxGroupSize,
                    valueAsNumber: true,
                  })}
                  className={errors.maxGroupSize ? "border-red-500" : ""}
                />
                {errors.maxGroupSize && <p className="text-sm text-red-500">{errors.maxGroupSize.message}</p>}
              </div>
            </div>

            {/* Difficulty and Priority Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty *</Label>
                <Select onValueChange={(value) => setValue("difficulty", value)} defaultValue="medium">
                  <SelectTrigger className={errors.difficulty ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="difficult">Difficult</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("difficulty", validationSchema.difficulty)} />
                {errors.difficulty && <p className="text-sm text-red-500">{errors.difficulty.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select onValueChange={(value) => setValue("priority", value)} defaultValue="medium">
                  <SelectTrigger className={errors.priority ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("priority", validationSchema.priority)} />
                {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
              </div>
            </div>

            {/* Start Date and Finish Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  {...register("startDate", validationSchema.startDate)}
                  className={errors.startDate ? "border-red-500" : ""}
                />
                {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="finishDate">Finish Date *</Label>
                <Input
                  id="finishDate"
                  type="date"
                  {...register("finishDate", {
                    ...validationSchema.finishDate,
                    validate: validateFinishDate,
                  })}
                  className={errors.finishDate ? "border-red-500" : ""}
                />
                {errors.finishDate && <p className="text-sm text-red-500">{errors.finishDate.message}</p>}
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                placeholder="Brief summary of the task (max 200 characters)"
                rows={3}
                {...register("summary", validationSchema.summary)}
                className={errors.summary ? "border-red-500" : ""}
              />
              {errors.summary && <p className="text-sm text-red-500">{errors.summary.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the task (max 1000 characters)"
                rows={4}
                {...register("description", validationSchema.description)}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            {/* Responsible People */}
            <div className="space-y-2">
              <Label>Responsible People *</Label>
              <div className="space-y-2">
                <Select onValueChange={addResponsiblePerson}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add responsible person" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers
                      .filter((user) => !fields.find((f) => f.userId === user.id))
                      .map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                {fields.length > 0 && (
                  <div className="space-y-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div>
                          <p className="font-medium">{field.name}</p>
                          <p className="text-sm text-gray-600">{field.email}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input type="hidden" {...register("responsible", validationSchema.responsible)} />
              {errors.responsible && <p className="text-sm text-red-500">{errors.responsible.message}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting || !isValid}>
              {isSubmitting ? `${initialValues ? 'Updating' : 'Creating'} Task...` : `${initialValues ? 'Update' : 'Create'} Task`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

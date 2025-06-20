"use client"

import type React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { FormField } from "@/lib/store"
import { FormFieldRenderer } from "./form-field-renderer"
import { useFormStore } from "@/lib/store"
import { GripVertical, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SortableFormFieldProps {
  field: FormField
}

export function SortableFormField({ field }: SortableFormFieldProps) {
  const { selectedFieldId, selectField, deleteField } = useFormStore()
  const isSelected = selectedFieldId === field.id

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
    data: {
      type: "field",
      field: field,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative bg-white rounded-xl border-2 transition-all duration-200",
        isSelected
          ? "border-green-500 shadow-lg ring-2 ring-green-100"
          : "border-slate-200 hover:border-slate-300 hover:shadow-md",
        isDragging && "opacity-50 shadow-2xl z-50 rotate-1 scale-105",
      )}
      onClick={() => selectField(field.id)}
    >
      {/* Required field indicator */}
      {field.required && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center z-10">
          <span className="text-white text-xs font-bold">*</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
        <button
          className="h-8 w-8 p-0 cursor-grab active:cursor-grabbing bg-white shadow-lg hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-md flex items-center justify-center cursor-pointer"
          {...attributes}
          {...listeners}
          title="Drag to reorder"
        >
          <GripVertical className="h-4 w-4 text-slate-500" />
        </button>
      </div>

      <div className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex flex-col space-y-1">
        <button
          className="h-8 w-8 p-0 bg-white shadow-lg text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-md flex items-center justify-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            deleteField(field.id)
          }}
          title="Delete field"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="p-6">
        <FormFieldRenderer field={field} />
      </div>
    </div>
  )
}

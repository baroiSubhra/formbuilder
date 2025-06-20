"use client"

import { useFormStore } from "@/lib/store"
import { SortableFormField } from "./sortable-form-field"
import { FormPreview } from "./form-preview"
import { FormInput } from "lucide-react"

export function FormCanvas() {
  const { fields, previewMode } = useFormStore()

  if (previewMode) {
    return <FormPreview />
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Form Builder</h2>
          <p className="text-slate-600">Click components from the sidebar to build your form</p>
        </div>

        <div className="min-h-[400px]">
          {fields.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors duration-200">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors duration-200">
                  <FormInput className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Start building your form</h3>
                  <p className="text-slate-500">Click a component from the sidebar to add it to your form</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field) => (
                <SortableFormField key={field.id} field={field} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

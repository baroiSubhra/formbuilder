"use client"

import { useFormStore } from "@/lib/store"
import { FormFieldRenderer } from "./form-field-renderer"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "sonner"

export function FormPreview() {
  const { fields } = useFormStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  })

  const onSubmit = async (data: Record<string, unknown>) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-slate-950 p-4 overflow-auto max-h-[400px]">
            <code className="text-white block">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    } catch (error) {
      console.error("Form submission error:", error)
      toast("Failed to submit the following values:", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    } finally {
      setIsSubmitting(false)
    }
  }


  if (fields.length === 0) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No fields to preview</h3>
          <p className="text-gray-500">Add some fields to your form to see the preview</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl border-0">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Form Preview</h2>
            <p className="text-slate-600">This is how your form will appear to users</p>
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="transition-all duration-200 p-2 rounded-lg">
                  <FormFieldRenderer
                    field={field}
                    preview={true}
                    register={register}
                    error={errors[field.id]?.message as string}
                    setValue={setValue}
                    watch={watch}
                  />
                </div>
              ))}

              <div className="pt-6 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Form"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

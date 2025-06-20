"use client"

import { useFormStore } from "@/lib/store"
import { FormFieldRenderer } from "./form-field-renderer"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"

export function FormPreview() {
  const { fields } = useFormStore()
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form submitted:", data)
      setSubmitStatus("success")
      setTimeout(() => {
        reset()
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200 p-6">
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
                {submitStatus === "success" && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">Form submitted successfully!</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-800 font-medium">Error submitting form. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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

"use client"

import type { FormField } from "@/lib/store"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FormFieldRendererProps {
  field: FormField
  preview?: boolean
  register?: any
  error?: string
  setValue?: (name: string, value: any) => void
  watch?: (name: string) => any
}

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const FormFieldRenderer = forwardRef<HTMLElement, FormFieldRendererProps>(
  ({ field, preview = false, register, error }, ref) => {
    const fieldName = field.id

    const renderField = () => {
      switch (field.type) {
        case "text":
          return (
            <div className="space-y-1">
              <input
                ref={ref as React.RefObject<HTMLInputElement>}
                {...(register &&
                  register(fieldName, {
                    required: field.required ? `${field.label} is required` : false,
                    minLength: field.validation?.minLength
                      ? {
                        value: field.validation.minLength,
                        message: `Minimum length is ${field.validation.minLength} characters`,
                      }
                      : undefined,
                    maxLength: field.validation?.maxLength
                      ? {
                        value: field.validation.maxLength,
                        message: `Maximum length is ${field.validation.maxLength} characters`,
                      }
                      : undefined,
                  }))}
                placeholder={field.placeholder}
                disabled={!preview}
                className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                  !preview && "pointer-events-none bg-gray-50",
                  error && "border-red-500 focus:ring-red-500",
                )}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          )

        case "textarea":
          return (
            <div className="space-y-1">
              <textarea
                ref={ref as React.RefObject<HTMLTextAreaElement>}
                {...(register &&
                  register(fieldName, {
                    required: field.required ? `${field.label} is required` : false,
                    minLength: field.validation?.minLength
                      ? {
                        value: field.validation.minLength,
                        message: `Minimum length is ${field.validation.minLength} characters`,
                      }
                      : undefined,
                    maxLength: field.validation?.maxLength
                      ? {
                        value: field.validation.maxLength,
                        message: `Maximum length is ${field.validation.maxLength} characters`,
                      }
                      : undefined,
                  }))}
                placeholder={field.placeholder}
                disabled={!preview}
                rows={4}
                className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none",
                  !preview && "pointer-events-none bg-gray-50",
                  error && "border-red-500 focus:ring-red-500",
                )}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          )

        case "select":
          return (
            <div className="space-y-1">
              <select
                ref={ref as React.RefObject<HTMLSelectElement>}
                {...(register &&
                  register(fieldName, {
                    required: field.required ? `${field.label} is required` : false,
                  }))}
                disabled={!preview}
                className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                  !preview && "pointer-events-none bg-gray-50",
                  error && "border-red-500 focus:ring-red-500",
                )}
              >
                <option value="">{field.placeholder || "Select an option"}</option>
                {field.options?.map((option, index) => (
                  <option key={index} value={option.toLowerCase().replace(/\s+/g, "-")}>
                    {option}
                  </option>
                ))}
              </select>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          )

        case "checkbox":
          return (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <input
                  ref={ref as React.RefObject<HTMLInputElement>}
                  type="checkbox"
                  id={field.id}
                  disabled={!preview}
                  {...(register &&
                    register(fieldName, {
                      required: field.required ? `${field.label} must be checked` : false,
                    }))}
                  className={cn(
                    "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
                    !preview && "pointer-events-none",
                    error && "border-red-500",
                  )}
                />
                <label
                  htmlFor={field.id}
                  className={cn("text-sm font-medium text-gray-700", !preview && "pointer-events-none")}
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          )

        case "radio":
          return (
            <div className="space-y-1">
              <div className={cn("space-y-2", !preview && "pointer-events-none")}>
                {field.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      ref={index === 0 ? ref as React.RefObject<HTMLInputElement> : undefined}
                      type="radio"
                      id={`${field.id}-${index}`}
                      value={option.toLowerCase().replace(/\s+/g, "-")}
                      {...(register &&
                        register(fieldName, {
                          required: field.required ? `${field.label} is required` : false,
                        }))}
                      className={cn(
                        "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300",
                        error && "border-red-500",
                      )}
                    />
                    <label htmlFor={`${field.id}-${index}`} className="text-sm text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          )

        case "number":
          return (
            <div className="space-y-1">
              <input
                ref={ref as React.RefObject<HTMLInputElement>}
                type="number"
                {...(register &&
                  register(fieldName, {
                    required: field.required ? `${field.label} is required` : false,
                    valueAsNumber: true,
                  }))}
                placeholder={field.placeholder}
                disabled={!preview}
                className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                  !preview && "pointer-events-none bg-gray-50",
                  error && "border-red-500 focus:ring-red-500",
                )}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          )

        case "email":
          return (
            <div className="space-y-1">
              <input
                ref={ref as React.RefObject<HTMLInputElement>}
                type="email"
                {...(register &&
                  register(fieldName, {
                    required: field.required ? `${field.label} is required` : false,
                    pattern: {
                      value: EMAIL_REGEX,
                      message: "Invalid email address",
                    },
                  }))}
                placeholder={field.placeholder || "Enter your email"}
                disabled={!preview}
                className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                  !preview && "pointer-events-none bg-gray-50",
                  error && "border-red-500 focus:ring-red-500",
                )}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          )

        default:
          return null
      }
    }

    return (
      <div className="space-y-2">
        {field.type !== "checkbox" && (
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {renderField()}
      </div>
    )
  },
)

FormFieldRenderer.displayName = "FormFieldRenderer"
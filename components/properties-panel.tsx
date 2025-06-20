"use client"

import { useFormStore } from "@/lib/store"
import { Plus, X } from "lucide-react"
import { useState } from "react"

export function PropertiesPanel() {
  const { fields, selectedFieldId, updateField } = useFormStore()
  const selectedField = fields.find((f) => f.id === selectedFieldId)
  const [newOption, setNewOption] = useState("")

  if (!selectedField) {
    return (
      <div className="w-80 bg-white border-l border-slate-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Properties</h2>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚙️</span>
          </div>
          <p className="text-slate-500">Select a field to edit its properties</p>
        </div>
      </div>
    )
  }

  const handleUpdateField = (updates: Partial<typeof selectedField>) => {
    updateField(selectedField.id, updates)
  }

  const addOption = () => {
    if (newOption.trim() && selectedField.options) {
      handleUpdateField({
        options: [...selectedField.options, newOption.trim()],
      })
      setNewOption("")
    }
  }

  const removeOption = (index: number) => {
    if (selectedField.options) {
      const newOptions = selectedField.options.filter((_, i) => i !== index)
      handleUpdateField({ options: newOptions })
    }
  }

  const updateOption = (index: number, value: string) => {
    if (selectedField.options) {
      const newOptions = [...selectedField.options]
      newOptions[index] = value
      handleUpdateField({ options: newOptions })
    }
  }

  return (
    <div className="w-80 bg-white border-l border-slate-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Field Properties</h2>
        <span className="text-sm text-slate-500 capitalize bg-slate-100 px-2 py-1 rounded-full">
          {selectedField.type} Field
        </span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="field-label" className="block text-sm font-medium text-gray-700">
            Label
          </label>
          <input
            id="field-label"
            type="text"
            value={selectedField.label}
            onChange={(e) => handleUpdateField({ label: e.target.value })}
            placeholder="Field label"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {selectedField.type !== "checkbox" && (
          <div className="space-y-2">
            <label htmlFor="field-placeholder" className="block text-sm font-medium text-gray-700">
              Placeholder
            </label>
            <input
              id="field-placeholder"
              type="text"
              value={selectedField.placeholder || ""}
              onChange={(e) => handleUpdateField({ placeholder: e.target.value })}
              placeholder="Placeholder text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <label htmlFor="field-required" className="text-sm font-medium text-gray-700">
            Required Field
          </label>
          <input
            id="field-required"
            type="checkbox"
            checked={selectedField.required}
            onChange={(e) => handleUpdateField({ required: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        {(selectedField.type === "select" || selectedField.type === "radio") && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            <div className="space-y-2">
              {selectedField.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => removeOption(index)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md border border-red-200 hover:border-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="New option"
                onKeyPress={(e) => e.key === "Enter" && addOption()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={addOption}
                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md border border-green-200 hover:border-green-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {(selectedField.type === "text" || selectedField.type === "textarea") && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Validation</label>
            <div className="space-y-3 p-3 bg-slate-50 rounded-lg">
              <div className="space-y-2">
                <label htmlFor="min-length" className="block text-xs text-gray-600">
                  Minimum Length
                </label>
                <input
                  id="min-length"
                  type="number"
                  value={selectedField.validation?.minLength || ""}
                  onChange={(e) =>
                    handleUpdateField({
                      validation: {
                        ...selectedField.validation,
                        minLength: e.target.value ? Number.parseInt(e.target.value) : undefined,
                      },
                    })
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="max-length" className="block text-xs text-gray-600">
                  Maximum Length
                </label>
                <input
                  id="max-length"
                  type="number"
                  value={selectedField.validation?.maxLength || ""}
                  onChange={(e) =>
                    handleUpdateField({
                      validation: {
                        ...selectedField.validation,
                        maxLength: e.target.value ? Number.parseInt(e.target.value) : undefined,
                      },
                    })
                  }
                  placeholder="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useFormStore } from "@/lib/store"
import { Eye, Edit3, Trash2, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function BuilderHeader() {
  const { previewMode, togglePreviewMode, clearForm, fields } = useFormStore()
  const router = useRouter()
  const [isNavigatingHome, setIsNavigatingHome] = useState(false)

  const handleHomeNavigation = async () => {
    setIsNavigatingHome(true)
    try {
      router.push("/")
    } catch (error) {
      console.error("Navigation error:", error)
      setIsNavigatingHome(false)
    }
  }

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleHomeNavigation}
            disabled={isNavigatingHome}
            className="text-xl font-bold text-slate-900 hover:text-green-600 transition-colors p-0 h-auto bg-transparent border-none cursor-pointer"
          >
            {isNavigatingHome ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>FormKit</span>
              </div>
            ) : (
              "FormKit"
            )}
          </button>
          <div className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {fields.length} {fields.length === 1 ? "field" : "fields"}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={togglePreviewMode}
            className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-green-50 hover:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors cursor-pointer"
          >
            {previewMode ? (
              <>
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </>
            )}
          </button>

          <button
            onClick={clearForm}
            disabled={fields.length === 0 || previewMode}
            className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </header>
  )
}

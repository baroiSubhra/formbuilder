"use client"
import { FormInput, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function HomePage() {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleStartBuilding = async () => {
    setIsNavigating(true)
    try {
      await router.push("/builder")
    } catch (error) {
      console.error("Navigation error:", error)
      setIsNavigating(false)
    }
  }

  return (
    <main>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
              <FormInput className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">FormKit</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create beautiful, professional forms with our intuitive drag-and-drop builder. No coding required.
            </p>

            <button
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[160px] cursor-pointer"
              onClick={handleStartBuilding}
              disabled={isNavigating}
            >
              {isNavigating ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Start Building"
              )}
            </button>
          </div>

          {isNavigating && (
            <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-8 shadow-2xl flex flex-col items-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                <p className="text-slate-700 font-medium">Loading Form Builder...</p>
                <p className="text-sm text-slate-500">Setting up your workspace</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>

  )
}

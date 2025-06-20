"use client"

import { useFormStore } from "@/lib/store"
import { Type, AlignLeft, ChevronDown, CheckSquare, Circle, Hash, Mail, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const componentTypes = [
  {
    type: "text" as const,
    label: "Text Input",
    icon: Type,
    description: "Single line text input",
    color: "bg-green-100 text-green-600",
  },
  {
    type: "textarea" as const,
    label: "Text Area",
    icon: AlignLeft,
    description: "Multi-line text input",
    color: "bg-green-100 text-green-600",
  },
  {
    type: "select" as const,
    label: "Select",
    icon: ChevronDown,
    description: "Dropdown selection",
    color: "bg-purple-100 text-purple-600",
  },
  {
    type: "checkbox" as const,
    label: "Checkbox",
    icon: CheckSquare,
    description: "Single checkbox",
    color: "bg-orange-100 text-orange-600",
  },
  {
    type: "radio" as const,
    label: "Radio Group",
    icon: Circle,
    description: "Multiple choice selection",
    color: "bg-pink-100 text-pink-600",
  },
  {
    type: "number" as const,
    label: "Number",
    icon: Hash,
    description: "Numeric input",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    type: "email" as const,
    label: "Email",
    icon: Mail,
    description: "Email address input",
    color: "bg-teal-100 text-teal-600",
  },
]

function ComponentButton({ component }: { component: (typeof componentTypes)[0] }) {
  const { addField } = useFormStore()
  const Icon = component.icon

  const handleClick = () => {
    const defaultConfigs = {
      text: {
        label: "Text Input Field",
        placeholder: "Enter text...",
        required: false,
      },
      textarea: {
        label: "Text Area Field",
        placeholder: "Enter your message...",
        required: false,
      },
      select: {
        label: "Select Field",
        placeholder: "Select an option",
        required: false,
        options: ["Option 1", "Option 2", "Option 3"],
      },
      checkbox: {
        label: "Checkbox Field",
        placeholder: "",
        required: false,
      },
      radio: {
        label: "Radio Group Field",
        placeholder: "",
        required: false,
        options: ["Option 1", "Option 2", "Option 3"],
      },
      number: {
        label: "Number Field",
        placeholder: "Enter a number",
        required: false,
      },
      email: {
        label: "Email Field",
        placeholder: "Enter your email",
        required: false,
      },
    }

    const config = defaultConfigs[component.type]

    const field = {
      type: component.type,
      label: config.label,
      placeholder: config.placeholder,
      required: config.required,
      ...("options" in config ? { options: config.options } : {}),
    }

    addField(field)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full p-4 text-left bg-white border border-gray-200 rounded-lg transition-all duration-200 group",
        "hover:bg-green-50 hover:border-green-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
      )}
    >
      <div className="flex items-start space-x-3">
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110",
            component.color,
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-slate-900 flex items-center justify-between">
            <span>{component.label}</span>
            <Plus className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:text-green-600" />
          </div>
          <div className="text-xs text-slate-500 mt-1">{component.description}</div>
        </div>
      </div>
    </button>
  )
}

export function ComponentSidebar() {
  return (
    <div className="w-80 bg-white border-r border-slate-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Form Components</h2>
        <p className="text-sm text-slate-500">Click components to add them to your form</p>
      </div>
      <div className="space-y-3">
        {componentTypes.map((component) => (
          <ComponentButton key={component.type} component={component} />
        ))}
      </div>
    </div>
  )
}

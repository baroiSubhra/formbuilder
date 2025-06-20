import { create } from "zustand"

export interface FormField {
  id: string
  type: "text" | "textarea" | "select" | "checkbox" | "radio" | "number" | "email"
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

interface FormStore {
  fields: FormField[]
  selectedFieldId: string | null
  previewMode: boolean
  addField: (field: Omit<FormField, "id">) => void
  updateField: (id: string, updates: Partial<FormField>) => void
  deleteField: (id: string) => void
  reorderFields: (startIndex: number, endIndex: number) => void
  selectField: (id: string | null) => void
  togglePreviewMode: () => void
  clearForm: () => void
}

export const useFormStore = create<FormStore>((set) => ({
  fields: [],
  selectedFieldId: null,
  previewMode: false,

  addField: (field) => {
    const newField: FormField = {
      ...field,
      id: `field${Date.now()}`,
    }
    set((state) => ({
      fields: [...state.fields, newField],
      selectedFieldId: newField.id,
    }))
  },

  updateField: (id, updates) => {
    set((state) => ({
      fields: state.fields.map((field) => (field.id === id ? { ...field, ...updates } : field)),
    }))
  },

  deleteField: (id) => {
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== id),
      selectedFieldId: state.selectedFieldId === id ? null : state.selectedFieldId,
    }))
  },

  reorderFields: (startIndex, endIndex) => {
    set((state) => {
      const newFields = [...state.fields]
      const [removed] = newFields.splice(startIndex, 1)
      newFields.splice(endIndex, 0, removed)
      return { fields: newFields }
    })
  },

  selectField: (id) => {
    set({ selectedFieldId: id })
  },

  togglePreviewMode: () => {
    set((state) => ({ previewMode: !state.previewMode }))
  },

  clearForm: () => {
    set({ fields: [], selectedFieldId: null })
  },
}))

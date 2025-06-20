"use client"

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useState } from "react"
import { ComponentSidebar } from "./component-sidebar"
import { FormCanvas } from "./form-canvas"
import { PropertiesPanel } from "./properties-panel"
import { BuilderHeader } from "./builder-header"
import { useFormStore } from "@/lib/store"

export function FormBuilder() {
  const { fields, reorderFields, previewMode } = useFormStore()
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      setActiveId(null)
      return
    }

    const oldIndex = fields.findIndex((field) => field.id === active.id)
    const newIndex = fields.findIndex((field) => field.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      reorderFields(oldIndex, newIndex)
    }

    setActiveId(null)
  }

  const activeField = fields.find((field) => field.id === activeId)

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <BuilderHeader />

      <div className="flex-1 flex overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {!previewMode && <ComponentSidebar />}

          <div className="flex-1 flex">
            <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              <FormCanvas />
            </SortableContext>

            {!previewMode && <PropertiesPanel />}
          </div>

          <DragOverlay>
            {activeField ? (
              <div className="bg-white p-4 rounded-xl shadow-2xl border-2 border-blue-300 opacity-95 backdrop-blur-sm transform rotate-1 scale-105">
                <div className="text-sm font-medium text-slate-700">{activeField.label}</div>
                <div className="text-xs text-slate-500 mt-1">Reordering field...</div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}

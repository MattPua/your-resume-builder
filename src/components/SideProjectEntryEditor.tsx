import { ArrowUpDown, ChevronDown, Eye, EyeOff, GripVertical, Trash2 } from 'lucide-react'
import { useState, useRef } from 'react'
import { Button } from './ui/button'
import { TextInput } from './TextInput'
import { SectionInput } from './SectionInput'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import type { SideProjectEntry } from '../types/resume'

interface SideProjectEntryEditorProps {
  entry: SideProjectEntry
  index: number
  onChange: (index: number, entry: SideProjectEntry) => void
  onDelete: (index: number) => void
  dragAttributes?: React.HTMLAttributes<HTMLButtonElement>
  dragListeners?: React.HTMLAttributes<HTMLButtonElement>
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const SideProjectEntryEditor = ({
  entry,
  index,
  onChange,
  onDelete,
  dragAttributes,
  dragListeners,
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
}: SideProjectEntryEditorProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(true)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = controlledOnOpenChange || setInternalIsOpen
  const bulletPointsRef = useRef<HTMLTextAreaElement>(null)
  const draftRef = useRef<HTMLTextAreaElement>(null)
  const handleFieldChange = (field: keyof SideProjectEntry, value: string | boolean) => {
    onChange(index, { ...entry, [field]: value })
  }

  const currentYear = new Date().getFullYear().toString()
  const isHidden = entry.visible === false

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={`border rounded-lg bg-gray-50 dark:bg-gray-900 ${isHidden ? 'border-primary/40 dark:border-primary/30 border-dashed opacity-60' : 'border-gray-200 dark:border-gray-700'}`}>
      <div className="p-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full mb-2 cursor-pointer">
          <div className="flex items-center gap-2">
            {dragListeners && dragAttributes && (
              <button
                type="button"
                className="cursor-grab active:cursor-grabbing touch-none"
                {...dragListeners}
                {...dragAttributes}
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
              </button>
            )}
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              {entry.title || `Side Project #${index + 1}`}
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFieldChange('visible', entry.visible === false);
              }}
              className="p-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              title={entry.visible !== false ? "Hide in preview" : "Show in preview"}
            >
              {entry.visible !== false ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(index)
              }}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              aria-label="Delete side project entry"
            >
              <Trash2 className="size-4" />
            </button>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col gap-4">
            <TextInput
              label="Project Title"
              value={entry.title}
              onChange={(value) => handleFieldChange('title', value)}
              placeholder="My Awesome Project"
            />
            <TextInput
              label="URL (optional)"
              type="url"
              value={entry.titleUrl || ""}
              onChange={(value) => handleFieldChange('titleUrl', value)}
              placeholder="https://project.com"
            />
            <div className="grid grid-cols-2 gap-3">
              <TextInput
                label="Start Date (Year)"
                value={entry.startDate}
                onChange={(value) => handleFieldChange('startDate', value)}
                placeholder="2020"
              />
              <TextInput
                label="End Date (Year or 'Now')"
                value={entry.endDate}
                onChange={(value) => handleFieldChange('endDate', value)}
                placeholder={`${currentYear} or Now`}
              />
            </div>
            <div className="flex flex-col gap-3">
              <SectionInput
                ref={bulletPointsRef}
                label="Bullet Points"
                value={entry.bulletPoints}
                onChange={(value) => handleFieldChange('bulletPoints', value)}
                placeholder="- Key feature or achievement\n- Technology used\n- Impact or result"
              />
              <div className="flex items-center justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentBulletPoints = bulletPointsRef.current?.value ?? "";
                    const currentDraft = draftRef.current?.value ?? "";
                    onChange(index, {
                      ...entry,
                      bulletPoints: currentDraft,
                      bulletPointsDraft: currentBulletPoints,
                    });
                  }}
                  title="Swap bullet points and draft"
                >
                  <ArrowUpDown className="size-4" />
                </Button>
              </div>
              <SectionInput
                ref={draftRef}
                label="Draft (not shown in preview)"
                value={entry.bulletPointsDraft || ""}
                onChange={(value) => handleFieldChange('bulletPointsDraft', value)}
                placeholder="Draft bullet points..."
              />
              <SectionInput
                label="Notes (not shown in preview)"
                value={entry.notes || ""}
                onChange={(value) => handleFieldChange('notes', value)}
                placeholder="Private notes..."
              />
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

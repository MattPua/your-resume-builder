import { ArrowUpDown, ChevronDown, Eye, EyeOff, Trash2 } from 'lucide-react'
import { useState, useRef } from 'react'
import { Button } from './ui/button'
import { TextInput } from './TextInput'
import { SectionInput } from './SectionInput'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import type { EducationEntry } from '../types/resume'

interface EducationEntryEditorProps {
  entry: EducationEntry
  index: number
  onChange: (index: number, entry: EducationEntry) => void
  onDelete: (index: number) => void
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const EducationEntryEditor = ({
  entry,
  index,
  onChange,
  onDelete,
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
}: EducationEntryEditorProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(true)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = controlledOnOpenChange || setInternalIsOpen
  const bulletPointsRef = useRef<HTMLTextAreaElement>(null)
  const draftRef = useRef<HTMLTextAreaElement>(null)
  const handleFieldChange = (field: keyof EducationEntry, value: string | boolean) => {
    onChange(index, { ...entry, [field]: value })
  }

  const currentYear = new Date().getFullYear().toString()
  const isHidden = entry.visible === false

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={`border rounded-lg bg-gray-50 dark:bg-gray-900 ${isHidden ? 'border-primary/40 dark:border-primary/30 border-dashed opacity-60' : 'border-gray-200 dark:border-gray-700'}`}>
      <div className="p-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full mb-2 cursor-pointer">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">
            Education #{index + 1}
          </h4>
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFieldChange('visible', entry.visible === false);
                  }}
                  className="p-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  {entry.visible !== false ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{entry.visible !== false ? "Hide in preview" : "Show in preview"}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(index)
                  }}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  aria-label="Delete education entry"
                >
                  <Trash2 className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete entry</p>
              </TooltipContent>
            </Tooltip>
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
              label="Degree"
              value={entry.degree}
              onChange={(value) => handleFieldChange('degree', value)}
              placeholder="Bachelor of Science"
            />
            <TextInput
              label="Institution"
              value={entry.institution}
              onChange={(value) => handleFieldChange('institution', value)}
              placeholder="University Name"
            />
            <TextInput
              label="URL (optional)"
              type="url"
              value={entry.institutionUrl || ""}
              onChange={(value) => handleFieldChange('institutionUrl', value)}
              placeholder="https://university.edu"
            />
            <div className="grid grid-cols-2 gap-3">
              <TextInput
                label="Start Date"
                value={entry.startDate}
                onChange={(value) => handleFieldChange('startDate', value)}
                placeholder="2020"
              />
              <TextInput
                label="End Date"
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
                placeholder="- Relevant coursework or achievements\n- Another point"
              />
              <div className="flex items-center justify-center">
                <Tooltip>
                  <TooltipTrigger asChild>
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
                    >
                      <ArrowUpDown className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Swap bullet points and draft</p>
                  </TooltipContent>
                </Tooltip>
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

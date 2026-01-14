import { FileText, Sparkles, Layout } from 'lucide-react'
import type { ResumeData } from '../types/resume'
import { BackgroundPreview } from './preview/BackgroundPreview'
import { ExperiencePreview } from './preview/ExperiencePreview'
import { HeaderPreview } from './preview/HeaderPreview'
import { PersonalPreview } from './preview/PersonalPreview'
import { SideProjectsPreview } from './preview/SideProjectsPreview'

interface ResumePreviewProps {
  data: ResumeData
  previewRef?: React.RefObject<HTMLDivElement | null>
}

export const ResumePreview = ({ data, previewRef }: ResumePreviewProps) => {
  const showHeader = data.sectionsVisible?.header !== false
  const showExperience = data.sectionsVisible?.experience !== false
  const showEducation = data.sectionsVisible?.education !== false
  const showSideProjects = data.sectionsVisible?.sideProjects !== false
  const showPersonal = data.sectionsVisible?.personal !== false
  const showSkills = data.sectionsVisible?.skills !== false

  const hasHeader =
    showHeader && (data.name || data.email || data.phone || data.website || data.github)
  
  const visibleExperience = showExperience && data.experience
    ? data.experience.filter((e) => e.visible !== false)
    : []
  
  const visibleEducation = showEducation && data.education
    ? data.education.filter((e) => e.visible !== false)
    : []
  
  const visibleSideProjects = showSideProjects && data.sideProjects
    ? data.sideProjects.filter((e) => e.visible !== false)
    : []

  const sectionOrder = data.sectionOrder || ["experience", "background", "sideProjects", "personal"]

  const hasContent =
    hasHeader ||
    visibleExperience.length > 0 ||
    visibleEducation.length > 0 ||
    visibleSideProjects.length > 0 ||
    (showPersonal && data.personal?.bulletPoints && data.personal.bulletPoints.trim() !== "") ||
    (showSkills && data.skills && data.skills.trim() !== "")

  const backgroundColor = data.sectionHeaderBackgroundColor || "#3b82f6"

  const renderSection = (sectionId: string) => {
    if (sectionId === "experience") {
      return (
        <div key="experience" data-pdf-section="experience">
          <ExperiencePreview entries={visibleExperience} title={data.sectionTitles?.experience} backgroundColor={backgroundColor} />
        </div>
      )
    }
    if (sectionId === "sideProjects") {
      return (
        <div key="sideProjects" data-pdf-section="sideProjects">
          <SideProjectsPreview entries={visibleSideProjects} title={data.sectionTitles?.sideProjects} backgroundColor={backgroundColor} />
        </div>
      )
    }
    if (sectionId === "personal") {
      if (!showPersonal) return null
      return (
        <div key="personal" data-pdf-section="personal">
          <PersonalPreview personal={data.personal} title={data.sectionTitles?.personal} backgroundColor={backgroundColor} />
        </div>
      )
    }
    if (sectionId === "background") {
      return (
        <div key="background" data-pdf-section="background">
          <BackgroundPreview
            education={visibleEducation}
            skills={data.skills}
            showSkills={showSkills}
            title={data.sectionTitles?.background}
            backgroundColor={backgroundColor}
          />
        </div>
      )
    }
    return null
  }

  return (
    <div
      ref={previewRef}
      className="resume-preview resume-preview-root bg-white text-gray-900 p-8"
      style={{
        width: '794px',
        minHeight: '1123px',
        backgroundColor: '#ffffff',
        color: '#111827',
        fontFamily: data.fontFamily || "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {hasHeader && (
        <div data-pdf-header>
          <HeaderPreview data={data} backgroundColor={backgroundColor} />
        </div>
      )}

      <div data-pdf-sections-container className="bg-white">
        {sectionOrder.map((sectionId) => renderSection(sectionId))}
      </div>

      {!hasContent && (
        <div className="flex flex-col items-center justify-center py-32 px-4 text-center animate-in fade-in zoom-in duration-500 h-full min-h-[600px]">
          <div className="relative mb-6">
            <div className="absolute -inset-4 rounded-full bg-primary/5 animate-pulse" />
            <div className="relative bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <FileText className="size-16 text-primary/20" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-100 p-2 rounded-full shadow-sm">
              <Sparkles className="size-5 text-yellow-600 animate-bounce" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Your Resume Awaits
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto text-lg leading-relaxed">
            Fill out the details in the editor to see your professional resume take shape in real-time.
          </p>
          <div className="mt-12 flex items-center gap-2.5 text-xs font-bold text-primary/40 uppercase tracking-[0.2em]">
            <div className="size-1.5 rounded-full bg-primary/40 animate-pulse" />
            Live Preview Active
          </div>
        </div>
      )}
    </div>
  )
}

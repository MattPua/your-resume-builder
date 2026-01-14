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
    (showPersonal && data.personal && data.personal.visible !== false && data.personal.bulletPoints) ||
    (showSkills && data.skills)

  const backgroundColor = data.sectionHeaderBackgroundColor || "#1e40af"

  const renderSection = (sectionId: string) => {
    if (sectionId === "experience") {
      return <ExperiencePreview key="experience" entries={visibleExperience} title={data.sectionTitles?.experience} backgroundColor={backgroundColor} />
    }
    if (sectionId === "sideProjects") {
      return <SideProjectsPreview key="sideProjects" entries={visibleSideProjects} title={data.sectionTitles?.sideProjects} backgroundColor={backgroundColor} />
    }
    if (sectionId === "personal") {
      return <PersonalPreview key="personal" personal={data.personal} title={data.sectionTitles?.personal} backgroundColor={backgroundColor} />
    }
    if (sectionId === "background") {
      return (
        <BackgroundPreview
          key="background"
          education={visibleEducation}
          skills={data.skills}
          showSkills={showSkills}
          title={data.sectionTitles?.background}
          backgroundColor={backgroundColor}
        />
      )
    }
    return null
  }

  return (
    <div
      ref={previewRef}
      className="resume-preview bg-white text-gray-900 p-8"
      style={{
        width: '794px',
        minHeight: '1123px',
        backgroundColor: '#ffffff',
        color: '#111827',
      }}
    >
      {hasHeader && <HeaderPreview data={data} />}

      {sectionOrder.map((sectionId) => renderSection(sectionId))}

      {!hasContent && (
        <div className="text-center text-gray-400 py-12">
          <p>Start adding content to see your resume preview</p>
        </div>
      )}
    </div>
  )
}

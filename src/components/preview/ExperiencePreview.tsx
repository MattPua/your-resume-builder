import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ExperienceEntry } from '../../types/resume'
import { SectionPreview } from './SectionPreview'

interface ExperiencePreviewProps {
  entries: ExperienceEntry[]
  title?: string
  backgroundColor?: string
}

export const ExperiencePreview = ({ entries, title = "Experience", backgroundColor }: ExperiencePreviewProps) => {
  if (entries.length === 0) return null

  return (
    <SectionPreview title={title} backgroundColor={backgroundColor}>
      <div>
        {entries.map((entry, index) => (
          <div key={index} className="mb-0">
                <div className="mb-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900" style={{ color: '#111827' }}>
                        {entry.title} {entry.company && (
                          <>
                            {" @ "}
                            {entry.companyUrl ? (
                              <a
                                href={entry.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#111827", textDecoration: "none" }}
                              >
                                {entry.company}
                              </a>
                            ) : (
                              entry.company
                            )}
                          </>
                        )}
                      </h3>
                    </div>
                    {(entry.startDate || entry.endDate) && (
                      <p className="text-sm text-gray-600 italic whitespace-nowrap" style={{ color: '#4b5563' }}>
                        {entry.startDate} {entry.endDate ? `- ${entry.endDate}` : ''}
                      </p>
                    )}
                  </div>
                </div>
            {entry.bulletPoints && (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {entry.bulletPoints}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionPreview>
  )
}

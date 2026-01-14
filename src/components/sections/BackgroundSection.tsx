import type { ResumeData } from "../../types/resume";
import { ErrorBoundary } from "../ErrorBoundary";
import { BackgroundEducationSubsection } from "./BackgroundEducationSubsection";
import { BackgroundSkillsSubsection } from "./BackgroundSkillsSubsection";
import { CollapsibleContent } from "../ui/collapsible";
import { SectionHeader } from "./SectionHeader";

interface BackgroundSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	attributes: React.HTMLAttributes<HTMLButtonElement>;
	listeners: React.HTMLAttributes<HTMLButtonElement>;
}

export const BackgroundSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	onOpenChange,
	attributes,
	listeners,
}: BackgroundSectionProps) => {
	const isVisible =
		resumeData.sectionsVisible?.education !== false ||
		resumeData.sectionsVisible?.skills !== false;
	const sectionTitle = resumeData.sectionTitles?.background || "Background";

	return (
		<ErrorBoundary
			fallback={
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-2">
						Background
					</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						This section encountered an error. Please refresh the page.
					</p>
				</div>
			}
		>
			<>
				<SectionHeader
					title={sectionTitle}
					isOpen={isOpen}
					attributes={attributes}
					listeners={listeners}
					visibilityControl="eye"
					visibilityProps={{
						isVisible,
						onToggle: () => {
							updateResumeData({
								sectionsVisible: {
									...resumeData.sectionsVisible,
									education: !isVisible,
									skills: !isVisible,
								},
							});
						},
					}}
					onTitleChange={(newTitle) => {
						updateResumeData({
							sectionTitles: {
								...resumeData.sectionTitles,
								background: newTitle,
							},
						});
					}}
				/>
			<CollapsibleContent>
				<div className="flex flex-col gap-3">
					<BackgroundSkillsSubsection
						resumeData={resumeData}
						updateResumeData={updateResumeData}
					/>
					<BackgroundEducationSubsection
						resumeData={resumeData}
						updateResumeData={updateResumeData}
					/>
				</div>
			</CollapsibleContent>
		</>
		</ErrorBoundary>
	);
};

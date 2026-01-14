import { useId } from "react";
import type { ResumeData } from "../../types/resume";
import { SectionInput } from "../SectionInput";
import { CollapsibleContent } from "../ui/collapsible";
import { SectionHeader } from "./SectionHeader";

interface SkillsSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	attributes: any;
	listeners: any;
}

export const SkillsSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	onOpenChange,
	attributes,
	listeners,
}: SkillsSectionProps) => {
	const skillsVisibleId = useId();
	const sectionTitle = resumeData.sectionTitles?.skills || "Skills";

	return (
		<>
			<SectionHeader
				title={sectionTitle}
				isOpen={isOpen}
				attributes={attributes}
				listeners={listeners}
				visibilityControl="checkbox"
				visibilityProps={{
					isVisible: resumeData.sectionsVisible?.skills !== false,
					onToggle: () => {
						updateResumeData({
							sectionsVisible: {
								...resumeData.sectionsVisible,
								skills: resumeData.sectionsVisible?.skills === false,
							},
						});
					},
					checkboxId: skillsVisibleId,
					checkboxLabel: "Show in preview",
				}}
				onTitleChange={(newTitle) => {
					updateResumeData({
						sectionTitles: {
							...resumeData.sectionTitles,
							skills: newTitle,
						},
					});
				}}
			/>
			<CollapsibleContent>
				<SectionInput
					label=""
					value={resumeData.skills}
					onChange={(value) => updateResumeData({ skills: value })}
					placeholder="- Skill 1\n- Skill 2\n- Skill 3"
				/>
			</CollapsibleContent>
		</>
	);
};

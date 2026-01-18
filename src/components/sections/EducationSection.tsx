import { Plus } from "lucide-react";
import { useId } from "react";
import type { EducationEntry, ResumeData } from "../../types/resume";
import { EducationEntryEditor } from "../EducationEntryEditor";
import { Button } from "../ui/button";
import { CollapsibleContent } from "../ui/collapsible";
import { SectionHeader } from "./SectionHeader";

interface EducationSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	attributes: React.HTMLAttributes<HTMLButtonElement>;
	listeners: React.HTMLAttributes<HTMLButtonElement>;
}

export const EducationSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	attributes,
	listeners,
}: EducationSectionProps) => {
	const educationVisibleId = useId();
	const sectionTitle = resumeData.sectionTitles?.education || "Education";

	return (
		<>
			<SectionHeader
				title={sectionTitle}
				isOpen={isOpen}
				attributes={attributes}
				listeners={listeners}
				visibilityControl="checkbox"
				visibilityProps={{
					isVisible: resumeData.sectionsVisible?.education !== false,
					onToggle: () => {
						updateResumeData({
							sectionsVisible: {
								...resumeData.sectionsVisible,
								education: resumeData.sectionsVisible?.education === false,
							},
						});
					},
					checkboxId: educationVisibleId,
					checkboxLabel: "Show in preview",
				}}
				onTitleChange={(newTitle) => {
					updateResumeData({
						sectionTitles: {
							...resumeData.sectionTitles,
							education: newTitle,
						},
					});
				}}
			/>
			<CollapsibleContent>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-end">
						<Button
							onClick={() => {
								const newEntry: EducationEntry = {
									degree: "",
									institution: "",
									startDate: "",
									endDate: "",
									bulletPoints: "",
									visible: true,
								};
								updateResumeData({
									education: [newEntry, ...resumeData.education],
								});
							}}
							size="sm"
							variant="default"
						>
							<Plus className="size-4" />
							Add Education
						</Button>
					</div>
					{resumeData.education.length === 0 ? (
						<p className="text-sm text-gray-500 dark:text-gray-400">
							No education entries. Click "Add Education" to get started.
						</p>
					) : (
						<div className="flex flex-col gap-4">
							{resumeData.education.map((entry, index) => (
								<EducationEntryEditor
									key={`education-${index}`}
									entry={entry}
									index={index}
									onChange={(idx, updatedEntry) => {
										const updated = [...resumeData.education];
										updated[idx] = updatedEntry;
										updateResumeData({ education: updated });
									}}
									onDelete={(idx) => {
										const entry = resumeData.education[idx];
										const entryTitle =
											entry.institution ||
											entry.degree ||
											`Education #${idx + 1}`;
										if (
											window.confirm(
												`Are you sure you want to delete "${entryTitle}"?`,
											)
										) {
											const updated = resumeData.education.filter(
												(_, i) => i !== idx,
											);
											updateResumeData({ education: updated });
										}
									}}
								/>
							))}
						</div>
					)}
				</div>
			</CollapsibleContent>
		</>
	);
};

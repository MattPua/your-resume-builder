import { ChevronsUpDown, Eye, EyeOff, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import type { EducationEntry, ResumeData } from "../../types/resume";
import { EducationEntryEditor } from "../EducationEntryEditor";
import { Button } from "../ui/button";

interface BackgroundEducationSubsectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
}

export const BackgroundEducationSubsection = ({
	resumeData,
	updateResumeData,
}: BackgroundEducationSubsectionProps) => {
	const [entryOpenStates, setEntryOpenStates] = useState<Record<number, boolean>>({});
	const isVisible = resumeData.sectionsVisible?.education !== false;

	useEffect(() => {
		const newStates: Record<number, boolean> = {};
		resumeData.education.forEach((_, index) => {
			if (entryOpenStates[index] === undefined) {
				newStates[index] = true;
			} else {
				newStates[index] = entryOpenStates[index];
			}
		});
		if (Object.keys(newStates).length !== Object.keys(entryOpenStates).length) {
			setEntryOpenStates(newStates);
		}
	}, [resumeData.education.length]);

	const handleEntryOpenChange = (index: number, open: boolean) => {
		setEntryOpenStates((prev) => ({ ...prev, [index]: open }));
	};

	const allExpanded = Object.values(entryOpenStates).every((state) => state === true);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<h3 className="text-base font-semibold text-gray-900 dark:text-white">
					Education
				</h3>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							updateResumeData({
								sectionsVisible: {
									...resumeData.sectionsVisible,
									education: !isVisible,
								},
							});
						}}
						className="p-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
						title={isVisible ? "Hide in preview" : "Show in preview"}
					>
						{isVisible ? (
							<Eye className="h-4 w-4" />
						) : (
							<EyeOff className="h-4 w-4" />
						)}
					</button>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<div className="flex items-center justify-between">
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
					{resumeData.education.length > 0 && (
							<Button
								onClick={() => {
								const newState = !allExpanded;
								const newStates: Record<number, boolean> = {};
								resumeData.education.forEach((_, index) => {
									newStates[index] = newState;
								});
								setEntryOpenStates(newStates);
								}}
								size="sm"
								variant="outline"
								className="text-xs"
							>
								<ChevronsUpDown className="size-3 mr-1" />
								{allExpanded ? "Collapse All" : "Expand All"}
							</Button>
					)}
						</div>
				{resumeData.education.length === 0 ? (
					<p className="text-sm text-gray-500 dark:text-gray-400">
						No education entries. Click "Add Education" to get started.
					</p>
				) : (
					<>
						<div className="flex flex-col gap-3">
							{resumeData.education.map((entry, index) => (
								<EducationEntryEditor
									key={index}
									entry={entry}
									index={index}
									onChange={(idx, updatedEntry) => {
										const updated = [...resumeData.education];
										updated[idx] = updatedEntry;
										updateResumeData({ education: updated });
									}}
									onDelete={(idx) => {
										const entry = resumeData.education[idx];
										const entryTitle = entry.institution || entry.degree || `Education #${idx + 1}`;
										if (window.confirm(`Are you sure you want to delete "${entryTitle}"?`)) {
										const updated = resumeData.education.filter(
											(_, i) => i !== idx,
										);
										updateResumeData({ education: updated });
											const newStates = { ...entryOpenStates };
											delete newStates[idx];
											Object.keys(newStates).forEach((key) => {
												const numKey = Number(key);
												if (numKey > idx) {
													newStates[numKey - 1] = newStates[numKey];
													delete newStates[numKey];
												}
											});
											setEntryOpenStates(newStates);
										}
									}}
									isOpen={entryOpenStates[index] !== false}
									onOpenChange={(open) => handleEntryOpenChange(index, open)}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

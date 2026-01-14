import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import type { ExperienceEntry, ResumeData } from "../../types/resume";
import { ErrorBoundary } from "../ErrorBoundary";
import { SortableExperienceEntry } from "../SortableExperienceEntry";
import { Button } from "../ui/button";
import { CollapsibleContent } from "../ui/collapsible";
import { SectionHeader } from "./SectionHeader";

interface ExperienceSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	attributes: any;
	listeners: any;
}

export const ExperienceSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	onOpenChange,
	attributes,
	listeners,
}: ExperienceSectionProps) => {
	const [entryOpenStates, setEntryOpenStates] = useState<Record<number, boolean>>({});
	const isVisible = resumeData.sectionsVisible?.experience !== false;
	const sectionTitle = resumeData.sectionTitles?.experience || "Experience";

	useEffect(() => {
		const newStates: Record<number, boolean> = {};
		resumeData.experience.forEach((_, index) => {
			if (entryOpenStates[index] === undefined) {
				newStates[index] = true;
			} else {
				newStates[index] = entryOpenStates[index];
			}
		});
		if (Object.keys(newStates).length !== Object.keys(entryOpenStates).length) {
			setEntryOpenStates(newStates);
		}
	}, [resumeData.experience.length]);

	const handleEntryOpenChange = (index: number, open: boolean) => {
		setEntryOpenStates((prev) => ({ ...prev, [index]: open }));
	};

	const allExpanded = Object.values(entryOpenStates).every((state) => state === true);

	const entrySensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleEntryDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const activeIndex = parseInt(
				(active.id as string).replace("experience-", ""),
			);
			const overIndex = parseInt((over.id as string).replace("experience-", ""));

			const reordered = arrayMove(resumeData.experience, activeIndex, overIndex);
			updateResumeData({ experience: reordered });
		}
	};

	return (
		<ErrorBoundary
			fallback={
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-2">
						Experience
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
									experience: !isVisible,
								},
							});
						},
					}}
					onTitleChange={(newTitle) => {
						updateResumeData({
							sectionTitles: {
								...resumeData.sectionTitles,
								experience: newTitle,
							},
						});
					}}
				/>
			<CollapsibleContent>
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<Button
							onClick={() => {
								const newEntry: ExperienceEntry = {
									title: "",
									company: "",
									startDate: "",
									endDate: "",
									bulletPoints: "",
									visible: true,
								};
								updateResumeData({
									experience: [newEntry, ...resumeData.experience],
								});
							}}
							size="sm"
							variant="default"
						>
							<Plus className="size-4" />
							Add Experience
						</Button>
						{resumeData.experience.length > 0 && (
							<Button
								onClick={() => {
									const newState = !allExpanded;
									const newStates: Record<number, boolean> = {};
									resumeData.experience.forEach((_, index) => {
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
					{resumeData.experience.length === 0 ? (
						<p className="text-sm text-gray-500 dark:text-gray-400">
							No experience entries. Click "Add Experience" to get started.
						</p>
					) : (
						<>
							<DndContext
								sensors={entrySensors}
								collisionDetection={closestCenter}
								onDragEnd={handleEntryDragEnd}
							>
								<SortableContext
									items={resumeData.experience.map((_, index) => `experience-${index}`)}
									strategy={verticalListSortingStrategy}
								>
									<div className="flex flex-col gap-3">
										{resumeData.experience.map((entry, index) => (
											<SortableExperienceEntry
												key={index}
												entry={entry}
												index={index}
												onChange={(idx, updatedEntry) => {
													const updated = [...resumeData.experience];
													updated[idx] = updatedEntry;
													updateResumeData({ experience: updated });
												}}
												onDelete={(idx) => {
													const entry = resumeData.experience[idx];
													const entryTitle = entry.company || entry.title || `Experience #${idx + 1}`;
													if (window.confirm(`Are you sure you want to delete "${entryTitle}"?`)) {
													const updated = resumeData.experience.filter(
														(_, i) => i !== idx,
													);
													updateResumeData({ experience: updated });
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
								</SortableContext>
							</DndContext>
						</>
					)}
				</div>
			</CollapsibleContent>
		</>
		</ErrorBoundary>
	);
};

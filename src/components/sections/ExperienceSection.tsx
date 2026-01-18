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
import { Briefcase, ChevronsDown, ChevronsUp, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { ExperienceEntry, ResumeData } from "../../types/resume";
import { EmptySectionState } from "../EmptySectionState";
import { ErrorBoundary } from "../ErrorBoundary";
import { SortableExperienceEntry } from "../SortableExperienceEntry";
import { Button } from "../ui/button";
import { CollapsibleContent } from "../ui/collapsible";
import { SectionHeader } from "./SectionHeader";

interface ExperienceSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	attributes: React.HTMLAttributes<HTMLButtonElement>;
	listeners: React.HTMLAttributes<HTMLButtonElement>;
}

export const ExperienceSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	attributes,
	listeners,
}: ExperienceSectionProps) => {
	const [entryOpenStates, setEntryOpenStates] = useState<
		Record<number, boolean>
	>({});
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
	}, [entryOpenStates, resumeData.experience.forEach]);

	const handleEntryOpenChange = (index: number, open: boolean) => {
		setEntryOpenStates((prev) => ({ ...prev, [index]: open }));
	};

	const allExpanded = Object.values(entryOpenStates).every(
		(state) => state === true,
	);

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
				10,
			);
			const overIndex = parseInt(
				(over.id as string).replace("experience-", ""),
				10,
			);

			const reordered = arrayMove(
				resumeData.experience,
				activeIndex,
				overIndex,
			);
			updateResumeData({ experience: reordered });
		}
	};

	const handleCollapseAllEntries = () => {
		const newStates: Record<number, boolean> = {};
		resumeData.experience.forEach((_, index) => {
			newStates[index] = false;
		});
		setEntryOpenStates(newStates);
	};

	return (
		<ErrorBoundary>
			<SectionHeader
				title={sectionTitle}
				isOpen={isOpen}
				attributes={attributes}
				listeners={listeners}
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
					{resumeData.experience.length > 0 && (
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
							>
								{allExpanded ? (
									<ChevronsUp className="size-4 mr-1" />
								) : (
									<ChevronsDown className="size-4 mr-1" />
								)}
								{allExpanded ? "Collapse All" : "Expand All"}
							</Button>
						</div>
					)}
					{resumeData.experience.length === 0 ? (
						<EmptySectionState
							icon={Briefcase}
							title="No experience yet"
							description="Showcase your professional journey by adding your previous roles and achievements."
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
							buttonText="Add Experience"
						/>
					) : (
						<DndContext
							sensors={entrySensors}
							collisionDetection={closestCenter}
							onDragStart={handleCollapseAllEntries}
							onDragEnd={handleEntryDragEnd}
						>
							<SortableContext
								items={resumeData.experience.map(
									(_, index) => `experience-${index}`,
								)}
								strategy={verticalListSortingStrategy}
							>
								<div className="flex flex-col gap-3">
									{resumeData.experience.map((entry, index) => (
										<SortableExperienceEntry
											key={`experience-${index}`}
											entry={entry}
											index={index}
											onChange={(idx, updatedEntry) => {
												const updated = [...resumeData.experience];
												updated[idx] = updatedEntry;
												updateResumeData({ experience: updated });
											}}
											onDelete={(idx) => {
												const entry = resumeData.experience[idx];
												const entryTitle =
													entry.company ||
													entry.title ||
													`Experience #${idx + 1}`;
												if (
													window.confirm(
														`Are you sure you want to delete "${entryTitle}"?`,
													)
												) {
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
											onOpenChange={(open) =>
												handleEntryOpenChange(index, open)
											}
										/>
									))}
								</div>
							</SortableContext>
						</DndContext>
					)}
				</div>
			</CollapsibleContent>
		</ErrorBoundary>
	);
};

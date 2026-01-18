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
import { ChevronsDown, ChevronsUp, HeartHandshake, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { ResumeData, VolunteeringEntry } from "../../types/resume";
import { EmptySectionState } from "../EmptySectionState";
import { ErrorBoundary } from "../ErrorBoundary";
import { SortableVolunteeringEntry } from "../SortableVolunteeringEntry";
import { Button } from "../ui/button";
import { CollapsibleContent } from "../ui/collapsible";
import { SectionHeader } from "./SectionHeader";

interface VolunteeringSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	attributes: React.HTMLAttributes<HTMLButtonElement>;
	listeners: React.HTMLAttributes<HTMLButtonElement>;
}

export const VolunteeringSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	attributes,
	listeners,
}: VolunteeringSectionProps) => {
	const [entryOpenStates, setEntryOpenStates] = useState<
		Record<number, boolean>
	>({});
	const sectionTitle = resumeData.sectionTitles?.volunteering || "Volunteering";

	useEffect(() => {
		const newStates: Record<number, boolean> = {};
		resumeData.volunteering.forEach((_, index) => {
			if (entryOpenStates[index] === undefined) {
				newStates[index] = true;
			} else {
				newStates[index] = entryOpenStates[index];
			}
		});
		if (Object.keys(newStates).length !== Object.keys(entryOpenStates).length) {
			setEntryOpenStates(newStates);
		}
	}, [entryOpenStates, resumeData.volunteering.forEach]);

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
				(active.id as string).replace("volunteering-", ""),
				10,
			);
			const overIndex = parseInt(
				(over.id as string).replace("volunteering-", ""),
				10,
			);

			const reordered = arrayMove(
				resumeData.volunteering,
				activeIndex,
				overIndex,
			);
			updateResumeData({ volunteering: reordered });
		}
	};

	const handleCollapseAllEntries = () => {
		const newStates: Record<number, boolean> = {};
		resumeData.volunteering.forEach((_, index) => {
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
							volunteering: newTitle,
						},
					});
				}}
			/>
			<CollapsibleContent>
				<div className="flex flex-col gap-3">
					{resumeData.volunteering.length > 0 && (
						<div className="flex items-center justify-between">
							<Button
								onClick={() => {
									const newEntry: VolunteeringEntry = {
										role: "",
										organization: "",
										startDate: "",
										endDate: "",
										bulletPoints: "",
										visible: true,
									};
									updateResumeData({
										volunteering: [newEntry, ...resumeData.volunteering],
									});
								}}
								size="sm"
								variant="default"
							>
								<Plus className="size-4" />
								Add Volunteering
							</Button>
							<Button
								onClick={() => {
									const newState = !allExpanded;
									const newStates: Record<number, boolean> = {};
									resumeData.volunteering.forEach((_, index) => {
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
					{resumeData.volunteering.length === 0 ? (
						<EmptySectionState
							icon={HeartHandshake}
							title="No volunteering"
							description="Share your community involvement and volunteer work to show a well-rounded profile."
							onClick={() => {
								const newEntry: VolunteeringEntry = {
									role: "",
									organization: "",
									startDate: "",
									endDate: "",
									bulletPoints: "",
									visible: true,
								};
								updateResumeData({
									volunteering: [newEntry, ...resumeData.volunteering],
								});
							}}
							buttonText="Add Volunteering"
						/>
					) : (
						<DndContext
							sensors={entrySensors}
							collisionDetection={closestCenter}
							onDragStart={handleCollapseAllEntries}
							onDragEnd={handleEntryDragEnd}
						>
							<SortableContext
								items={resumeData.volunteering.map(
									(_, index) => `volunteering-${index}`,
								)}
								strategy={verticalListSortingStrategy}
							>
								<div className="flex flex-col gap-3">
									{resumeData.volunteering.map((entry, index) => (
										<SortableVolunteeringEntry
											key={`volunteering-${index}`}
											entry={entry}
											index={index}
											onChange={(idx, updatedEntry) => {
												const updated = [...resumeData.volunteering];
												updated[idx] = updatedEntry;
												updateResumeData({ volunteering: updated });
											}}
											onDelete={(idx) => {
												const entry = resumeData.volunteering[idx];
												const entryTitle =
													entry.organization ||
													entry.role ||
													`Volunteering #${idx + 1}`;
												if (
													window.confirm(
														`Are you sure you want to delete "${entryTitle}"?`,
													)
												) {
													const updated = resumeData.volunteering.filter(
														(_, i) => i !== idx,
													);
													updateResumeData({ volunteering: updated });
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

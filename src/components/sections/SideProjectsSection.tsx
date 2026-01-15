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
import { ChevronsUpDown, Folder, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { ResumeData, SideProjectEntry } from "../../types/resume";
import { EmptySectionState } from "../EmptySectionState";
import { ErrorBoundary } from "../ErrorBoundary";
import { SortableSideProjectEntry } from "../SortableSideProjectEntry";
import { Button } from "../ui/button";
import { CollapsibleContent } from "../ui/collapsible";
import { SectionHeader } from "./SectionHeader";

interface SideProjectsSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	attributes: any;
	listeners: any;
}

export const SideProjectsSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	onOpenChange,
	attributes,
	listeners,
}: SideProjectsSectionProps) => {
	const [entryOpenStates, setEntryOpenStates] = useState<
		Record<number, boolean>
	>({});
	const isVisible = resumeData.sectionsVisible?.sideProjects !== false;
	const sectionTitle =
		resumeData.sectionTitles?.sideProjects || "Side Projects";

	useEffect(() => {
		const newStates: Record<number, boolean> = {};
		resumeData.sideProjects.forEach((_, index) => {
			if (entryOpenStates[index] === undefined) {
				newStates[index] = true;
			} else {
				newStates[index] = entryOpenStates[index];
			}
		});
		if (Object.keys(newStates).length !== Object.keys(entryOpenStates).length) {
			setEntryOpenStates(newStates);
		}
	}, [entryOpenStates, resumeData.sideProjects.forEach]);

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
				(active.id as string).replace("sideproject-", ""),
				10,
			);
			const overIndex = parseInt(
				(over.id as string).replace("sideproject-", ""),
				10,
			);

			const reordered = arrayMove(
				resumeData.sideProjects,
				activeIndex,
				overIndex,
			);
			updateResumeData({ sideProjects: reordered });
		}
	};

	return (
		<ErrorBoundary
			fallback={
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-2">
						Side Projects
					</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						This section encountered an error. Please refresh the page.
					</p>
				</div>
			}
		>
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
								sideProjects: !isVisible,
							},
						});
					},
				}}
				onTitleChange={(newTitle) => {
					updateResumeData({
						sectionTitles: {
							...resumeData.sectionTitles,
							sideProjects: newTitle,
						},
					});
				}}
			/>
			<CollapsibleContent>
				<div className="flex flex-col gap-3">
					{resumeData.sideProjects.length > 0 && (
						<div className="flex items-center justify-between">
							<Button
								onClick={() => {
									const newEntry: SideProjectEntry = {
										title: "",
										description: "",
										startDate: "",
										endDate: "",
										bulletPoints: "",
										visible: true,
									};
									updateResumeData({
										sideProjects: [newEntry, ...resumeData.sideProjects],
									});
								}}
								size="sm"
								variant="default"
							>
								<Plus className="size-4" />
								Add Side Project
							</Button>
							<Button
								onClick={() => {
									const newState = !allExpanded;
									const newStates: Record<number, boolean> = {};
									resumeData.sideProjects.forEach((_, index) => {
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
						</div>
					)}
					{resumeData.sideProjects.length === 0 ? (
						<EmptySectionState
							icon={Folder}
							title="No side projects"
							description="Highlight your personal projects, open-source contributions, or apps you've built."
							onClick={() => {
								const newEntry: SideProjectEntry = {
									title: "",
									description: "",
									startDate: "",
									endDate: "",
									bulletPoints: "",
									visible: true,
								};
								updateResumeData({
									sideProjects: [newEntry, ...resumeData.sideProjects],
								});
							}}
							buttonText="Add Side Project"
						/>
					) : (
						<DndContext
							sensors={entrySensors}
							collisionDetection={closestCenter}
							onDragEnd={handleEntryDragEnd}
						>
							<SortableContext
								items={resumeData.sideProjects.map(
									(_, index) => `sideproject-${index}`,
								)}
								strategy={verticalListSortingStrategy}
							>
								<div className="flex flex-col gap-3">
									{resumeData.sideProjects.map((entry, index) => (
										<SortableSideProjectEntry
											key={index}
											entry={entry}
											index={index}
											onChange={(idx, updatedEntry) => {
												const updated = [...resumeData.sideProjects];
												updated[idx] = updatedEntry;
												updateResumeData({ sideProjects: updated });
											}}
											onDelete={(idx) => {
												const entry = resumeData.sideProjects[idx];
												const entryTitle =
													entry.title || `Side Project #${idx + 1}`;
												if (
													window.confirm(
														`Are you sure you want to delete "${entryTitle}"?`,
													)
												) {
													const updated = resumeData.sideProjects.filter(
														(_, i) => i !== idx,
													);
													updateResumeData({ sideProjects: updated });
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

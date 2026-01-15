import { ArrowUpDown } from "lucide-react";
import { useRef } from "react";
import type { ResumeData } from "../../types/resume";
import { ErrorBoundary } from "../ErrorBoundary";
import { SectionInput } from "../SectionInput";
import { Button } from "../ui/button";
import { CollapsibleContent } from "../ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { SectionHeader } from "./SectionHeader";

interface PersonalSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	attributes: any;
	listeners: any;
}

export const PersonalSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	onOpenChange,
	attributes,
	listeners,
}: PersonalSectionProps) => {
	const isVisible = resumeData.sectionsVisible?.personal !== false;
	const personal = resumeData.personal || { bulletPoints: "", visible: true };
	const sectionTitle = resumeData.sectionTitles?.personal || "Personal";
	const bulletPointsRef = useRef<HTMLTextAreaElement>(null);
	const draftRef = useRef<HTMLTextAreaElement>(null);

	const handleFieldChange = (
		field: "bulletPoints" | "bulletPointsDraft" | "visible",
		value: string | boolean,
	) => {
		updateResumeData({
			personal: {
				...personal,
				[field]: value,
			},
		});
	};

	return (
		<ErrorBoundary
			fallback={
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-2">
						Personal
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
								personal: !isVisible,
							},
						});
					},
				}}
				onTitleChange={(newTitle) => {
					updateResumeData({
						sectionTitles: {
							...resumeData.sectionTitles,
							personal: newTitle,
						},
					});
				}}
			/>
			<CollapsibleContent>
				<div className="flex flex-col gap-4">
					<SectionInput
						ref={bulletPointsRef}
						label="Bullet Points"
						value={personal.bulletPoints}
						onChange={(value) => handleFieldChange("bulletPoints", value)}
						placeholder="- Description or achievement\n- Another point"
					/>
					<div className="flex items-center justify-center">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => {
										// Read current values directly from textarea elements
										// Use nullish coalescing to preserve empty strings
										const currentBulletPoints =
											bulletPointsRef.current?.value ?? "";
										const currentDraft = draftRef.current?.value ?? "";

										// Update state with swapped values
										updateResumeData({
											personal: {
												...personal,
												bulletPoints: currentDraft,
												bulletPointsDraft: currentBulletPoints,
											},
										});
									}}
								>
									<ArrowUpDown className="size-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Swap bullet points and draft</p>
							</TooltipContent>
						</Tooltip>
					</div>
					<SectionInput
						ref={draftRef}
						label="Draft (not shown in preview)"
						value={personal.bulletPointsDraft || ""}
						onChange={(value) => handleFieldChange("bulletPointsDraft", value)}
						placeholder="Draft bullet points..."
					/>
				</div>
			</CollapsibleContent>
		</ErrorBoundary>
	);
};

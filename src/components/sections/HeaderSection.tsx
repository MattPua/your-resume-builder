import type { ResumeData } from "../../types/resume";
import { ErrorBoundary } from "../ErrorBoundary";
import { TextInput } from "../TextInput";
import {
	Collapsible,
	CollapsibleContent,
} from "../ui/collapsible";
import { SectionHeader } from "./SectionHeader";

interface HeaderSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export const HeaderSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	onOpenChange,
}: HeaderSectionProps) => {
	const isVisible = resumeData.sectionsVisible?.header !== false;
	const sectionTitle = resumeData.sectionTitles?.header || "Header & Contact";

	return (
		<ErrorBoundary
			fallback={
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-2">
						Header & Contact
					</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						This section encountered an error. Please refresh the page.
					</p>
				</div>
			}
		>
			<Collapsible
				open={isOpen}
				onOpenChange={onOpenChange}
				className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
			>
				<div className="p-6">
				<SectionHeader
					title={sectionTitle}
					isOpen={isOpen}
					visibilityControl="eye"
					visibilityProps={{
						isVisible,
						onToggle: () => {
									updateResumeData({
										sectionsVisible: {
											...resumeData.sectionsVisible,
											header: !isVisible,
										},
									});
						},
					}}
							/>
				<CollapsibleContent>
					<div className="flex flex-col gap-4">
						<TextInput
							label="Name"
							value={resumeData.name}
							onChange={(value) => updateResumeData({ name: value })}
							placeholder="Your Full Name"
						/>
						<TextInput
							label="Email"
							type="email"
							value={resumeData.email}
							onChange={(value) => updateResumeData({ email: value })}
							placeholder="your.email@example.com"
						/>
						<TextInput
							label="Phone"
							type="tel"
							value={resumeData.phone}
							onChange={(value) => updateResumeData({ phone: value })}
							placeholder="(123) 456-7890"
						/>
						<TextInput
							label="Website"
							type="url"
							value={resumeData.website}
							onChange={(value) => updateResumeData({ website: value })}
							placeholder="https://yourwebsite.com"
						/>
						<TextInput
							label="GitHub"
							type="url"
							value={resumeData.github}
							onChange={(value) => updateResumeData({ github: value })}
							placeholder="https://github.com/username"
						/>
					</div>
				</CollapsibleContent>
			</div>
		</Collapsible>
		</ErrorBoundary>
	);
};

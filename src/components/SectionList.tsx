import type { ResumeData } from "../types/resume";
import { BackgroundSection } from "./sections/BackgroundSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { PersonalSection } from "./sections/PersonalSection";
import { SideProjectsSection } from "./sections/SideProjectsSection";
import { SortableSection } from "./SortableSection";

interface SectionListProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	sectionOrder: ("experience" | "background" | "sideProjects" | "personal")[];
	isExperienceOpen: boolean;
	setIsExperienceOpen: (open: boolean) => void;
	isBackgroundOpen: boolean;
	setIsBackgroundOpen: (open: boolean) => void;
	isSideProjectsOpen: boolean;
	setIsSideProjectsOpen: (open: boolean) => void;
	isPersonalOpen: boolean;
	setIsPersonalOpen: (open: boolean) => void;
}

export const SectionList = ({
	resumeData,
	updateResumeData,
	sectionOrder,
	isExperienceOpen,
	setIsExperienceOpen,
	isBackgroundOpen,
	setIsBackgroundOpen,
	isSideProjectsOpen,
	setIsSideProjectsOpen,
	isPersonalOpen,
	setIsPersonalOpen,
}: SectionListProps) => {
	return (
		<div className="space-y-4">
			{sectionOrder.map((sectionId) => {
				if (sectionId === "experience") {
					return (
						<SortableSection
							key={sectionId}
							id={sectionId}
							isOpen={isExperienceOpen}
							onOpenChange={setIsExperienceOpen}
						>
							{({ attributes, listeners }) => (
								<ExperienceSection
									resumeData={resumeData}
									updateResumeData={updateResumeData}
									isOpen={isExperienceOpen}
									onOpenChange={setIsExperienceOpen}
									attributes={attributes}
									listeners={listeners}
								/>
							)}
						</SortableSection>
					);
				}
				if (sectionId === "background") {
					return (
						<SortableSection
							key={sectionId}
							id={sectionId}
							isOpen={isBackgroundOpen}
							onOpenChange={setIsBackgroundOpen}
						>
							{({ attributes, listeners }) => (
								<BackgroundSection
									resumeData={resumeData}
									updateResumeData={updateResumeData}
									isOpen={isBackgroundOpen}
									onOpenChange={setIsBackgroundOpen}
									attributes={attributes}
									listeners={listeners}
								/>
							)}
						</SortableSection>
					);
				}
				if (sectionId === "sideProjects") {
					return (
						<SortableSection
							key={sectionId}
							id={sectionId}
							isOpen={isSideProjectsOpen}
							onOpenChange={setIsSideProjectsOpen}
						>
							{({ attributes, listeners }) => (
								<SideProjectsSection
									resumeData={resumeData}
									updateResumeData={updateResumeData}
									isOpen={isSideProjectsOpen}
									onOpenChange={setIsSideProjectsOpen}
									attributes={attributes}
									listeners={listeners}
								/>
							)}
						</SortableSection>
					);
				}
				if (sectionId === "personal") {
					return (
						<SortableSection
							key={sectionId}
							id={sectionId}
							isOpen={isPersonalOpen}
							onOpenChange={setIsPersonalOpen}
						>
							{({ attributes, listeners }) => (
								<PersonalSection
									resumeData={resumeData}
									updateResumeData={updateResumeData}
									isOpen={isPersonalOpen}
									onOpenChange={setIsPersonalOpen}
									attributes={attributes}
									listeners={listeners}
								/>
							)}
						</SortableSection>
					);
				}
				return null;
			})}
		</div>
	);
};

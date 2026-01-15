import type { ResumeData } from "../types/resume";
import { SortableSection } from "./SortableSection";
import { BackgroundSection } from "./sections/BackgroundSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { PersonalSection } from "./sections/PersonalSection";
import { SideProjectsSection } from "./sections/SideProjectsSection";
import { VolunteeringSection } from "./sections/VolunteeringSection";

interface SectionListProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	sectionOrder: (
		| "experience"
		| "background"
		| "sideProjects"
		| "volunteering"
		| "personal"
	)[];
	isExperienceOpen: boolean;
	setIsExperienceOpen: (open: boolean) => void;
	isBackgroundOpen: boolean;
	setIsBackgroundOpen: (open: boolean) => void;
	isSideProjectsOpen: boolean;
	setIsSideProjectsOpen: (open: boolean) => void;
	isVolunteeringOpen: boolean;
	setIsVolunteeringOpen: (open: boolean) => void;
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
	isVolunteeringOpen,
	setIsVolunteeringOpen,
	isPersonalOpen,
	setIsPersonalOpen,
}: SectionListProps) => {
	return (
		<div className="space-y-4">
			{sectionOrder.map((sectionId) => {
				if (sectionId === "experience") {
					const isVisible = resumeData.sectionsVisible?.experience !== false;
					return (
						<SortableSection
							key={sectionId}
							id={sectionId}
							isOpen={isExperienceOpen}
							isVisible={isVisible}
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
					const isVisible =
						resumeData.sectionsVisible?.education !== false ||
						resumeData.sectionsVisible?.skills !== false;
					return (
						<SortableSection
							key={sectionId}
							id={sectionId}
							isOpen={isBackgroundOpen}
							isVisible={isVisible}
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
					const isVisible = resumeData.sectionsVisible?.sideProjects !== false;
					return (
						<SortableSection
							key={sectionId}
							id={sectionId}
							isOpen={isSideProjectsOpen}
							isVisible={isVisible}
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
				if (sectionId === "volunteering") {
					const isVisible = resumeData.sectionsVisible?.volunteering !== false;
					return (
						<SortableSection
							key={sectionId}
							id={sectionId}
							isOpen={isVolunteeringOpen}
							isVisible={isVisible}
							onOpenChange={setIsVolunteeringOpen}
						>
							{({ attributes, listeners }) => (
								<VolunteeringSection
									resumeData={resumeData}
									updateResumeData={updateResumeData}
									isOpen={isVolunteeringOpen}
									onOpenChange={setIsVolunteeringOpen}
									attributes={attributes}
									listeners={listeners}
								/>
							)}
						</SortableSection>
					);
				}
				if (sectionId === "personal") {
					const isVisible = resumeData.sectionsVisible?.personal !== false;
					return (
						<SortableSection
							key={sectionId}
							id={sectionId}
							isOpen={isPersonalOpen}
							isVisible={isVisible}
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

import { FileText, Sparkles } from "lucide-react";
import type { ResumeData } from "../types/resume";
import { BackgroundPreview } from "./preview/BackgroundPreview";
import { ExperiencePreview } from "./preview/ExperiencePreview";
import { HeaderPreview } from "./preview/HeaderPreview";
import { PersonalPreview } from "./preview/PersonalPreview";
import { SideProjectsPreview } from "./preview/SideProjectsPreview";
import { VolunteeringPreview } from "./preview/VolunteeringPreview";

interface ResumePreviewProps {
	data: ResumeData;
	previewRef?: React.RefObject<HTMLDivElement | null>;
}

export const ResumePreview = ({ data, previewRef }: ResumePreviewProps) => {
	const showHeader = data.sectionsVisible?.header !== false;
	const showExperience = data.sectionsVisible?.experience !== false;
	const showEducation = data.sectionsVisible?.education !== false;
	const showSideProjects = data.sectionsVisible?.sideProjects !== false;
	const showVolunteering = data.sectionsVisible?.volunteering !== false;
	const showPersonal = data.sectionsVisible?.personal !== false;
	const showSkills = data.sectionsVisible?.skills !== false;

	const hasHeader =
		showHeader &&
		(data.name || data.email || data.phone || data.website || data.github);

	const visibleExperience =
		showExperience && data.experience
			? data.experience.filter((e) => e.visible !== false)
			: [];

	const visibleEducation =
		showEducation && data.education
			? data.education.filter((e) => e.visible !== false)
			: [];

	const visibleSideProjects =
		showSideProjects && data.sideProjects
			? data.sideProjects.filter((e) => e.visible !== false)
			: [];

	const visibleVolunteering =
		showVolunteering && data.volunteering
			? data.volunteering.filter((e) => e.visible !== false)
			: [];

	const sectionOrder = data.sectionOrder || [
		"experience",
		"background",
		"sideProjects",
		"volunteering",
		"personal",
	];

	const hasContent =
		hasHeader ||
		visibleExperience.length > 0 ||
		visibleEducation.length > 0 ||
		visibleSideProjects.length > 0 ||
		visibleVolunteering.length > 0 ||
		(showPersonal &&
			data.personal?.bulletPoints &&
			data.personal.bulletPoints.trim() !== "") ||
		(showSkills && data.skills && data.skills.trim() !== "");

	const backgroundColor = data.sectionHeaderBackgroundColor || "#3b82f6";
	const textColor = data.sectionHeaderTextColor || "#ffffff";
	const layoutMode = data.layoutMode || "default";

	const spacingMap = {
		compact: {
			section: "mb-1",
			header: "mb-0 pb-0",
			content: "gap-1",
			item: "mb-0.5",
		},
		default: {
			section: "mb-1",
			header: "mb-0 pb-0",
			content: "gap-2",
			item: "mb-1",
		},
		comfortable: {
			section: "mb-1.5",
			header: "mb-0 pb-0",
			content: "gap-3",
			item: "mb-1.5",
		},
	}[layoutMode];

	const renderSection = (sectionId: string) => {
		if (sectionId === "experience") {
			return (
				<div
					key="experience"
					data-pdf-section="experience"
					className={spacingMap.section}
				>
					<ExperiencePreview
						entries={visibleExperience}
						title={data.sectionTitles?.experience}
						backgroundColor={backgroundColor}
						textColor={textColor}
						layoutMode={layoutMode}
					/>
				</div>
			);
		}
		if (sectionId === "sideProjects") {
			return (
				<div
					key="sideProjects"
					data-pdf-section="sideProjects"
					className={spacingMap.section}
				>
					<SideProjectsPreview
						entries={visibleSideProjects}
						title={data.sectionTitles?.sideProjects}
						backgroundColor={backgroundColor}
						textColor={textColor}
						layoutMode={layoutMode}
					/>
				</div>
			);
		}
		if (sectionId === "volunteering") {
			return (
				<div
					key="volunteering"
					data-pdf-section="volunteering"
					className={spacingMap.section}
				>
					<VolunteeringPreview
						entries={visibleVolunteering}
						title={data.sectionTitles?.volunteering}
						backgroundColor={backgroundColor}
						textColor={textColor}
						layoutMode={layoutMode}
					/>
				</div>
			);
		}
		if (sectionId === "personal") {
			if (!showPersonal) return null;
			return (
				<div
					key="personal"
					data-pdf-section="personal"
					className={spacingMap.section}
				>
					<PersonalPreview
						personal={data.personal}
						title={data.sectionTitles?.personal}
						backgroundColor={backgroundColor}
						textColor={textColor}
						layoutMode={layoutMode}
					/>
				</div>
			);
		}
		if (sectionId === "background") {
			return (
				<div
					key="background"
					data-pdf-section="background"
					className={spacingMap.section}
				>
					<BackgroundPreview
						education={visibleEducation}
						skills={data.skills}
						showSkills={showSkills}
						title={data.sectionTitles?.background}
						backgroundColor={backgroundColor}
						textColor={textColor}
						layoutMode={layoutMode}
					/>
				</div>
			);
		}
		return null;
	};

	return (
		<div
			ref={previewRef}
			className={`resume-preview resume-preview-root bg-white text-gray-900 ${layoutMode === "compact" ? "p-6" : layoutMode === "comfortable" ? "p-10" : "p-8"}`}
			style={{
				width: "794px",
				minHeight: "1123px",
				backgroundColor: "#ffffff",
				color: "#111827",
				fontFamily: data.fontFamily || "'Inter Variable', sans-serif",
			}}
		>
			{hasHeader && (
				<div data-pdf-header className={spacingMap.header}>
					<HeaderPreview
						data={data}
						layoutMode={layoutMode}
					/>
				</div>
			)}

			<div
				data-pdf-sections-container
				className={`bg-white flex flex-col ${spacingMap.content}`}
			>
				{sectionOrder.map((sectionId) => renderSection(sectionId))}
			</div>

			{!hasContent && (
				<div className="flex flex-col items-start justify-center py-48 px-4 text-left animate-in fade-in zoom-in duration-500 h-full min-h-[700px]">
					<div className="relative mb-10">
						<div className="absolute -inset-8 rounded-full bg-primary/5 animate-pulse scale-110" />
						<div className="relative bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
							<FileText className="size-24 text-primary/20" />
						</div>
						<div className="absolute -top-3 -right-3 bg-yellow-100 p-3 rounded-full shadow-md">
							<Sparkles className="size-8 text-yellow-600 animate-bounce" />
						</div>
					</div>
					<h3 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
						Your Resume Awaits
					</h3>
					<p className="text-gray-500 max-w-md text-xl leading-relaxed">
						Fill out the details in the editor to see your professional resume
						take shape in real-time.
					</p>
					<div className="mt-16 flex items-center gap-3 text-sm font-bold text-primary/60 uppercase tracking-[0.3em]">
						<div className="size-2 rounded-full bg-primary/60 animate-pulse" />
						Live Preview Active
					</div>
				</div>
			)}
		</div>
	);
};

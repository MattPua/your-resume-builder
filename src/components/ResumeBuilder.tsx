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
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useResumeActions } from "../hooks/useResumeActions";
import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorPage } from "./ErrorPage";
import { ImportMarkdownDialog } from "./ImportMarkdownDialog";
import { AppControlsHeader } from "./layout/AppControlsHeader";
import { AppNavigation } from "./layout/AppNavigation";
import { ScrollToTopButton } from "./layout/ScrollToTopButton";
import { SiteFooter } from "./layout/SiteFooter";
import { SiteHeader } from "./layout/SiteHeader";
import { PreviewPane } from "./preview/PreviewPane";
import { SectionList } from "./SectionList";
import { HeaderSection } from "./sections/HeaderSection";
import logo from "./ui/logo.webp";

const DEFAULT_SECTION_ORDER: (
	| "experience"
	| "background"
	| "sideProjects"
	| "volunteering"
	| "personal"
)[] = ["experience", "background", "sideProjects", "volunteering", "personal"];

const FONTS = [
	{
		name: "Inter",
		value: "'Inter Variable', sans-serif",
	},
	{
		name: "Roboto Flex",
		value: "'Roboto Flex Variable', sans-serif",
	},
	{
		name: "Open Sans",
		value: "'Open Sans Variable', sans-serif",
	},
	{
		name: "Montserrat",
		value: "'Montserrat Variable', sans-serif",
	},
	{
		name: "IBM Plex Sans",
		value: "'IBM Plex Sans Variable', sans-serif",
	},
	{
		name: "Manrope",
		value: "'Manrope Variable', sans-serif",
	},
	{
		name: "Playfair Display",
		value: "'Playfair Display Variable', serif",
	},
	{
		name: "EB Garamond",
		value: "'EB Garamond Variable', serif",
	},
	{
		name: "Lora",
		value: "'Lora Variable', serif",
	},
	{
		name: "Source Serif 4",
		value: "'Source Serif 4 Variable', serif",
	},
	{
		name: "Crimson Pro",
		value: "'Crimson Pro Variable', serif",
	},
	{
		name: "Fraunces",
		value: "'Fraunces Variable', serif",
	},
	{
		name: "JetBrains Mono",
		value: "'JetBrains Mono Variable', monospace",
	},
	{
		name: "System Sans",
		value:
			"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
	},
	{
		name: "System Serif",
		value: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
	},
	{
		name: "System Mono",
		value:
			"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
	},
];

export const ResumeBuilder = () => {
	const {
		resumeData,
		updateResumeData,
		resetResumeData,
		importResumeData,
		isLoading,
	} = useLocalStorage();

	const previewRef = useRef<HTMLDivElement>(null);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [activeSection, setActiveSection] = useState<string>("header");
	const [isHeaderOpen, setIsHeaderOpen] = useState(true);
	const [isExperienceOpen, setIsExperienceOpen] = useState(true);
	const [isBackgroundOpen, setIsBackgroundOpen] = useState(true);
	const [isSideProjectsOpen, setIsSideProjectsOpen] = useState(true);
	const [isVolunteeringOpen, setIsVolunteeringOpen] = useState(true);
	const [isPersonalOpen, setIsPersonalOpen] = useState(true);
	const [isImportMarkdownOpen, setIsImportMarkdownOpen] = useState(false);

	const sectionOrder = resumeData.sectionOrder || DEFAULT_SECTION_ORDER;

	const allSectionsCollapsed =
		!isHeaderOpen &&
		!isExperienceOpen &&
		!isBackgroundOpen &&
		!isSideProjectsOpen &&
		!isVolunteeringOpen &&
		!isPersonalOpen;

	const handleCollapseAll = () => {
		setIsHeaderOpen(false);
		setIsExperienceOpen(false);
		setIsBackgroundOpen(false);
		setIsSideProjectsOpen(false);
		setIsVolunteeringOpen(false);
		setIsPersonalOpen(false);
	};

	const handleToggleAllSections = () => {
		const shouldCollapse = !allSectionsCollapsed;
		setIsHeaderOpen(!shouldCollapse);
		setIsExperienceOpen(!shouldCollapse);
		setIsBackgroundOpen(!shouldCollapse);
		setIsSideProjectsOpen(!shouldCollapse);
		setIsVolunteeringOpen(!shouldCollapse);
		setIsPersonalOpen(!shouldCollapse);
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(`section-${sectionId}`);
		if (element) {
			const yOffset = -100;
			const y =
				element.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "-150px 0px -50% 0px",
			threshold: 0,
		};

		const handleIntersect = (entries: IntersectionObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					const id = entry.target.id.replace("section-", "");
					setActiveSection(id);
				}
			}
		};

		const observer = new IntersectionObserver(handleIntersect, options);
		const sections = ["header", ...sectionOrder];
		for (const sectionId of sections) {
			const element = document.getElementById(`section-${sectionId}`);
			if (element) observer.observe(element);
		}

		return () => observer.disconnect();
	}, [sectionOrder]);

	const {
		fileInputRef,
		handleExportPDF,
		handleClearAll,
		handleExportJSON,
		handleExportMarkdown,
		handleExportText,
		handleImportJSON,
		handleImportMarkdown,
		handleImportMarkdownText,
		handleFileChange,
		isExporting,
	} = useResumeActions({
		resumeData,
		previewRef,
		importResumeData,
		resetResumeData,
	});

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const currentOrder = resumeData.sectionOrder || DEFAULT_SECTION_ORDER;
			const oldIndex = currentOrder.indexOf(
				active.id as (typeof currentOrder)[number],
			);
			const newIndex = currentOrder.indexOf(
				over.id as (typeof currentOrder)[number],
			);
			const newOrder = arrayMove(currentOrder, oldIndex, newIndex);
			updateResumeData({ sectionOrder: newOrder });
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
					<div className="relative">
						<div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
						<img
							src={logo}
							alt="Your Resume Builder Logo"
							className="size-20 object-contain relative z-10 dark:invert"
						/>
					</div>
					<div className="flex flex-col items-center gap-2">
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
							Your Resume Builder
						</h1>
						<div className="flex items-center gap-2 text-primary/60 dark:text-primary/40">
							<Loader2 className="size-4 animate-spin" />
							<span className="text-sm font-medium">
								Preparing your workspace...
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<ErrorBoundary fallback={<ErrorPage />}>
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
				<SiteHeader />

				<div className="flex-1 flex relative">
					<AppNavigation
						activeSection={activeSection}
						sectionOrder={sectionOrder}
						sectionsVisible={resumeData.sectionsVisible}
						onScrollToSection={scrollToSection}
					/>

					<main className="flex-1 lg:pl-20 px-4 pt-8 pb-16 w-full max-w-[1800px] mx-auto">
						<AppControlsHeader
							resumeData={resumeData}
							updateResumeData={updateResumeData}
							fileInputRef={fileInputRef}
							allSectionsCollapsed={allSectionsCollapsed}
							handleImportJSON={handleImportJSON}
							handleImportMarkdown={handleImportMarkdown}
							handleImportMarkdownText={() => setIsImportMarkdownOpen(true)}
							handleExportJSON={handleExportJSON}
							handleExportMarkdown={handleExportMarkdown}
							handleExportText={handleExportText}
							handleExportPDF={handleExportPDF}
							handleClearAll={handleClearAll}
							handleFileChange={handleFileChange}
							handleToggleAllSections={handleToggleAllSections}
							isExporting={isExporting}
						/>

						<div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] xl:grid-cols-[1fr_1.5fr] gap-6">
							<section
								className="space-y-6 no-print order-2 lg:order-1"
								aria-label="Resume Editor"
							>
								<HeaderSection
									resumeData={resumeData}
									updateResumeData={updateResumeData}
									isOpen={isHeaderOpen}
									onOpenChange={setIsHeaderOpen}
								/>

								<DndContext
									sensors={sensors}
									collisionDetection={closestCenter}
									onDragStart={handleCollapseAll}
									onDragEnd={handleDragEnd}
								>
									<SortableContext
										items={sectionOrder}
										strategy={verticalListSortingStrategy}
									>
										<SectionList
											resumeData={resumeData}
											updateResumeData={updateResumeData}
											sectionOrder={sectionOrder}
											isExperienceOpen={isExperienceOpen}
											setIsExperienceOpen={setIsExperienceOpen}
											isBackgroundOpen={isBackgroundOpen}
											setIsBackgroundOpen={setIsBackgroundOpen}
											isSideProjectsOpen={isSideProjectsOpen}
											setIsSideProjectsOpen={setIsSideProjectsOpen}
											isVolunteeringOpen={isVolunteeringOpen}
											setIsVolunteeringOpen={setIsVolunteeringOpen}
											isPersonalOpen={isPersonalOpen}
											setIsPersonalOpen={setIsPersonalOpen}
										/>
									</SortableContext>
								</DndContext>
							</section>

							<section
								className="order-1 lg:order-2"
								aria-label="Resume Preview"
							>
								<PreviewPane
									resumeData={resumeData}
									updateResumeData={updateResumeData}
									previewRef={previewRef}
									fonts={FONTS}
								/>
							</section>
						</div>
					</main>
				</div>

				<SiteFooter />

				<ScrollToTopButton isVisible={showScrollTop} onClick={scrollToTop} />
				<ImportMarkdownDialog
					open={isImportMarkdownOpen}
					onOpenChange={setIsImportMarkdownOpen}
					onImport={handleImportMarkdownText}
				/>
			</div>
		</ErrorBoundary>
	);
};

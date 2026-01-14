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
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useResumeActions } from "../hooks/useResumeActions";
import { ErrorBoundary } from "./ErrorBoundary";
import { SectionList } from "./SectionList";
import { HeaderSection } from "./sections/HeaderSection";
import { AppHeader } from "./layout/AppHeader";
import { AppNavigation } from "./layout/AppNavigation";
import { ScrollToTopButton } from "./layout/ScrollToTopButton";
import { PreviewPane } from "./preview/PreviewPane";

const DEFAULT_SECTION_ORDER: (
	| "experience"
	| "background"
	| "sideProjects"
	| "personal"
)[] = ["experience", "background", "sideProjects", "personal"];

const FONTS = [
	{
		name: "Sans Serif",
		value:
			"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
	},
	{
		name: "Serif",
		value: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
	},
	{
		name: "Mono",
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
	const [isPersonalOpen, setIsPersonalOpen] = useState(true);

	const sectionOrder = resumeData.sectionOrder || DEFAULT_SECTION_ORDER;

	const allSectionsCollapsed =
		!isHeaderOpen &&
		!isExperienceOpen &&
		!isBackgroundOpen &&
		!isSideProjectsOpen &&
		!isPersonalOpen;

	const handleToggleAllSections = () => {
		const shouldCollapse = !allSectionsCollapsed;
		setIsHeaderOpen(!shouldCollapse);
		setIsExperienceOpen(!shouldCollapse);
		setIsBackgroundOpen(!shouldCollapse);
		setIsSideProjectsOpen(!shouldCollapse);
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
		handleImportJSON,
		handleFileChange,
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
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-gray-500">Loading...</p>
			</div>
		);
	}

	return (
		<ErrorBoundary
			fallback={
				<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
					<div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
							Something went wrong
						</h1>
						<p className="text-gray-600 dark:text-gray-400 mb-4">
							The resume builder encountered an unexpected error. Please refresh
							the page to continue.
						</p>
						<button
							onClick={() => window.location.reload()}
							className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
						>
							Refresh Page
						</button>
					</div>
				</div>
			}
		>
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex relative">
				<AppNavigation
					activeSection={activeSection}
					sectionOrder={sectionOrder}
					onScrollToSection={scrollToSection}
				/>

				<div className="flex-1 lg:pl-20 px-4 py-8">
					<AppHeader
						resumeData={resumeData}
						fileInputRef={fileInputRef}
						allSectionsCollapsed={allSectionsCollapsed}
						handleImportJSON={handleImportJSON}
						handleExportJSON={handleExportJSON}
						handleExportPDF={handleExportPDF}
						handleClearAll={handleClearAll}
						handleFileChange={handleFileChange}
						handleToggleAllSections={handleToggleAllSections}
					/>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="space-y-6">
							<HeaderSection
								resumeData={resumeData}
								updateResumeData={updateResumeData}
								isOpen={isHeaderOpen}
								onOpenChange={setIsHeaderOpen}
							/>

							<DndContext
								sensors={sensors}
								collisionDetection={closestCenter}
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
										isPersonalOpen={isPersonalOpen}
										setIsPersonalOpen={setIsPersonalOpen}
									/>
								</SortableContext>
							</DndContext>
						</div>

						<PreviewPane
							resumeData={resumeData}
							updateResumeData={updateResumeData}
							previewRef={previewRef}
							fonts={FONTS}
						/>
					</div>
				</div>

				<ScrollToTopButton isVisible={showScrollTop} onClick={scrollToTop} />
			</div>
		</ErrorBoundary>
	);
};

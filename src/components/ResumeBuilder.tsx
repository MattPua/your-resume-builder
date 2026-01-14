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
import { ArrowUp, ZoomIn, ZoomOut } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useResumeActions } from "../hooks/useResumeActions";
import { ActionsMenu } from "./ActionsMenu";
import { ErrorBoundary } from "./ErrorBoundary";
import { ResumePreview } from "./ResumePreview";
import { SectionList } from "./SectionList";
import { HeaderSection } from "./sections/HeaderSection";
import { Button } from "./ui/button";

const DEFAULT_SECTION_ORDER: (
	| "experience"
	| "background"
	| "sideProjects"
	| "personal"
)[] = ["experience", "background", "sideProjects", "personal"];

export const ResumeBuilder = () => {
	const {
		resumeData,
		updateResumeData,
		resetResumeData,
		importResumeData,
		isLoading,
	} = useLocalStorage();
	const previewRef = useRef<HTMLDivElement>(null);
	const previewContainerRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const [zoomLevel, setZoomLevel] = useState(1);
	const [showScrollTop, setShowScrollTop] = useState(false);
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

	const handleZoomIn = () => {
		setZoomLevel((prev) => Math.min(prev + 0.1, 2));
	};

	const handleZoomOut = () => {
		setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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

	useEffect(() => {
		const updateScale = () => {
			if (!previewContainerRef.current) return;
			const container = previewContainerRef.current;
			const containerWidth = container.clientWidth - 32;
			const containerHeight = container.clientHeight - 32;
			const widthScale = containerWidth / 794;
			const heightScale = containerHeight / 1123;
			setScale(Math.min(1, Math.min(widthScale, heightScale)));
		};
		const timeoutId = setTimeout(updateScale, 100);
		updateScale();
		window.addEventListener("resize", updateScale);
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener("resize", updateScale);
		};
	}, []);

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
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
				<div className="container mx-auto px-4 py-8">
					<div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
						<div className="flex items-center gap-4">
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
								Resume Builder
							</h1>
							<div className="flex items-center gap-2">
								<label
									htmlFor="section-header-color"
									className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
								>
									Section Header Color:
								</label>
								<input
									id="section-header-color"
									type="color"
									value={resumeData.sectionHeaderBackgroundColor || "#1e40af"}
									onChange={(e) =>
										updateResumeData({
											sectionHeaderBackgroundColor: e.target.value,
										})
									}
									className="size-10 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
									title="Select section header background color"
								/>
							</div>
						</div>
						<ActionsMenu
							fileInputRef={fileInputRef}
							onImportJSON={handleImportJSON}
							onExportJSON={handleExportJSON}
							onExportPDF={handleExportPDF}
							onClearAll={handleClearAll}
							onFileChange={handleFileChange}
							onToggleAllSections={handleToggleAllSections}
							allSectionsCollapsed={allSectionsCollapsed}
						/>
					</div>

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

						<div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
							<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full flex flex-col">
								<div className="flex items-center justify-between mb-2">
									<h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
										Preview
									</h2>
									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											size="icon"
											onClick={handleZoomOut}
											disabled={zoomLevel <= 0.5}
											className="size-8"
											title="Zoom out"
										>
											<ZoomOut className="size-4" />
										</Button>
										<Button
											variant="outline"
											size="icon"
											onClick={handleZoomIn}
											disabled={zoomLevel >= 2}
											className="size-8"
											title="Zoom in"
										>
											<ZoomIn className="size-4" />
										</Button>
									</div>
								</div>
								<ErrorBoundary
									fallback={
										<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 flex-1 min-h-0 flex items-center justify-center">
											<div className="text-center">
												<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
													Preview encountered an error
												</p>
												<p className="text-xs text-gray-500 dark:text-gray-500">
													Please refresh the page or try again
												</p>
											</div>
										</div>
									}
								>
									<div
										ref={previewContainerRef}
										className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 overflow-auto flex-1 min-h-0"
									>
										<div
											style={{
												width: `${794 * scale * zoomLevel}px`,
												minHeight: `${1123 * scale * zoomLevel}px`,
												margin: "0 auto",
												position: "relative",
											}}
										>
											<div
												style={{
													transform: `scale(${scale * zoomLevel})`,
													transformOrigin: "top left",
													width: "794px",
													position: "absolute",
													left: 0,
													top: 0,
												}}
											>
												<ResumePreview
													data={resumeData}
													previewRef={previewRef}
												/>
											</div>
										</div>
									</div>
								</ErrorBoundary>
							</div>
						</div>
					</div>
				</div>
				{showScrollTop && (
					<Button
						onClick={scrollToTop}
						className="fixed bottom-8 right-8 rounded-full shadow-lg z-50 size-12 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
						size="icon"
						title="Scroll to top"
					>
						<ArrowUp className="size-6" />
					</Button>
				)}
			</div>
		</ErrorBoundary>
	);
};

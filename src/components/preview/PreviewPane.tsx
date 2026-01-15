import { useEffect, useRef, useState } from "react";
import type { ResumeData } from "../../types/resume";
import { ErrorBoundary } from "../ErrorBoundary";
import { ResumePreview } from "../ResumePreview";
import { PreviewConfiguration } from "./controls/PreviewConfiguration";
import { ZoomControls } from "./controls/ZoomControls";

interface PreviewPaneProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	previewRef: React.RefObject<HTMLDivElement | null>;
	fonts: { name: string; value: string }[];
}

export const PreviewPane = ({
	resumeData,
	updateResumeData,
	previewRef,
	fonts,
}: PreviewPaneProps) => {
	const previewContainerRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const [zoomLevel, setZoomLevel] = useState(1);
	const [previewFontFamily, setPreviewFontFamily] = useState<string | null>(
		null,
	);

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

	return (
		<div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] resume-preview-root-container">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full flex flex-col no-print-background">
				<div className="flex items-center justify-between mb-2 no-print">
					<div className="flex items-center gap-3">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
							Preview
						</h2>
						<PreviewConfiguration
							sectionHeaderBackgroundColor={
								resumeData.sectionHeaderBackgroundColor || "#3b82f6"
							}
							onBackgroundColorChange={(color) =>
								updateResumeData({ sectionHeaderBackgroundColor: color })
							}
							sectionHeaderTextColor={
								resumeData.sectionHeaderTextColor || "#ffffff"
							}
							onTextColorChange={(color) =>
								updateResumeData({ sectionHeaderTextColor: color })
							}
							layoutMode={resumeData.layoutMode || "default"}
							onLayoutModeChange={(mode) =>
								updateResumeData({ layoutMode: mode })
							}
							fontFamily={resumeData.fontFamily || fonts[0].value}
							onFontFamilyChange={(font) => {
								setPreviewFontFamily(null);
								updateResumeData({ fontFamily: font });
							}}
							onFontHover={(font) => setPreviewFontFamily(font)}
							onFontHoverEnd={() => setPreviewFontFamily(null)}
							fonts={fonts}
						/>
					</div>
					<ZoomControls
						zoomLevel={zoomLevel}
						onZoomIn={() => setZoomLevel((prev) => Math.min(prev + 0.1, 2))}
						onZoomOut={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))}
						onResetZoom={() => setZoomLevel(1)}
					/>
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
						className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 overflow-auto flex-1 min-h-0 no-print-border no-print-background"
					>
						<div
							className="resume-preview-wrapper"
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
									data={{
										...resumeData,
										fontFamily: previewFontFamily || resumeData.fontFamily,
									}}
									previewRef={previewRef}
								/>
							</div>
						</div>
					</div>
				</ErrorBoundary>
			</div>
		</div>
	);
};

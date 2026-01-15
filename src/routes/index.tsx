import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { ImportMarkdownDialog } from "../components/ImportMarkdownDialog";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useResumeActions } from "../hooks/useResumeActions";
import { createSeo } from "../lib/seo";

export const Route = createFileRoute("/")({
	head: () =>
		createSeo({
			title: "Free Resume Builder – ATS-Friendly, No Signup Required",
			description:
				"Build a professional, ATS-friendly resume online for free. No signup, no tracking. Your data stays on your device.",
		}),
	component: LandingPage,
});

function LandingPage() {
	const {
		loadSampleData,
		importResumeData,
		isLoading,
		resumeData,
		resetResumeData,
	} = useLocalStorage();
	const navigate = useNavigate();
	const [isImportMarkdownOpen, setIsImportMarkdownOpen] = useState(false);

	const { fileInputRef, handleFileChange, handleImportMarkdownText } =
		useResumeActions({
			resumeData,
			importResumeData,
			resetResumeData,
		});

	if (isLoading) return null;

	const hasExistingData = !!(
		resumeData.name ||
		resumeData.experience.length > 0 ||
		resumeData.education.length > 0
	);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
			<SiteHeader />
			<main className="flex-1 flex items-center justify-center pb-4">
				<EmptyState
					hasExistingData={hasExistingData}
					onStartFresh={() => {
						navigate({ to: "/build" });
					}}
					onLoadSample={() => {
						loadSampleData();
						navigate({ to: "/build" });
					}}
					onImportMarkdownText={() => {
						setIsImportMarkdownOpen(true);
					}}
				/>
			</main>
			<SiteFooter />
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				className="hidden"
			/>
			<ImportMarkdownDialog
				open={isImportMarkdownOpen}
				onOpenChange={setIsImportMarkdownOpen}
				onImport={(text) => {
					handleImportMarkdownText(text);
					navigate({ to: "/build" });
				}}
			/>
		</div>
	);
}

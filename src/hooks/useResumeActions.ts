import { useRef, useState } from "react";
import type { ResumeData } from "../types/resume";
import { exportToPDF } from "../lib/pdfExport";
import { convertToMarkdown } from "../lib/markdownExport";
import { convertToPlainText } from "../lib/textExport";

interface UseResumeActionsProps {
	resumeData: ResumeData;
	previewRef: React.RefObject<HTMLDivElement | null>;
	importResumeData: (data: ResumeData) => void;
	resetResumeData: () => void;
}

export const useResumeActions = ({
	resumeData,
	previewRef,
	importResumeData,
	resetResumeData,
}: UseResumeActionsProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isExporting, setIsExporting] = useState(false);

	const generateFilename = (extension: string) => {
		const name = resumeData.name.trim() || "resume";
		// Sanitize name: remove invalid filename characters
		const sanitizedName = name.replace(/[^a-zA-Z0-9\s-_]/g, "").replace(/\s+/g, "-");
		
		const now = new Date();
		const monthNames = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		const month = monthNames[now.getMonth()];
		const year = String(now.getFullYear());
		return `${sanitizedName}-${month}-${year}.${extension}`;
	};

	const handleExportPDF = async () => {
		if (previewRef.current) {
			try {
				setIsExporting(true);
				const filename = generateFilename("pdf");

				// Temporarily remove scale transform for export
				const scaledWrapper = previewRef.current.parentElement;
				if (scaledWrapper) {
					const originalTransform = scaledWrapper.style.transform;
					scaledWrapper.style.transform = "scale(1)";

					// Wait for render
					await new Promise((resolve) => setTimeout(resolve, 100));

					try {
						await exportToPDF(previewRef.current, filename);
					} finally {
						// Restore original transform
						scaledWrapper.style.transform = originalTransform;
					}
				} else {
					await exportToPDF(previewRef.current, filename);
				}
			} catch (error) {
				alert("Failed to export PDF. Please try again.");
				console.error(error);
			} finally {
				setIsExporting(false);
			}
		}
	};

	const handleClearAll = () => {
		if (
			window.confirm(
				"Are you sure you want to clear all saved data? This action cannot be undone.",
			)
		) {
			resetResumeData();
		}
	};

	const handleExportJSON = () => {
		const dataStr = JSON.stringify(resumeData, null, 2);
		const dataBlob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(dataBlob);
		const link = document.createElement("a");
		link.href = url;
		link.download = generateFilename("json");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const handleExportMarkdown = () => {
		const markdown = convertToMarkdown(resumeData);
		const dataBlob = new Blob([markdown], { type: "text/markdown" });
		const url = URL.createObjectURL(dataBlob);
		const link = document.createElement("a");
		link.href = url;
		link.download = generateFilename("md");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const handleExportText = () => {
		const text = convertToPlainText(resumeData);
		const dataBlob = new Blob([text], { type: "text/plain" });
		const url = URL.createObjectURL(dataBlob);
		const link = document.createElement("a");
		link.href = url;
		link.download = generateFilename("txt");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const handlePrint = () => {
		window.print();
	};

	const handleImportJSON = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const jsonData = JSON.parse(event.target?.result as string);
				if (
					window.confirm(
						"This will replace your current resume data. Are you sure you want to continue?",
					)
				) {
					importResumeData(jsonData as ResumeData);
					alert("Resume data imported successfully!");
				}
			} catch (error) {
				alert(
					"Failed to import JSON file. Please make sure it is a valid JSON file.",
				);
				console.error("Failed to import JSON:", error);
			}
		};
		reader.readAsText(file);
		// Reset input so same file can be selected again
		e.target.value = "";
	};

	return {
		fileInputRef,
		handleExportPDF,
		handleClearAll,
		handleExportJSON,
		handleExportMarkdown,
		handleExportText,
		handlePrint,
		handleImportJSON,
		handleFileChange,
		isExporting,
	};
};

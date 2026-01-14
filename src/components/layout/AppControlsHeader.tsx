import { ShieldCheck } from "lucide-react";
import { ActionsMenu } from "../ActionsMenu";

interface AppControlsHeaderProps {
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	allSectionsCollapsed: boolean;
	handleImportJSON: () => void;
	handleImportMarkdown: () => void;
	handleImportMarkdownText: () => void;
	handleExportJSON: () => void;
	handleExportMarkdown: () => void;
	handleExportText: () => void;
	handleExportPDF: () => void;
	handleClearAll: () => void;
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleToggleAllSections: () => void;
	isExporting?: boolean;
}

export const AppControlsHeader = ({
	fileInputRef,
	allSectionsCollapsed,
	handleImportJSON,
	handleImportMarkdown,
	handleImportMarkdownText,
	handleExportJSON,
	handleExportMarkdown,
	handleExportText,
	handleExportPDF,
	handleClearAll,
	handleFileChange,
	handleToggleAllSections,
	isExporting,
}: AppControlsHeaderProps) => {
	return (
		<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 mb-8 bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm backdrop-blur-sm no-print">
			<div className="flex flex-col gap-1">
				<p className="text-sm font-medium text-gray-700 dark:text-gray-300">
					Focus on your content, we'll handle the layout.
				</p>
				<p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
					<ShieldCheck className="size-3.5 text-green-600 dark:text-green-500" />
					<span>100% Private & Local • Open Source • Free</span>
				</p>
			</div>
			<div className="w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 dark:border-gray-700">
				<ActionsMenu
					fileInputRef={fileInputRef}
					onImportJSON={handleImportJSON}
					onImportMarkdown={handleImportMarkdown}
					onImportMarkdownText={handleImportMarkdownText}
					onExportJSON={handleExportJSON}
					onExportMarkdown={handleExportMarkdown}
					onExportText={handleExportText}
					onExportPDF={handleExportPDF}
					onClearAll={handleClearAll}
					onFileChange={handleFileChange}
					onToggleAllSections={handleToggleAllSections}
					allSectionsCollapsed={allSectionsCollapsed}
					isExporting={isExporting}
				/>
			</div>
		</div>
	);
};

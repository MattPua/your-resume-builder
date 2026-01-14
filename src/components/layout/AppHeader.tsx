import { ShieldCheck } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { ActionsMenu } from "../ActionsMenu";
import { InfoDialog } from "./InfoDialog";
import { ResumeData } from "../../types/resume";

interface AppHeaderProps {
	resumeData: ResumeData;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	allSectionsCollapsed: boolean;
	handleImportJSON: (data: any) => void;
	handleExportJSON: () => void;
	handleExportPDF: () => void;
	handleClearAll: () => void;
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleToggleAllSections: () => void;
}

export const AppHeader = ({
	resumeData,
	fileInputRef,
	allSectionsCollapsed,
	handleImportJSON,
	handleExportJSON,
	handleExportPDF,
	handleClearAll,
	handleFileChange,
	handleToggleAllSections,
}: AppHeaderProps) => {
	return (
		<div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-4">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Resume Builder
					</h1>
					<div className="flex items-center gap-2">
						<ThemeToggle />
						<InfoDialog />
					</div>
				</div>
				<p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
					<ShieldCheck className="size-3.5 text-green-600 dark:text-green-500" />
					<span>
						100% Local & Private • Nothing is uploaded • All data stays in your
						browser • Completely Free
					</span>
				</p>
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
	);
};

import {
	ChevronsUpDown,
	Download,
	FileJson,
	MoreVertical,
	Trash2,
	Upload,
} from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

interface ActionsMenuProps {
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	onImportJSON: () => void;
	onExportJSON: () => void;
	onExportPDF: () => void;
	onClearAll: () => void;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onToggleAllSections: () => void;
	allSectionsCollapsed: boolean;
}

export const ActionsMenu = ({
	fileInputRef,
	onImportJSON,
	onExportJSON,
	onExportPDF,
	onClearAll,
	onFileChange,
	onToggleAllSections,
	allSectionsCollapsed,
}: ActionsMenuProps) => {
	return (
		<div className="flex items-center gap-3">
			<Input
				ref={fileInputRef}
				type="file"
				accept=".json,application/json"
				onChange={onFileChange}
				className="hidden"
				aria-label="Import JSON file"
			/>
			<Button
				onClick={onToggleAllSections}
				variant="outline"
				size="sm"
				aria-label={
					allSectionsCollapsed ? "Expand all sections" : "Collapse all sections"
				}
				title={
					allSectionsCollapsed ? "Expand all sections" : "Collapse all sections"
				}
			>
				<ChevronsUpDown className="size-4" />
				{allSectionsCollapsed ? "Expand All" : "Collapse All"}
			</Button>
			<Button onClick={onExportPDF} variant="default" aria-label="Export PDF">
				<Download className="size-4" />
				Export PDF
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary" aria-label="Actions menu">
						<MoreVertical className="size-4" />
						Actions
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-48">
					<DropdownMenuItem onClick={onImportJSON} className="cursor-pointer">
						<Upload className="mr-2 size-4" />
						Import JSON
					</DropdownMenuItem>
					<DropdownMenuItem onClick={onExportJSON} className="cursor-pointer">
						<FileJson className="mr-2 size-4" />
						Export JSON
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={onClearAll}
						className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
					>
						<Trash2 className="mr-2 size-4" />
						Clear All
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

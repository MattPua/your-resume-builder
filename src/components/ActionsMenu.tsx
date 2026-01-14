import {
	ChevronsUpDown,
	Download,
	FileCode,
	FileDown,
	FileText,
	Loader2,
	MoreVertical,
	Printer,
	RotateCcw,
	Upload,
} from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "./ui/tooltip";

interface ActionsMenuProps {
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	onImportJSON: () => void;
	onImportMarkdown: () => void;
	onImportMarkdownText: () => void;
	onExportJSON: () => void;
	onExportMarkdown: () => void;
	onExportText: () => void;
	onExportPDF: () => void;
	onPrint: () => void;
	onClearAll: () => void;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onToggleAllSections: () => void;
	allSectionsCollapsed: boolean;
	isExporting?: boolean;
}

export const ActionsMenu = ({
	fileInputRef,
	onImportJSON,
	onImportMarkdown,
	onImportMarkdownText,
	onExportJSON,
	onExportMarkdown,
	onExportText,
	onExportPDF,
	onPrint,
	onClearAll,
	onFileChange,
	onToggleAllSections,
	allSectionsCollapsed,
	isExporting,
}: ActionsMenuProps) => {
	return (
		<div className="flex items-center gap-3">
			<Input
				ref={fileInputRef}
				type="file"
				accept=".json,application/json,.md,text/markdown"
				onChange={onFileChange}
				className="hidden"
				aria-label="Import file"
			/>
			<Button
				onClick={onExportPDF}
				variant="default"
				size="sm"
				className="h-9 px-4"
				aria-label="Export to PDF"
				disabled={isExporting}
			>
				{isExporting ? (
					<Loader2 className="size-4 animate-spin" />
				) : (
					<Download className="size-4" />
				)}
				{isExporting ? "Exporting..." : "Export to PDF"}
			</Button>
			<div className="flex items-center -space-x-px">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							onClick={onToggleAllSections}
							variant="outline"
							size="sm"
							className="rounded-r-none h-9 relative z-10"
							aria-label={
								allSectionsCollapsed ? "Expand all sections" : "Collapse all sections"
							}
						>
							<ChevronsUpDown className="size-4" />
							{allSectionsCollapsed ? "Expand All" : "Collapse All"}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>{allSectionsCollapsed ? "Expand all sections" : "Collapse all sections"}</p>
					</TooltipContent>
				</Tooltip>
				<DropdownMenu>
					<Tooltip>
						<TooltipTrigger asChild>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									className="rounded-l-none h-9 relative z-10 w-9"
									aria-label="Actions menu"
								>
									<MoreVertical className="size-4" />
								</Button>
							</DropdownMenuTrigger>
						</TooltipTrigger>
						<TooltipContent>
							<p>Actions menu</p>
						</TooltipContent>
					</Tooltip>
					<DropdownMenuContent align="end" className="w-48">
						<DropdownMenuGroup>
							<DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
								Import
							</DropdownMenuLabel>
							<DropdownMenuItem onClick={onImportJSON} className="cursor-pointer">
								<Upload className="mr-2 size-4" />
								Import from JSON
							</DropdownMenuItem>
							<DropdownMenuItem onClick={onImportMarkdown} className="cursor-pointer">
								<FileDown className="mr-2 size-4 rotate-180" />
								Import from Markdown file
							</DropdownMenuItem>
							<DropdownMenuItem onClick={onImportMarkdownText} className="cursor-pointer">
								<FileText className="mr-2 size-4" />
								Import from Markdown text
							</DropdownMenuItem>
						</DropdownMenuGroup>
						
						<DropdownMenuSeparator />
						
						<DropdownMenuGroup>
							<DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
								Export
							</DropdownMenuLabel>
							<DropdownMenuItem onClick={onExportJSON} className="cursor-pointer">
								<FileCode className="mr-2 size-4" />
								Export to JSON
							</DropdownMenuItem>
							<DropdownMenuItem onClick={onExportMarkdown} className="cursor-pointer">
								<FileDown className="mr-2 size-4" />
								Export to Markdown
							</DropdownMenuItem>
							<DropdownMenuItem onClick={onExportText} className="cursor-pointer">
								<FileText className="mr-2 size-4" />
								Export to Text
							</DropdownMenuItem>
							<DropdownMenuItem onClick={onPrint} className="cursor-pointer">
								<Printer className="mr-2 size-4" />
								Print
							</DropdownMenuItem>
						</DropdownMenuGroup>
						
						<DropdownMenuSeparator />
						
						<DropdownMenuItem
							onClick={onClearAll}
							className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
						>
							<RotateCcw className="mr-2 size-4" />
							Reset resume
						</DropdownMenuItem>
					</DropdownMenuContent>
			</DropdownMenu>
			</div>
		</div>
	);
};

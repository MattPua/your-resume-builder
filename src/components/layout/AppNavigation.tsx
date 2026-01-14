import {
	Briefcase,
	Contact,
	FileText,
	Folder,
	GraduationCap,
	Menu,
} from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../ui/tooltip";

interface AppNavigationProps {
	activeSection: string;
	sectionOrder: string[];
	onScrollToSection: (sectionId: string) => void;
}

const SECTION_ICONS = {
	experience: Briefcase,
	background: GraduationCap,
	sideProjects: Folder,
	personal: FileText,
};

const SECTION_TITLES = {
	experience: "Experience",
	background: "Education & Skills",
	sideProjects: "Side Projects",
	personal: "Personal",
};

export const AppNavigation = ({
	activeSection,
	sectionOrder,
	onScrollToSection,
}: AppNavigationProps) => {
	return (
		<>
			{/* Desktop Section Navigation */}
			<div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-2 z-50 no-print">
				<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-xl border border-gray-200 dark:border-gray-700 p-2 flex flex-col gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={activeSection === "header" ? "default" : "ghost"}
								size="icon"
								onClick={() => onScrollToSection("header")}
								className="rounded-full size-10 transition-all duration-200"
							>
								<Contact className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Header & Contact</p>
						</TooltipContent>
					</Tooltip>
					{sectionOrder.map((sectionId) => {
						const Icon = SECTION_ICONS[sectionId as keyof typeof SECTION_ICONS];
						const title =
							SECTION_TITLES[sectionId as keyof typeof SECTION_TITLES];
						const isActive = activeSection === sectionId;

						return (
							<Tooltip key={sectionId}>
								<TooltipTrigger asChild>
									<Button
										variant={isActive ? "default" : "ghost"}
										size="icon"
										onClick={() => onScrollToSection(sectionId)}
										className="rounded-full size-10 transition-all duration-200"
									>
										<Icon className="size-5" />
									</Button>
								</TooltipTrigger>
								<TooltipContent side="right">
									<p>{title}</p>
								</TooltipContent>
							</Tooltip>
						);
					})}
				</div>
			</div>

			{/* Mobile Section Navigation */}
			<div className="lg:hidden fixed left-8 bottom-8 z-50 no-print">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							size="icon"
							className="rounded-full size-12 shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							<Menu className="size-6" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="right" align="end" className="w-56">
						<DropdownMenuItem
							onClick={() => onScrollToSection("header")}
							className={activeSection === "header" ? "bg-accent" : ""}
						>
							<Contact className="size-4 mr-2" />
							<span>Header & Contact</span>
						</DropdownMenuItem>
						{sectionOrder.map((sectionId) => {
							const Icon =
								SECTION_ICONS[sectionId as keyof typeof SECTION_ICONS];
							const title =
								SECTION_TITLES[sectionId as keyof typeof SECTION_TITLES];
							return (
								<DropdownMenuItem
									key={sectionId}
									onClick={() => onScrollToSection(sectionId)}
									className={activeSection === sectionId ? "bg-accent" : ""}
								>
									<Icon className="size-4 mr-2" />
									<span>{title}</span>
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	);
};

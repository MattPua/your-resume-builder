import { Github } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { InfoDialog } from "./InfoDialog";
import { Button } from "../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../ui/tooltip";
import logo from "../ui/logo.jpeg";

export const SiteHeader = () => {
	return (
		<header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
			<div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<img
						src={logo}
						alt="Your Resume Builder Logo"
						className="size-12 object-contain dark:invert"
					/>
					<h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
						Your Resume Builder
					</h1>
				</div>
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<InfoDialog />
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full size-10 hover:bg-gray-100 dark:hover:bg-gray-700"
								asChild
							>
								<a
									href="https://github.com/MattPua/resume-builder"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Github className="size-5" />
									<span className="sr-only">GitHub Repository</span>
								</a>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>View on GitHub</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</header>
	);
};

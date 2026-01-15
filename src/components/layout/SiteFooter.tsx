import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import logo from "../ui/logo.webp";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const SiteFooter = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 px-4 lg:px-8 no-print mt-auto">
			<div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
				<div className="flex flex-col gap-4">
					<Link to="/" className="flex items-center gap-3 group cursor-pointer">
						<img
							src={logo}
							alt="Your Resume Builder Logo"
							className="size-10 object-contain dark:invert transition-transform duration-300 group-hover:scale-110"
						/>
						<div className="relative">
							<h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
								Your Resume Builder
							</h2>
						</div>
					</Link>
					<p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
						A tool for crafting professional resumes with ease.
					</p>
					<div className="flex items-center gap-4 mt-2">
						<p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
							© {currentYear}
						</p>
						<span className="text-gray-300 dark:text-gray-700">|</span>
						<Link
							to="/"
							className="text-xs text-gray-400 dark:text-gray-500 hover:text-primary transition-colors"
							activeProps={{
								className: "text-primary dark:text-primary font-semibold",
							}}
							activeOptions={{ exact: true }}
						>
							Home
						</Link>
						<span className="text-gray-300 dark:text-gray-700">|</span>
						<Link
							to="/about"
							className="text-xs text-gray-400 dark:text-gray-500 hover:text-primary transition-colors"
							activeProps={{
								className: "text-primary dark:text-primary font-semibold",
							}}
						>
							About
						</Link>
						<span className="text-gray-300 dark:text-gray-700">|</span>
						<Link
							to="/build"
							className="text-xs text-gray-400 dark:text-gray-500 hover:text-primary transition-colors"
							activeProps={{
								className: "text-primary dark:text-primary font-semibold",
							}}
						>
							Build
						</Link>
						<span className="text-gray-300 dark:text-gray-700">|</span>
						<Link
							to="/faqs"
							className="text-xs text-gray-400 dark:text-gray-500 hover:text-primary transition-colors"
							activeProps={{
								className: "text-primary dark:text-primary font-semibold",
							}}
						>
							FAQs
						</Link>
					</div>
				</div>

				<div className="flex items-center gap-6">
					<div className="flex items-center gap-3">
						<ThemeToggle />
					</div>

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
		</footer>
	);
};

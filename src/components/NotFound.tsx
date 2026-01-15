import { Link } from "@tanstack/react-router";
import { FileQuestion, Home, Search, Compass } from "lucide-react";
import { SiteFooter } from "./layout/SiteFooter";
import { SiteHeader } from "./layout/SiteHeader";
import { Button } from "./ui/button";

export const NotFound = () => {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
			<SiteHeader />

			<main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16 text-center">
				<div className="relative mb-8 group">
					<div className="absolute inset-0 rounded-full bg-primary/10 animate-ping scale-150 opacity-20" />
					<div className="size-32 rounded-3xl bg-primary/10 flex items-center justify-center text-primary relative z-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
						<Compass className="size-16 animate-pulse" />
					</div>
					<div className="absolute -top-2 -right-2 size-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 animate-bounce delay-100">
						<FileQuestion className="size-6" />
					</div>
				</div>

				<div className="space-y-4 max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
					<h1 className="text-6xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-7xl">
						404
					</h1>
					<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
						Whoops! You've wandered off the grid.
					</h2>
					<p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
						Even the best resumes have typos, but this page is a total "no-show."
						Maybe it's taking a personal day?
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 mt-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
					<Button asChild size="lg" className="gap-2 px-8 py-6 text-lg">
						<Link to="/">
							<Home className="size-5" />
							Back to Builder
						</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="gap-2 px-8 py-6 text-lg"
					>
						<Link to="/faqs">
							<Search className="size-5" />
							Search FAQs
						</Link>
					</Button>
				</div>

				<div className="mt-12 text-sm text-gray-500 flex items-center gap-2 italic">
					<div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
					Safe travels back to the land of professional resumes!
				</div>
			</main>

			<SiteFooter />
		</div>
	);
};

import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import logo from "../ui/logo.webp";

export const SiteHeader = () => {
	return (
		<header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 no-print">
			<div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-3 group cursor-pointer">
					<img
						src={logo}
						alt="Your Resume Builder Logo"
						className="size-12 object-contain dark:invert transition-transform duration-300 group-hover:scale-110"
					/>
					<div className="relative">
						<h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
							Your Resume Builder
						</h1>
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full" />
					</div>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden sm:flex items-center gap-6">
					<Link
						to="/"
						activeOptions={{ exact: true }}
						className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
						activeProps={{
							className: "text-primary dark:text-primary font-semibold",
						}}
					>
						Home
					</Link>
					<Link
						to="/build"
						className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
						activeProps={{
							className: "text-primary dark:text-primary font-semibold",
						}}
					>
						Build
					</Link>
					<Link
						to="/about"
						className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
						activeProps={{
							className: "text-primary dark:text-primary font-semibold",
						}}
					>
						About
					</Link>
					<Link
						to="/faqs"
						className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
						activeProps={{
							className: "text-primary dark:text-primary font-semibold",
						}}
					>
						FAQs
					</Link>
				</div>

				{/* Mobile Navigation */}
				<div className="flex sm:hidden items-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="size-10">
								<Menu className="size-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-48">
							<DropdownMenuItem asChild>
								<Link
									to="/"
									activeOptions={{ exact: true }}
									activeProps={{
										className: "bg-accent text-accent-foreground",
									}}
								>
									Home
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link
									to="/build"
									activeProps={{
										className: "bg-accent text-accent-foreground",
									}}
								>
									Build
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link
									to="/about"
									activeProps={{
										className: "bg-accent text-accent-foreground",
									}}
								>
									About
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link
									to="/faqs"
									activeProps={{
										className: "bg-accent text-accent-foreground",
									}}
								>
									FAQs
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
};

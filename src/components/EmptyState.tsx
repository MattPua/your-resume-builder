import { Link } from "@tanstack/react-router";
import {
	Database,
	FileText,
	HelpCircle,
	ShieldCheck,
	Sparkles,
	User,
	Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import logo from "./ui/logo.webp";

interface EmptyStateProps {
	onStartFresh: () => void;
	onLoadSample: () => void;
	onImportMarkdownText: () => void;
	hasExistingData?: boolean;
}

export const EmptyState = ({
	onStartFresh,
	onLoadSample,
	onImportMarkdownText,
	hasExistingData = false,
}: EmptyStateProps) => {
	return (
		<div className="flex flex-col items-start justify-center min-h-[80vh] px-4">
			<div className="mt-10 sm:mt-0 max-w-2xl w-full text-center space-y-10 sm:space-y-8 animate-in fade-in zoom-in duration-500">
				<div className="flex items-center justify-center">
					<div className="relative">
						<img
							src={logo}
							alt="Your Resume Builder Logo"
							className="size-24 object-contain relative z-10 dark:invert"
						/>
					</div>
				</div>

				<div className="space-y-4 sm:space-y-3">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
						Build a Professional Resume for Free — No Signup Required
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
						Create a modern, ATS-friendly resume directly in your browser. Your
						data never leaves your device.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
					<div className="flex flex-col gap-2">
						<Button
							onClick={onStartFresh}
							size="lg"
							className="h-auto py-6 flex flex-col items-center gap-3 text-lg"
							aria-label={
								hasExistingData ? "Continue Building" : "Build Your Resume Free"
							}
						>
							<div className="flex flex-col items-center">
								<span>
									{hasExistingData
										? "Continue Building"
										: "Build Your Resume Free"}
								</span>
								<span className="text-xs font-normal opacity-80">
									{hasExistingData
										? "Pick up where you left off"
										: "100% Free • No Payment Required"}
								</span>
							</div>
						</Button>

						<Button
							variant="secondary"
							onClick={onLoadSample}
							className="h-auto py-4 flex items-center justify-center gap-2"
							aria-label="Load sample data to see how it works"
						>
							<Sparkles className="size-4 text-amber-500" />
							<span className="font-semibold text-sm">
								Try with Sample Data
							</span>
						</Button>
					</div>

					<div className="grid grid-cols-1 gap-2">
						<Button
							variant="outline"
							onClick={onImportMarkdownText}
							className="h-full py-6 flex flex-col items-center justify-center gap-3 px-6"
							aria-label="Start Without Signing Up"
						>
							<FileText className="size-6 text-blue-500" />
							<div className="flex flex-col items-center">
								<span className="font-semibold text-lg">
									Start Without Signing Up
								</span>
								<span className="text-xs font-normal text-gray-500">
									Paste Markdown
								</span>
							</div>
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-y border-gray-100 dark:border-gray-800">
					<div className="flex flex-col items-center gap-2">
						<div className="size-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
							<ShieldCheck className="size-5" />
						</div>
						<div className="text-center">
							<p className="text-xs font-bold text-gray-900 dark:text-white">
								100% Free
							</p>
							<p className="text-[10px] text-gray-500">No hidden costs</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-2">
						<div className="size-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
							<User className="size-5" />
						</div>
						<div className="text-center">
							<p className="text-xs font-bold text-gray-900 dark:text-white">
								No Account
							</p>
							<p className="text-[10px] text-gray-500">Start immediately</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-2">
						<div className="size-8 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
							<Database className="size-5" />
						</div>
						<div className="text-center">
							<p className="text-xs font-bold text-gray-900 dark:text-white">
								Privacy-First
							</p>
							<p className="text-[10px] text-gray-500">Data stays local</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-2">
						<div className="size-8 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
							<Zap className="size-5" />
						</div>
						<div className="text-center">
							<p className="text-xs font-bold text-gray-900 dark:text-white">
								ATS-Friendly
							</p>
							<p className="text-[10px] text-gray-500">Recruiter approved</p>
						</div>
					</div>
				</div>

				<div className="pt-2 space-y-4">
					<p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1.5">
						<HelpCircle className="size-4" />
						<span>Have questions? Check out our</span>
						<Link
							to="/faqs"
							className="text-primary hover:underline font-semibold"
						>
							Frequently Asked Questions
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

import { Info, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export const InfoDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="rounded-full size-10"
					title="How it works & Privacy"
				>
					<Info className="size-5" />
					<span className="sr-only">How it works & Privacy</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<ShieldCheck className="size-5 text-green-600 dark:text-green-500" />
						How it works & Privacy
					</DialogTitle>
					<DialogDescription className="pt-4 space-y-4 text-gray-600 dark:text-gray-400">
						<p>
							This Resume Builder is designed to be <strong>100% private and secure</strong>.
							All your data stays right in your browser.
						</p>
						<div className="grid gap-4 pt-2">
							<div className="space-y-1">
								<h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
									🔒 Total Privacy
								</h4>
								<p className="text-sm">
									Nothing is ever uploaded to a server. We don't collect, see, or
									store any of your personal information.
								</p>
							</div>
							<div className="space-y-1">
								<h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
									💾 Auto-Saving
								</h4>
								<p className="text-sm">
									Your changes are automatically saved to only your browser so
									you can come back later and continue editing.
								</p>
							</div>
							<div className="space-y-1">
								<h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
									📂 Backup & Transfer
								</h4>
								<p className="text-sm">
									You can export your resume to keep a backup or move it to
									another device. Simply import it back whenever you need it.
								</p>
							</div>
							<div className="space-y-1">
								<h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
									📄 PDF Export
								</h4>
								<p className="text-sm">
									Download a high-quality, multi-page PDF of your resume. Your
									contact header will automatically repeat on every page.
								</p>
							</div>
							<div className="space-y-1">
								<h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
									✨ Completely Free
								</h4>
								<p className="text-sm">
									No accounts, no subscriptions, no ads. Just a simple tool to
									help you build a professional resume.
								</p>
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

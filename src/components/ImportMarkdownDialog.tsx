import { Check, Copy, FileDown, Sparkles } from "lucide-react";
import { useState } from "react";
import { resumeToMarkdownPrompt } from "../lib/constants";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

interface ImportMarkdownDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onImport: (markdown: string) => void;
}

export const ImportMarkdownDialog = ({
	open,
	onOpenChange,
	onImport,
}: ImportMarkdownDialogProps) => {
	const [markdownText, setMarkdownText] = useState("");
	const [copied, setCopied] = useState(false);

	const handleCopyPrompt = async () => {
		await navigator.clipboard.writeText(resumeToMarkdownPrompt);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleImport = () => {
		if (markdownText.trim()) {
			onImport(markdownText);
			setMarkdownText("");
			onOpenChange(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
				<DialogHeader className="p-6 pb-4">
					<DialogTitle className="flex items-center gap-2">
						<Sparkles className="size-5 text-primary" />
						Import from Markdown
					</DialogTitle>
					<DialogDescription>
						Convert your existing resume using AI, then paste the markdown
						response below.
					</DialogDescription>
				</DialogHeader>

				<div className="flex-1 overflow-y-auto p-6 pt-0 space-y-6">
					<div className="space-y-4 p-5 bg-primary/5 rounded-xl border border-primary/10">
						<div className="space-y-2">
							<h4 className="text-sm font-bold flex items-center gap-2 text-primary">
								<span className="flex items-center justify-center size-5 rounded-full bg-primary text-[10px] text-primary-foreground">
									1
								</span>
								Copy & Use AI Prompt
							</h4>
							<p className="text-sm text-muted-foreground leading-relaxed pl-7">
								Copy our specialized prompt and paste it into ChatGPT or Claude
								along with your current resume text or PDF.
							</p>
						</div>
						<div className="pl-7">
							<Button
								variant="outline"
								size="sm"
								className="w-full h-10 gap-2 border-primary/20 bg-background hover:bg-primary/5 text-primary transition-colors focus-visible:ring-primary"
								onClick={handleCopyPrompt}
							>
								{copied ? (
									<>
										<Check className="size-4 text-green-600 dark:text-green-500" />
										Prompt Copied!
									</>
								) : (
									<>
										<Copy className="size-4" />
										Copy AI Prompt
									</>
								)}
							</Button>
						</div>
					</div>

					<div className="space-y-3">
						<h4 className="text-sm font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
							<span className="flex items-center justify-center size-5 rounded-full bg-gray-900 dark:bg-gray-100 text-[10px] text-white dark:text-gray-900">
								2
							</span>
							Paste AI Response
						</h4>
						<div className="pl-7 space-y-2">
							<label
								htmlFor="markdown-input"
								className="text-xs font-medium text-muted-foreground"
							>
								Paste the full markdown output from the AI below:
							</label>
							<Textarea
								id="markdown-input"
								placeholder="# John Doe\njohn@example.com | ...\n\n## Experience\n### Software Engineer @ Tech Corp\n..."
								className="min-h-[200px] font-mono text-xs resize-none bg-background focus-visible:ring-primary border-gray-200 dark:border-gray-800"
								value={markdownText}
								onChange={(e) => setMarkdownText(e.target.value)}
							/>
							<p className="text-[11px] text-muted-foreground italic">
								Make sure to include all sections (Experience, Education, etc.)
								from the AI's response.
							</p>
						</div>
					</div>
				</div>

				<DialogFooter className="p-6 pt-4 bg-muted/30 border-t">
					<Button
						variant="ghost"
						onClick={() => onOpenChange(false)}
						className="h-10"
					>
						Cancel
					</Button>
					<Button
						onClick={handleImport}
						disabled={!markdownText.trim()}
						className="h-10 px-8 gap-2"
					>
						<FileDown className="size-4" />
						Import Data
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

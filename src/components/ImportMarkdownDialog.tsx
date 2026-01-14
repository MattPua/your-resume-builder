import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Copy, Check, FileDown, Sparkles } from "lucide-react";
import { resumeToMarkdownPrompt } from "../lib/constants";

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
						Paste your resume markdown below to import it into the builder.
					</DialogDescription>
				</DialogHeader>

				<div className="flex-1 overflow-y-auto p-6 pt-0 space-y-6">
					<div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
						<h4 className="text-sm font-semibold flex items-center gap-2">
							<Sparkles className="size-4 text-primary" />
							AI-Powered Import Guidance
						</h4>
						<p className="text-sm text-muted-foreground leading-relaxed">
							To convert an existing resume PDF into the correct format, copy our specialized prompt and use it with ChatGPT, Claude, or any AI of your choice.
						</p>
						<Button
							variant="outline"
							size="sm"
							className="w-full h-10 gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary transition-colors focus-visible:ring-primary"
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

					<div className="space-y-3">
						<label
							htmlFor="markdown-input"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Markdown Content
						</label>
						<Textarea
							id="markdown-input"
							placeholder="# John Doe\njohn@example.com | ...\n\n## Experience\n### Software Engineer @ Tech Corp\n..."
							className="min-h-[250px] font-mono text-xs resize-none bg-background focus-visible:ring-primary"
							value={markdownText}
							onChange={(e) => setMarkdownText(e.target.value)}
						/>
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

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { SideProjectEntry } from "../../types/resume";
import { SectionPreview } from "./SectionPreview";

interface SideProjectsPreviewProps {
	entries: SideProjectEntry[];
	title?: string;
	backgroundColor?: string;
	textColor?: string;
	layoutMode?: "compact" | "default" | "comfortable";
}

export const SideProjectsPreview = ({
	entries,
	title = "Side Projects",
	backgroundColor,
	textColor,
	layoutMode = "default",
}: SideProjectsPreviewProps) => {
	if (entries.length === 0) return null;

	const spacingMap = {
		compact: "gap-1",
		default: "gap-2",
		comfortable: "gap-3",
	}[layoutMode];

	return (
		<SectionPreview
			title={title}
			backgroundColor={backgroundColor}
			textColor={textColor}
			layoutMode={layoutMode}
		>
			<div className={`flex flex-col ${spacingMap}`}>
				{entries.map((entry, index) => (
					<div key={`${entry.title}-${index}`}>
						<div className="mb-0">
							<div className="flex items-baseline justify-between gap-4">
								<h3
									className="text-base font-semibold text-gray-900"
									style={{ color: "#111827" }}
								>
									{entry.titleUrl ? (
										<a
											href={entry.titleUrl}
											target="_blank"
											rel="noopener noreferrer"
											style={{ color: "#111827", textDecoration: "none" }}
										>
											{entry.title}
										</a>
									) : (
										entry.title
									)}
								</h3>
								{(entry.startDate || entry.endDate) && (
									<p
										className="text-sm text-gray-600 italic whitespace-nowrap shrink-0"
										style={{ color: "#4b5563" }}
									>
										{entry.startDate}{" "}
										{entry.endDate ? `— ${entry.endDate}` : ""}
									</p>
								)}
							</div>
						</div>
						{entry.bulletPoints && (
							<div className="prose prose-sm max-w-none">
								<ReactMarkdown remarkPlugins={[remarkGfm]}>
									{entry.bulletPoints}
								</ReactMarkdown>
							</div>
						)}
					</div>
				))}
			</div>
		</SectionPreview>
	);
};

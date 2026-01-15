import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ResumeData } from "../../types/resume";
import { SectionPreview } from "./SectionPreview";

interface PersonalPreviewProps {
	personal?: ResumeData["personal"];
	title?: string;
	backgroundColor?: string;
	textColor?: string;
	layoutMode?: "compact" | "default" | "comfortable";
}

export const PersonalPreview = ({
	personal,
	title = "Personal",
	backgroundColor,
	textColor,
	layoutMode = "default",
}: PersonalPreviewProps) => {
	if (!personal) return null;
	if (!personal.bulletPoints || personal.bulletPoints.trim() === "")
		return null;

	return (
		<SectionPreview
			title={title}
			backgroundColor={backgroundColor}
			textColor={textColor}
			layoutMode={layoutMode}
		>
			<div className="prose prose-sm max-w-none">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{personal.bulletPoints}
				</ReactMarkdown>
			</div>
		</SectionPreview>
	);
};

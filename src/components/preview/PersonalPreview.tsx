import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ResumeData } from "../../types/resume";
import { SectionPreview } from "./SectionPreview";

interface PersonalPreviewProps {
	personal?: ResumeData["personal"];
	title?: string;
	backgroundColor?: string;
}

export const PersonalPreview = ({
	personal,
	title = "Personal",
	backgroundColor,
}: PersonalPreviewProps) => {
	if (!personal || personal.visible === false) return null;
	if (!personal.bulletPoints || personal.bulletPoints.trim() === "") return null;

	return (
		<SectionPreview title={title} backgroundColor={backgroundColor}>
			<div className="prose prose-sm max-w-none">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{personal.bulletPoints}
				</ReactMarkdown>
			</div>
		</SectionPreview>
	);
};

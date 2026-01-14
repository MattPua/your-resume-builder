import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { EducationEntry } from "../../types/resume";
import { SectionPreview } from "./SectionPreview";

interface BackgroundPreviewProps {
	education: EducationEntry[];
	skills: string;
	showSkills: boolean;
	title?: string;
	backgroundColor?: string;
	textColor?: string;
}

export const BackgroundPreview = ({
	education,
	skills,
	showSkills,
	title = "Background",
	backgroundColor,
	textColor,
}: BackgroundPreviewProps) => {
	const hasEducation = education.length > 0;
	const hasSkills = showSkills && skills;

	if (!hasEducation && !hasSkills) return null;

	return (
		<SectionPreview title={title} backgroundColor={backgroundColor} textColor={textColor}>
			{hasEducation && (
				<div className="mb-0.5">
					{education.map((entry, index) => (
						<div key={index} className="mb-0">
							<div className="flex items-baseline justify-between gap-4">
								<div>
									<h3
										className="text-base font-semibold text-gray-900"
										style={{ color: "#111827" }}
									>
										{entry.degree}
										{entry.institution && (
											<>
												{" @ "}
												{entry.institutionUrl ? (
													<a
														href={entry.institutionUrl}
														target="_blank"
														rel="noopener noreferrer"
														style={{
															color: "#111827",
															textDecoration: "none",
														}}
													>
														{entry.institution}
													</a>
												) : (
													entry.institution
												)}
											</>
										)}
									</h3>
								</div>
								{(entry.startDate || entry.endDate) && (
									<span
										className="text-sm text-gray-600 italic whitespace-nowrap"
										style={{ color: "#4b5563" }}
									>
										{entry.startDate}{" "}
										{entry.endDate ? `- ${entry.endDate}` : ""}
									</span>
								)}
							</div>
							{entry.bulletPoints && (
								<div className="prose prose-sm max-w-none mt-0">
									<ReactMarkdown remarkPlugins={[remarkGfm]}>
										{entry.bulletPoints}
									</ReactMarkdown>
								</div>
							)}
						</div>
					))}
				</div>
			)}
			{hasSkills && (
				<div>
					<div className="flex items-start gap-2">
						<span
							className="text-sm font-semibold text-gray-900 whitespace-nowrap"
							style={{ color: "#111827" }}
						>
							Skills:
						</span>
						<div className="prose prose-sm max-w-none flex-1">
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{skills}
							</ReactMarkdown>
						</div>
					</div>
				</div>
			)}
		</SectionPreview>
	);
};

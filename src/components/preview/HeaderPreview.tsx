import type { ResumeData } from "../../types/resume";

interface HeaderPreviewProps {
	data: ResumeData;
	backgroundColor?: string;
	layoutMode?: "compact" | "default" | "comfortable";
}

export const HeaderPreview = ({
	data,
	backgroundColor,
	layoutMode = "default",
}: HeaderPreviewProps) => {
	const linkColor = backgroundColor || "#0891b2";

	const spacingMap = {
		compact: "mb-0.5 pb-1",
		default: "mb-1 pb-1.5",
		comfortable: "mb-1.5 pb-2",
	}[layoutMode];

	const titleSizeMap = {
		compact: "text-3xl",
		default: "text-4xl",
		comfortable: "text-5xl",
	}[layoutMode];

	return (
		<section className={`${spacingMap}`}>
			<div className="flex flex-col gap-2">
				<div>
					<h1
						className={`${titleSizeMap} font-bold text-gray-900`}
						style={{ color: "#111827" }}
					>
						{data.name || ""}
					</h1>
				</div>
				<div
					className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700"
					style={{ color: "#374151" }}
				>
					{data.email && (
						<div className="flex items-center gap-1.5">
							<span className="font-medium">Email:</span>{" "}
							<a
								href={`mailto:${data.email}`}
								className="hover:opacity-80 underline transition-opacity"
								style={{ color: linkColor }}
							>
								{data.email}
							</a>
						</div>
					)}
					{data.website && (
						<div className="flex items-center gap-1.5">
							<span className="font-medium">Website:</span>{" "}
							<a
								href={data.website}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:opacity-80 underline transition-opacity"
								style={{ color: linkColor }}
							>
								{data.website}
							</a>
						</div>
					)}
					{data.phone && (
						<div className="flex items-center gap-1.5">
							<span className="font-medium">Phone:</span> {data.phone}
						</div>
					)}
					{data.github && (
						<div className="flex items-center gap-1.5">
							<span className="font-medium">GitHub:</span>{" "}
							<a
								href={data.github}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:opacity-80 underline transition-opacity"
								style={{ color: linkColor }}
							>
								{data.github}
							</a>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

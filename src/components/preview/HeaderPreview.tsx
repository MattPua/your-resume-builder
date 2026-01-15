import type { ResumeData } from "../../types/resume";

interface HeaderPreviewProps {
	data: ResumeData;
	layoutMode?: "compact" | "default" | "comfortable";
}

export const HeaderPreview = ({
	data,
	layoutMode = "default",
}: HeaderPreviewProps) => {
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
		<section className={`${spacingMap} border-b border-gray-100`}>
			<div className="flex flex-row items-center justify-between gap-6 pb-2">
				<div className="shrink-0">
					<h1
						className={`${titleSizeMap} font-bold text-gray-900 leading-tight`}
						style={{ color: "#111827" }}
					>
						{data.name || ""}
					</h1>
				</div>

				<div
					className="grid grid-cols-2 gap-x-8 gap-y-0.5 text-[11px] leading-tight text-gray-700"
					style={{ color: "#374151" }}
				>
					{/* Column 1: Left Aligned */}
					<div className="flex flex-col items-start gap-0.5">
						{data.email && (
							<div className="flex items-center gap-1 min-w-0">
								<span className="font-semibold shrink-0">Email:</span>
								<a
									href={`mailto:${data.email}`}
									className="hover:opacity-80 transition-opacity no-underline text-inherit truncate"
								>
									{data.email}
								</a>
							</div>
						)}
						{data.phone && (
							<div className="flex items-center gap-1 min-w-0">
								<span className="font-semibold shrink-0">Phone:</span>
								<span className="truncate">{data.phone}</span>
							</div>
						)}
					</div>

					{/* Column 2: Right Aligned */}
					<div className="flex flex-col items-end gap-0.5 text-right">
						{data.website && (
							<div className="flex items-center gap-1 min-w-0">
								<span className="font-semibold shrink-0">Website:</span>
								<a
									href={data.website}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:opacity-80 transition-opacity no-underline text-inherit truncate"
								>
									{data.website.replace(/^https?:\/\/(www\.)?/, "")}
								</a>
							</div>
						)}
						{data.github && (
							<div className="flex items-center gap-1 min-w-0">
								<span className="font-semibold shrink-0">GitHub:</span>
								<a
									href={data.github}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:opacity-80 transition-opacity no-underline text-inherit truncate"
								>
									{data.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

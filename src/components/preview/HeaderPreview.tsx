import type { ResumeData } from "../../types/resume";

interface HeaderPreviewProps {
	data: ResumeData;
}

export const HeaderPreview = ({ data }: HeaderPreviewProps) => {
	return (
		<section className="mb-1 pb-1.5">
			<div className="grid gap-4" style={{ gridTemplateColumns: "1fr 2fr" }}>
				<div>
					<h1
						className="text-3xl font-bold text-gray-900"
						style={{ color: "#111827" }}
					>
						{data.name || ""}
					</h1>
				</div>
				<div
					className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700"
					style={{ color: "#374151" }}
				>
					<div className="flex flex-col gap-1">
						{data.email && (
							<div className="whitespace-nowrap overflow-hidden text-ellipsis text-left">
								<span className="font-medium">Email:</span>{" "}
								<a
									href={`mailto:${data.email}`}
									className="text-cyan-600 hover:text-cyan-700 underline"
									style={{ color: "#0891b2" }}
								>
									{data.email}
								</a>
							</div>
						)}
						{data.website && (
							<div className="whitespace-nowrap overflow-hidden text-ellipsis text-left">
								<span className="font-medium">Website:</span>{" "}
								<a
									href={data.website}
									target="_blank"
									rel="noopener noreferrer"
									className="text-cyan-600 hover:text-cyan-700 underline"
									style={{ color: "#0891b2" }}
								>
									{data.website}
								</a>
							</div>
						)}
					</div>
					<div className="flex flex-col gap-1">
						{data.phone && (
							<div className="whitespace-nowrap overflow-hidden text-ellipsis text-right">
								<span className="font-medium">Phone:</span> {data.phone}
							</div>
						)}
						{data.github && (
							<div className="whitespace-nowrap overflow-hidden text-ellipsis text-right">
								<span className="font-medium">GitHub:</span>{" "}
								<a
									href={data.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-cyan-600 hover:text-cyan-700 underline"
									style={{ color: "#0891b2" }}
								>
									{data.github}
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

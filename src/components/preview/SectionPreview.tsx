interface SectionPreviewProps {
	title: string;
	children: React.ReactNode;
	className?: string;
	backgroundColor?: string;
	textColor?: string;
	layoutMode?: "compact" | "default" | "comfortable";
}

export const SectionPreview = ({
	title,
	children,
	className = "",
	backgroundColor = "#3b82f6",
	textColor = "#ffffff",
	layoutMode = "default",
}: SectionPreviewProps) => {
	const spacingMap = {
		compact: {
			title: "text-base px-2 py-0.5 mb-0.5",
			section: "mb-0.5",
		},
		default: {
			title: "text-lg px-3 py-1 mb-1",
			section: "mb-1",
		},
		comfortable: {
			title: "text-xl px-4 py-1.5 mb-1.5",
			section: "mb-1.5",
		},
	}[layoutMode];

	return (
		<section className={`${spacingMap.section} ${className}`}>
			<h2
				className={`${spacingMap.title} font-bold`}
				style={{
					backgroundColor: backgroundColor,
					color: textColor,
				}}
			>
				{title}
			</h2>
			{children}
		</section>
	);
};

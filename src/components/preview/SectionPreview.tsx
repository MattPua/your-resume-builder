interface SectionPreviewProps {
	title: string
	children: React.ReactNode
	className?: string
	backgroundColor?: string
	textColor?: string
}

export const SectionPreview = ({
	title,
	children,
	className = "",
	backgroundColor = "#3b82f6",
	textColor = "#ffffff",
}: SectionPreviewProps) => {
	return (
		<section className={`mb-1 ${className}`}>
			<h2
				className="text-lg font-bold mb-1 px-3 py-1"
				style={{ 
					backgroundColor: backgroundColor,
					color: textColor
				}}
			>
				{title}
			</h2>
			{children}
		</section>
	)
}

interface SectionPreviewProps {
	title: string
	children: React.ReactNode
	className?: string
	backgroundColor?: string
}

export const SectionPreview = ({
	title,
	children,
	className = "",
	backgroundColor = "#1e40af",
}: SectionPreviewProps) => {
	return (
		<section className={`mb-1 ${className}`}>
			<h2
				className="text-lg font-bold mb-1 text-white px-3 py-1"
				style={{ 
					backgroundColor: backgroundColor,
					color: "#ffffff"
				}}
			>
				{title}
			</h2>
			{children}
		</section>
	)
}

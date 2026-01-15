import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";
import { Collapsible } from "./ui/collapsible";

interface SortableSectionProps {
	id: string;
	isOpen: boolean;
	isVisible?: boolean;
	onOpenChange: (open: boolean) => void;
	children: (props: {
		attributes: React.HTMLAttributes<HTMLButtonElement>;
		listeners: React.HTMLAttributes<HTMLButtonElement>;
	}) => React.ReactNode;
}

export const SortableSection = ({
	id,
	isOpen,
	isVisible = true,
	onOpenChange,
	children,
}: SortableSectionProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<section ref={setNodeRef} style={style} id={`section-${id}`}>
			<Collapsible
				open={isOpen}
				onOpenChange={onOpenChange}
				className={`rounded-lg border shadow-sm transition-all duration-200 ${
					isVisible
						? "bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
						: "bg-gray-50/50 dark:bg-gray-900/30 border-primary/30 border-dashed opacity-75"
				}`}
			>
				<div className="p-6">{children({ attributes, listeners })}</div>
			</Collapsible>
		</section>
	);
};

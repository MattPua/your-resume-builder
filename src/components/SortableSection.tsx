import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { Collapsible } from "./ui/collapsible";

interface SortableSectionProps {
	id: string;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	children: (props: { attributes: React.HTMLAttributes<HTMLButtonElement>; listeners: React.HTMLAttributes<HTMLButtonElement> }) => React.ReactNode;
}

export const SortableSection = ({
	id,
	isOpen,
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
		<div ref={setNodeRef} style={style}>
			<Collapsible
				open={isOpen}
				onOpenChange={onOpenChange}
				className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
			>
				<div className="p-6">{children({ attributes, listeners })}</div>
			</Collapsible>
		</div>
	);
};

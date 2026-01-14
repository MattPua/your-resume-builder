import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ExperienceEntry } from "../types/resume";
import { ExperienceEntryEditor } from "./ExperienceEntryEditor";

interface SortableExperienceEntryProps {
	entry: ExperienceEntry;
	index: number;
	onChange: (index: number, entry: ExperienceEntry) => void;
	onDelete: (index: number) => void;
	isOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const SortableExperienceEntry = ({
	entry,
	index,
	onChange,
	onDelete,
	isOpen,
	onOpenChange,
}: SortableExperienceEntryProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: `experience-${index}` });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div ref={setNodeRef} style={style}>
			<ExperienceEntryEditor
				entry={entry}
				index={index}
				onChange={onChange}
				onDelete={onDelete}
				dragAttributes={attributes}
				dragListeners={listeners}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</div>
	);
};

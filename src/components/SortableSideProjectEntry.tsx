import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SideProjectEntry } from "../types/resume";
import { SideProjectEntryEditor } from "./SideProjectEntryEditor";

interface SortableSideProjectEntryProps {
	entry: SideProjectEntry;
	index: number;
	onChange: (index: number, entry: SideProjectEntry) => void;
	onDelete: (index: number) => void;
	isOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const SortableSideProjectEntry = ({
	entry,
	index,
	onChange,
	onDelete,
	isOpen,
	onOpenChange,
}: SortableSideProjectEntryProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: `sideproject-${index}` });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div ref={setNodeRef} style={style}>
			<SideProjectEntryEditor
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

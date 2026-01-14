import { useRef, useEffect } from "react";
import { Field, FieldContent, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

interface TextInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	type?: "text" | "email" | "tel" | "url";
	id?: string;
}

export const TextInput = ({
	label,
	value,
	onChange,
	placeholder = "",
	type = "text",
	id,
}: TextInputProps) => {
	const inputId =
		id || `text-input-${label.toLowerCase().replace(/\s+/g, "-")}`;
	const inputRef = useRef<HTMLInputElement>(null);
	const isUndoRedoRef = useRef(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!isUndoRedoRef.current) {
			onChange(e.target.value);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Detect undo/redo: Ctrl+Z, Ctrl+Y, Cmd+Z, Cmd+Y, Ctrl+Shift+Z
		const isUndoRedo =
			(e.ctrlKey || e.metaKey) &&
			(e.key === "z" || e.key === "y" || (e.key === "Z" && e.shiftKey));

		if (isUndoRedo) {
			isUndoRedoRef.current = true;
			// Allow browser to handle undo/redo, then sync after
			setTimeout(() => {
				if (inputRef.current) {
					onChange(inputRef.current.value);
				}
				isUndoRedoRef.current = false;
			}, 0);
		}
	};

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		// Sync value after undo/redo operations
		if (isUndoRedoRef.current) {
			onChange(e.currentTarget.value);
			isUndoRedoRef.current = false;
		}
	};

	// Sync value when prop changes (but not during undo/redo)
	useEffect(() => {
		if (
			inputRef.current &&
			!isUndoRedoRef.current &&
			inputRef.current.value !== value
		) {
			inputRef.current.value = value;
		}
	}, [value]);

	return (
		<Field orientation="vertical">
			<FieldLabel
				htmlFor={inputId}
				className="text-sm font-semibold text-gray-700 dark:text-gray-300"
			>
				{label}
			</FieldLabel>
			<FieldContent>
				<Input
					ref={inputRef}
					id={inputId}
					type={type}
					defaultValue={value}
					onChange={handleChange}
					onInput={handleInput}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
				/>
			</FieldContent>
		</Field>
	);
};

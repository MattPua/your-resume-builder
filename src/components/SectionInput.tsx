import { forwardRef, useCallback, useEffect, useRef } from "react";
import { Field, FieldContent, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";

interface SectionInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	id?: string;
}

export const SectionInput = forwardRef<HTMLTextAreaElement, SectionInputProps>(
	({ label, value, onChange, placeholder = "Enter markdown...", id }, ref) => {
		const textareaId =
			id || `section-input-${label.toLowerCase().replace(/\s+/g, "-")}`;
		const textareaRef = useRef<HTMLTextAreaElement>(null);
		const isUndoRedoRef = useRef(false);

		const updateHeight = useCallback(() => {
			const textarea = textareaRef.current;
    if (textarea) {
				textarea.style.height = "auto";
				textarea.style.height = `${textarea.scrollHeight}px`;
    }
		}, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			if (!isUndoRedoRef.current) {
				onChange(e.target.value);
  }
			updateHeight();
		};

		const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			// Detect undo/redo: Ctrl+Z, Ctrl+Y, Cmd+Z, Cmd+Y, Ctrl+Shift+Z
			const isUndoRedo =
				(e.ctrlKey || e.metaKey) &&
				(e.key === "z" || e.key === "y" || (e.key === "Z" && e.shiftKey));

			if (isUndoRedo) {
				isUndoRedoRef.current = true;
				// Allow browser to handle undo/redo, then sync after
				setTimeout(() => {
					if (textareaRef.current) {
						onChange(textareaRef.current.value);
					}
					isUndoRedoRef.current = false;
				}, 0);
			}
		};

		const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
			// Sync value after undo/redo operations
			if (isUndoRedoRef.current) {
				onChange(e.currentTarget.value);
				isUndoRedoRef.current = false;
			}
			updateHeight();
		};

		// Sync value when prop changes (but not during undo/redo)
		// Always update if the prop value differs from what's in the textarea
		// This ensures swaps work correctly even with empty strings
		useEffect(() => {
			if (textareaRef.current && !isUndoRedoRef.current) {
				const normalizedValue = value ?? "";
				const currentTextareaValue = textareaRef.current.value ?? "";

				// Always update if prop value differs from textarea value
				// Direct string comparison handles empty strings correctly
				if (currentTextareaValue !== normalizedValue) {
					textareaRef.current.value = normalizedValue;
					updateHeight();
				}
			}
		}, [value, updateHeight]);

  return (
			<Field orientation="vertical">
				{label && (
					<FieldLabel
						htmlFor={textareaId}
						className="text-sm font-semibold text-gray-700 dark:text-gray-300"
					>
        {label}
					</FieldLabel>
				)}
				<FieldContent>
					<Textarea
						id={textareaId}
						ref={(node) => {
							textareaRef.current = node;
							if (typeof ref === "function") {
								ref(node);
							} else if (ref) {
								ref.current = node;
							}
						}}
						defaultValue={value}
        onChange={handleChange}
						onInput={handleInput}
						onKeyDown={handleKeyDown}
        placeholder={placeholder}
						className="w-full min-h-32 resize-none"
      />
				</FieldContent>
			</Field>
		);
	},
);

SectionInput.displayName = "SectionInput";

import { ChevronDown, Eye, EyeOff, GripVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { CollapsibleTrigger } from "../ui/collapsible";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface SectionHeaderProps {
	title: string;
	isOpen: boolean;
	attributes?: React.HTMLAttributes<HTMLButtonElement>;
	listeners?: React.HTMLAttributes<HTMLButtonElement>;
	visibilityControl?: "eye" | "checkbox";
	visibilityProps?: {
		isVisible: boolean;
		onToggle: () => void;
		checkboxId?: string;
		checkboxLabel?: string;
	};
	onTitleChange?: (newTitle: string) => void;
}

export const SectionHeader = ({
	title,
	isOpen,
	attributes,
	listeners,
	visibilityControl = "eye",
	visibilityProps,
	onTitleChange,
}: SectionHeaderProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(title);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setEditValue(title);
	}, [title]);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);

	const handleTitleClick = (e: React.MouseEvent) => {
		if (onTitleChange) {
			e.stopPropagation();
			setIsEditing(true);
		}
	};

	const handleTitleKeyDown = (e: React.KeyboardEvent) => {
		if (onTitleChange && (e.key === "Enter" || e.key === " ")) {
			e.preventDefault();
			e.stopPropagation();
			setIsEditing(true);
		}
	};

	const handleTitleBlur = () => {
		if (onTitleChange && editValue.trim() !== "") {
			onTitleChange(editValue.trim());
		} else {
			setEditValue(title);
		}
		setIsEditing(false);
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			inputRef.current?.blur();
		} else if (e.key === "Escape") {
			setEditValue(title);
			setIsEditing(false);
		}
	};

	const renderVisibilityControl = () => {
		if (!visibilityProps) return null;

		if (visibilityControl === "checkbox" && visibilityProps.checkboxId) {
			return (
				<>
					<Checkbox
						id={visibilityProps.checkboxId}
						checked={visibilityProps.isVisible}
						onCheckedChange={(checked) => {
							if (checked !== visibilityProps.isVisible) {
								visibilityProps.onToggle();
							}
						}}
						onClick={(e) => e.stopPropagation()}
					/>
					{visibilityProps.checkboxLabel && (
						<Label
							htmlFor={visibilityProps.checkboxId}
							className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
							onClick={(e) => e.stopPropagation()}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									e.stopPropagation();
								}
							}}
						>
							{visibilityProps.checkboxLabel}
						</Label>
					)}
				</>
			);
		}

		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							visibilityProps.onToggle();
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								e.stopPropagation();
								visibilityProps.onToggle();
							}
						}}
						className="p-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
					>
						{visibilityProps.isVisible ? (
							<Eye className="h-4 w-4" />
						) : (
							<EyeOff className="h-4 w-4" />
						)}
					</button>
				</TooltipTrigger>
				<TooltipContent>
					<p>
						{visibilityProps.isVisible ? "Hide in preview" : "Show in preview"}
					</p>
				</TooltipContent>
			</Tooltip>
		);
	};

	return (
		<CollapsibleTrigger className="flex items-center justify-between w-full mb-2 cursor-pointer gap-4">
			<div className="flex items-center gap-2 min-w-0">
				{attributes && listeners && (
					<button
						type="button"
						className="cursor-grab active:cursor-grabbing touch-none shrink-0"
						{...listeners}
						{...attributes}
					>
						<GripVertical className="h-4 w-4 text-gray-400" />
					</button>
				)}
				{isEditing && onTitleChange ? (
					<Input
						ref={inputRef}
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						onBlur={handleTitleBlur}
						onKeyDown={handleInputKeyDown}
						onClick={(e) => e.stopPropagation()}
						className="h-auto p-0 text-lg font-semibold border-none shadow-none focus-visible:ring-0 bg-transparent shrink-0"
						style={{ width: `${Math.max(editValue.length * 8, 100)}px` }}
					/>
				) : (
					<Tooltip>
						<TooltipTrigger asChild>
							<h2
								className={`text-lg font-semibold text-gray-900 dark:text-white leading-tight truncate text-left ${
									onTitleChange ? "cursor-text hover:underline" : ""
								}`}
								onClick={handleTitleClick}
								onKeyDown={handleTitleKeyDown}
								tabIndex={onTitleChange ? 0 : undefined}
							>
								{title}
							</h2>
						</TooltipTrigger>
						{onTitleChange && (
							<TooltipContent>
								<p>Click to edit title</p>
							</TooltipContent>
						)}
					</Tooltip>
				)}
			</div>
			<div className="flex items-center gap-2 shrink-0">
				{renderVisibilityControl()}
				<ChevronDown
					className={`h-4 w-4 text-gray-500 transition-transform ${
						isOpen ? "transform rotate-180" : ""
					}`}
				/>
			</div>
		</CollapsibleTrigger>
	);
};

import type { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface EmptySectionStateProps {
	icon: LucideIcon;
	title: string;
	description: string;
	onClick: () => void;
	buttonText: string;
}

export const EmptySectionState = ({
	icon: Icon,
	title,
	description,
	onClick,
	buttonText,
}: EmptySectionStateProps) => {
	return (
		<div className="flex flex-col items-start justify-center py-10 px-6 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/30 dark:bg-gray-900/10 transition-all duration-300 hover:border-primary/20 hover:bg-gray-50/50 dark:hover:bg-gray-900/20 group">
			<div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-sm mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md border border-gray-100 dark:border-gray-700">
				<Icon className="size-6 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
			</div>
			<h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
				{title}
			</h4>
			<p className="text-xs text-gray-500 dark:text-gray-400 text-left mb-6 max-w-[240px] leading-relaxed">
				{description}
			</p>
			<Button
				onClick={onClick}
				size="sm"
				variant="outline"
				className="h-9 px-4 font-semibold hover:bg-primary hover:text-white transition-colors"
			>
				{buttonText}
			</Button>
		</div>
	);
};

import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../ui/tooltip";

interface ScrollToTopButtonProps {
	isVisible: boolean;
	onClick: () => void;
}

export const ScrollToTopButton = ({
	isVisible,
	onClick,
}: ScrollToTopButtonProps) => {
	if (!isVisible) return null;

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					onClick={onClick}
					className="fixed bottom-8 right-8 rounded-full shadow-lg z-50 size-12 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 no-print"
					size="icon"
				>
					<ArrowUp className="size-6" />
				</Button>
			</TooltipTrigger>
			<TooltipContent side="left">
				<p>Scroll to top</p>
			</TooltipContent>
		</Tooltip>
	);
};

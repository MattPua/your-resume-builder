import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

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
		<Button
			onClick={onClick}
			className="fixed bottom-8 right-8 rounded-full shadow-lg z-50 size-12 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
			size="icon"
			title="Scroll to top"
		>
			<ArrowUp className="size-6" />
		</Button>
	);
};

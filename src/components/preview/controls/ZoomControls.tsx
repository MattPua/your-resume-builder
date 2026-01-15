import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

interface ZoomControlsProps {
	zoomLevel: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onResetZoom: () => void;
}

export const ZoomControls = ({
	zoomLevel,
	onZoomIn,
	onZoomOut,
	onResetZoom,
}: ZoomControlsProps) => {
	return (
		<div className="flex items-center -space-x-px">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						onClick={onResetZoom}
						disabled={zoomLevel === 1}
						className="size-8 rounded-r-none z-10"
					>
						<RotateCcw className="size-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Reset zoom</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						onClick={onZoomOut}
						disabled={zoomLevel <= 0.5}
						className="size-8 rounded-none z-10"
					>
						<ZoomOut className="size-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Zoom out</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						onClick={onZoomIn}
						disabled={zoomLevel >= 2}
						className="size-8 rounded-l-none z-10"
					>
						<ZoomIn className="size-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Zoom in</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
};

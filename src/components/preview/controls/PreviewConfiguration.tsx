import { Type } from "lucide-react";
import { Button } from "../../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../../ui/tooltip";

interface Font {
	name: string;
	value: string;
}

interface PreviewConfigurationProps {
	sectionHeaderBackgroundColor: string;
	onBackgroundColorChange: (color: string) => void;
	sectionHeaderTextColor: string;
	onTextColorChange: (color: string) => void;
	fontFamily: string;
	onFontFamilyChange: (font: string) => void;
	fonts: Font[];
}

export const PreviewConfiguration = ({
	sectionHeaderBackgroundColor,
	onBackgroundColorChange,
	sectionHeaderTextColor,
	onTextColorChange,
	fontFamily,
	onFontFamilyChange,
	fonts,
}: PreviewConfigurationProps) => {
	return (
		<div className="flex items-center gap-1.5">
			<Tooltip>
				<TooltipTrigger asChild>
					<div className="relative size-6">
						<input
							id="section-header-color"
							type="color"
							value={sectionHeaderBackgroundColor || "#3b82f6"}
							onChange={(e) => onBackgroundColorChange(e.target.value)}
							className="absolute inset-0 w-full h-full cursor-pointer rounded-sm border border-gray-200 dark:border-gray-700 p-0 overflow-hidden bg-transparent"
							aria-label="Section Header Background Color"
						/>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>Section Header Background Color</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className="relative size-6">
						<input
							id="section-header-text-color"
							type="color"
							value={sectionHeaderTextColor || "#ffffff"}
							onChange={(e) => onTextColorChange(e.target.value)}
							className="absolute inset-0 w-full h-full cursor-pointer rounded-sm border border-gray-200 dark:border-gray-700 p-0 overflow-hidden bg-transparent"
							aria-label="Section Header Text Color"
						/>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>Section Header Text Color</p>
				</TooltipContent>
			</Tooltip>
			<DropdownMenu>
				<Tooltip>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="size-6 w-auto px-1.5 h-6 text-[10px] font-medium uppercase tracking-wider"
							>
								<Type className="size-3 mr-1" />
								{fonts.find((f) => f.value === (fontFamily || fonts[0].value))
									?.name || "Font"}
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Select Font</p>
					</TooltipContent>
				</Tooltip>
				<DropdownMenuContent align="start" className="w-48">
					{fonts.map((font) => (
						<DropdownMenuItem
							key={font.name}
							onClick={() => onFontFamilyChange(font.value)}
							className={fontFamily === font.value ? "bg-accent" : ""}
							style={{ fontFamily: font.value }}
						>
							{font.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

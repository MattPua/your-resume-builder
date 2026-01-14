import { Type } from "lucide-react";
import { Button } from "../../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

interface Font {
	name: string;
	value: string;
}

interface PreviewConfigurationProps {
	sectionHeaderBackgroundColor: string;
	onBackgroundColorChange: (color: string) => void;
	fontFamily: string;
	onFontFamilyChange: (font: string) => void;
	fonts: Font[];
}

export const PreviewConfiguration = ({
	sectionHeaderBackgroundColor,
	onBackgroundColorChange,
	fontFamily,
	onFontFamilyChange,
	fonts,
}: PreviewConfigurationProps) => {
	return (
		<div className="flex items-center gap-1.5">
			<input
				id="section-header-color"
				type="color"
				value={sectionHeaderBackgroundColor || "#1e40af"}
				onChange={(e) => onBackgroundColorChange(e.target.value)}
				className="size-6 cursor-pointer rounded-sm border border-gray-200 dark:border-gray-700 p-0 overflow-hidden"
				title="Section Header Color"
			/>
			<DropdownMenu>
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

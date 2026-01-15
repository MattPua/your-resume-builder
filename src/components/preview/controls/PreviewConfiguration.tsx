import { Layout, Settings, Type } from "lucide-react";
import { Button } from "../../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

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
	onFontHover: (font: string) => void;
	onFontHoverEnd: () => void;
	layoutMode: "compact" | "default" | "comfortable";
	onLayoutModeChange: (mode: "compact" | "default" | "comfortable") => void;
	fonts: Font[];
}

export const PreviewConfiguration = ({
	sectionHeaderBackgroundColor,
	onBackgroundColorChange,
	sectionHeaderTextColor,
	onTextColorChange,
	fontFamily,
	onFontFamilyChange,
	onFontHover,
	onFontHoverEnd,
	layoutMode,
	onLayoutModeChange,
	fonts,
}: PreviewConfigurationProps) => {
	const layoutModes: ("compact" | "default" | "comfortable")[] = [
		"compact",
		"default",
		"comfortable",
	];

	return (
		<div className="flex items-center gap-1.5">
			{/* Desktop View */}
			<div className="hidden sm:flex items-center gap-1.5">
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
									<Layout className="size-3 mr-1" />
									{layoutMode || "Default"}
								</Button>
							</DropdownMenuTrigger>
						</TooltipTrigger>
						<TooltipContent>
							<p>Layout Mode</p>
						</TooltipContent>
					</Tooltip>
					<DropdownMenuContent align="start" className="w-32">
						{layoutModes.map((mode) => (
							<DropdownMenuItem
								key={mode}
								onClick={() => onLayoutModeChange(mode)}
								className={layoutMode === mode ? "bg-accent" : ""}
							>
								<span className="capitalize">{mode}</span>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
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
					<DropdownMenuContent
						align="start"
						className="w-48"
						onMouseLeave={onFontHoverEnd}
					>
						{fonts.map((font) => (
							<DropdownMenuItem
								key={font.name}
								onClick={() => onFontFamilyChange(font.value)}
								onMouseEnter={() => onFontHover(font.value)}
								onFocus={() => onFontHover(font.value)}
								className={fontFamily === font.value ? "bg-accent" : ""}
								style={{ fontFamily: font.value }}
							>
								{font.name}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Mobile View */}
			<div className="flex sm:hidden items-center">
				<DropdownMenu>
					<Tooltip>
						<TooltipTrigger asChild>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="icon" className="size-8">
									<Settings className="size-4" />
								</Button>
							</DropdownMenuTrigger>
						</TooltipTrigger>
						<TooltipContent>
							<p>Preview Settings</p>
						</TooltipContent>
					</Tooltip>
					<DropdownMenuContent align="end" className="w-56">
						<DropdownMenuLabel>Colors</DropdownMenuLabel>
						<div className="flex items-center gap-4 p-2 px-3">
							<div className="flex flex-col gap-1.5 items-center">
								<div className="relative size-6">
									<input
										type="color"
										value={sectionHeaderBackgroundColor || "#3b82f6"}
										onChange={(e) => onBackgroundColorChange(e.target.value)}
										className="absolute inset-0 w-full h-full cursor-pointer rounded-sm border border-gray-200 dark:border-gray-700 p-0 overflow-hidden bg-transparent"
										aria-label="Background Color"
									/>
								</div>
								<span className="text-[10px] text-muted-foreground">Bg</span>
							</div>
							<div className="flex flex-col gap-1.5 items-center">
								<div className="relative size-6">
									<input
										type="color"
										value={sectionHeaderTextColor || "#ffffff"}
										onChange={(e) => onTextColorChange(e.target.value)}
										className="absolute inset-0 w-full h-full cursor-pointer rounded-sm border border-gray-200 dark:border-gray-700 p-0 overflow-hidden bg-transparent"
										aria-label="Text Color"
									/>
								</div>
								<span className="text-[10px] text-muted-foreground">Text</span>
							</div>
						</div>
						<DropdownMenuSeparator />
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<Layout className="size-4 mr-2" />
								<span>Layout</span>
								<span className="ml-auto text-xs text-muted-foreground capitalize">
									{layoutMode}
								</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent className="w-32">
								{layoutModes.map((mode) => (
									<DropdownMenuItem
										key={mode}
										onClick={() => onLayoutModeChange(mode)}
										className={layoutMode === mode ? "bg-accent" : ""}
									>
										<span className="capitalize">{mode}</span>
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuSub>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<Type className="size-4 mr-2" />
								<span>Font</span>
								<span className="ml-auto text-xs text-muted-foreground">
									{
										fonts.find(
											(f) => f.value === (fontFamily || fonts[0].value),
										)?.name
									}
								</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent
								className="w-48 max-h-[300px] overflow-y-auto"
								onMouseLeave={onFontHoverEnd}
							>
								{fonts.map((font) => (
									<DropdownMenuItem
										key={font.name}
										onClick={() => onFontFamilyChange(font.value)}
										onMouseEnter={() => onFontHover(font.value)}
										onFocus={() => onFontHover(font.value)}
										className={fontFamily === font.value ? "bg-accent" : ""}
										style={{ fontFamily: font.value }}
									>
										{font.name}
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

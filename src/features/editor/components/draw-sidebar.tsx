import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ColorPicker } from "@/features/editor/components/color-picker";
import {
	ActiveTool,
	Editor,
	STROKE_COLOR,
	STROKE_WIDTH,
} from "@/features/editor/type";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface DrawSidebarProps {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const DrawSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: DrawSidebarProps) => {
	const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;
	const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
	const onClose = () => {
		editor?.disableDrawingMode();
		onChangeActiveTool("select");
	};

	const onColorChange = (value: string) => {
		editor?.changeStrokeColor(value);
	};

	const onWidthChange = (value: number) => {
		editor?.changeStrokeWidth(value);
	};

	return (
		<aside
			className={cn(
				"bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
				activeTool === "draw" ? "visible" : "hidden"
			)}
		>
			<ToolSidebarHeader title="Draw" description="Modify brush settings" />
			<ScrollArea>
				<div className="space-y-6 p-4 border-b">
					<Label className="text-sm">Brush width</Label>
					<Slider
						value={[widthValue]}
						onValueChange={(values) => onWidthChange(values[0])}
					/>
				</div>
				<div className="space-y-6 p-4">
					<ColorPicker value={colorValue} onChange={onColorChange} />
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};

import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import {
	ActiveTool,
	Editor,
	STROKE_DASH_ARRAY,
	STROKE_WIDTH,
} from "@/features/editor/type";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface StrokeWidthSidebarProps {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeWidthSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
	const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
	const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;
	const onClose = () => {
		onChangeActiveTool("select");
	};

	const onChangeStrokeWidth = (value: number) => {
		editor?.changeStrokeWidth(value);
	};

	const onChangeStrokeType = (value: number[]) => {
		editor?.changeStrokeDashArray(value);
	};

	return (
		<aside
			className={cn(
				"bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
				activeTool === "stroke-width" ? "visible" : "hidden"
			)}
		>
			<ToolSidebarHeader
				title="Stroke options"
				description="Modify the stroke of your element"
			/>
			<ScrollArea>
				<div className="p-4 space-y-4 border-b">
					<Label className="text-sm">Stroke width</Label>
					<Slider
						value={[widthValue]}
						onValueChange={(values) => onChangeStrokeWidth(values[0])}
					/>
				</div>
				<div className="p-4 space-y-4 border-b">
					<Label className="text-sm">Stroke type</Label>
					<Button
						onClick={() => onChangeStrokeType([])}
						variant="secondary"
						size="lg"
						className={cn(
							"w-full h-16 justify-start text-left px-8 py-4",
							JSON.stringify(typeValue) === `[]` && "border-2 border-blue-500"
						)}
					>
						<div className="w-full border-black rounded-full border-2" />
					</Button>
					<Button
						onClick={() => onChangeStrokeType([5, 10])}
						variant="secondary"
						size="lg"
						className={cn(
							"w-full h-16 justify-start text-left px-8 py-4",
							JSON.stringify(typeValue) === `[5,10]` &&
								"border-2 border-blue-500"
						)}
					>
						<div className="w-full border-black rounded-full border-2 border-dashed" />
					</Button>
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};

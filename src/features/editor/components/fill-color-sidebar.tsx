import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ColorPicker } from "@/features/editor/components/color-picker";
import { ActiveTool, Editor, FILL_COLOR } from "@/features/editor/type";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface FillColorSidebarProps {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FillColorSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: FillColorSidebarProps) => {
	const value = editor?.getActiveFillColor() || FILL_COLOR;
	const onClose = () => {
		onChangeActiveTool("select");
	};

	const onChange = (value: string) => {
		editor?.changeFillColor(value);
	};

	return (
		<aside
			className={cn(
				"bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
				activeTool === "fill" ? "visible" : "hidden"
			)}
		>
			<ToolSidebarHeader
				title="Fill color"
				description="Add fill color to your element"
			/>
			<ScrollArea>
				<div className="space-y-6 p-4">
					<ColorPicker value={value} onChange={onChange} />
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};

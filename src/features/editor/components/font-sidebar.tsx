import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor, fonts } from "@/features/editor/type";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FontSidebarProps {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FontSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: FontSidebarProps) => {
	const value = editor?.getActiveFontFamily();
	const onClose = () => {
		onChangeActiveTool("select");
	};

	return (
		<aside
			className={cn(
				"bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
				activeTool === "font" ? "visible" : "hidden"
			)}
		>
			<ToolSidebarHeader title="Font" description="Modify the font" />
			<ScrollArea>
				<div className="p-4 space-y-2 border-b">
					{fonts.map((font) => (
						<Button
							key={font}
							variant="secondary"
							size="lg"
							className={cn(
								"w-full h-10 justify-start text-left px-4 py-2",
								value === font && "border-2 border-blue-500"
							)}
							style={{ fontFamily: font }}
							onClick={() => editor?.changeFontFamily(font)}
						>
							{font}
						</Button>
					))}
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};

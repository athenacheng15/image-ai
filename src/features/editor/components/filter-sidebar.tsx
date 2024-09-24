import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor } from "@/features/editor/type";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FilterEnum } from "../enum";

interface FilterSidebarProps {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FilterSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: FilterSidebarProps) => {
	const filters = Object.values(FilterEnum);

	const onClose = () => {
		onChangeActiveTool("select");
	};

	return (
		<aside
			className={cn(
				"bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
				activeTool === "filter" ? "visible" : "hidden"
			)}
		>
			<ToolSidebarHeader
				title="Filter"
				description="Apply a filter to selected image"
			/>
			<ScrollArea>
				<div className="p-4 space-y-2 border-b">
					{filters.map((filter) => (
						<Button
							key={filter}
							variant="secondary"
							size="lg"
							className={cn("w-full h-10 justify-start text-left px-4 py-2")}
							onClick={() => editor?.changeImageFilter(filter)}
						>
							{filter}
						</Button>
					))}
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};

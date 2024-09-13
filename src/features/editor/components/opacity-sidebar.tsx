import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor } from "@/features/editor/type";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useEffect, useMemo, useState } from "react";

interface OpacitySidebarProps {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: OpacitySidebarProps) => {
	const initialValue = editor?.getActiveOpacity() || 1;
	const selectedObj = useMemo(
		() => editor?.selectedObjs[0],
		[editor?.selectedObjs]
	);
	const [opacity, setOpacity] = useState<number>(initialValue);

	useEffect(() => {
		if (selectedObj) {
			setOpacity(selectedObj.get("opacity") || 1);
		}
	}, [selectedObj]);

	const onClose = () => {
		onChangeActiveTool("select");
	};

	const onChange = (value: number) => {
		editor?.changeOpacity(value);
		setOpacity(value);
	};

	return (
		<aside
			className={cn(
				"bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
				activeTool === "opacity" ? "visible" : "hidden"
			)}
		>
			<ToolSidebarHeader
				title="Opacity"
				description="Change the opacity of the selected object"
			/>
			<ScrollArea>
				<div className="p-4 space-y-4 border-b">
					<Slider
						value={[opacity]}
						onValueChange={(values) => onChange(values[0])}
						max={1}
						min={0}
						step={0.01}
					/>
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};

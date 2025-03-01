import React, { useEffect, useMemo, useState } from "react";

import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ColorPicker } from "@/features/editor/components/color-picker";
import { ActiveTool, Editor, FILL_COLOR } from "@/features/editor/type";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SettingsSidebarProps {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const SettingsSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: SettingsSidebarProps) => {
	const workSpace = editor?.getWorkspace();

	const initialWidth = useMemo(() => `${workSpace?.width ?? 0}`, [workSpace]);
	const initialHeight = useMemo(() => `${workSpace?.height ?? 0}`, [workSpace]);
	const initialBackground = useMemo(
		() => workSpace?.fill ?? "#FFFFFF",
		[workSpace]
	);

	const [width, setWidth] = useState(initialWidth);
	const [height, setHeight] = useState(initialHeight);
	const [background, setBackground] = useState(initialBackground);

	useEffect(() => {
		setWidth(initialWidth);
		setHeight(initialHeight);
		setBackground(initialBackground);
	}, [initialBackground, initialHeight, initialWidth]);

	const changeBackground = (value: string) => {
		setBackground(value);
		editor?.changeBackground(value);
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		editor?.changeSize({
			width: parseInt(width, 10),
			height: parseInt(height, 10),
		});
	};

	const onClose = () => {
		onChangeActiveTool("select");
	};

	return (
		<aside
			className={cn(
				"bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
				activeTool === "settings" ? "visible" : "hidden"
			)}
		>
			<ToolSidebarHeader
				title="Settings"
				description="Change the look of your workspace"
			/>
			<ScrollArea>
				<form onSubmit={onSubmit} className="space-y-4 p-4">
					<div className="space-y-2">
						<Label>Height</Label>
						<Input
							placeholder="Height"
							value={height}
							type="number"
							onChange={(e) => setHeight(e.target.value)}
						/>
					</div>
					<div className="space-y-2">
						<Label>Width</Label>
						<Input
							placeholder="Width"
							value={width}
							type="number"
							onChange={(e) => setWidth(e.target.value)}
						/>
					</div>
					<Button type="submit" className="w-full">
						Resize
					</Button>
				</form>
				<ColorPicker value={background as string} onChange={changeBackground} />
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};

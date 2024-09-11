"use client";

import { useState } from "react";

import { ActiveTool, Editor } from "../type";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolbarProps {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: ToolbarProps) => {
	const fillColor = editor?.getActiveFillColor();
	if (editor?.selectedObjs.length === 0) {
		return (
			<div className="shrink-0 h-[57px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2"></div>
		);
	}
	return (
		<div className="shrink-0 h-[57px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
			<div className="flex items-center justify-center h-full">
				<Hint label="Color" side="bottom" sideOffset={3}>
					<Button
						className={cn(activeTool === "fill" && "bg-gray-100")}
						onClick={() => onChangeActiveTool("fill")}
						size="icon"
						variant="ghost"
					>
						<div
							className="rounded-sm size-4 border"
							style={{
								backgroundColor: fillColor,
							}}
						/>
					</Button>
				</Hint>
			</div>
		</div>
	);
};

"use client";

import type { ActiveTool, Editor } from "../type";

import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isTextType } from "../utils";

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
	const strokeColor = editor?.getActiveStrokeColor();
	const fontFamily = editor?.getActiveFontFamily();

	const selectedObjectType = editor?.selectedObjs[0]?.type;
	const isText = isTextType(selectedObjectType);

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
			{!isText && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Stroke Color" side="bottom" sideOffset={3}>
						<Button
							className={cn(activeTool === "stroke-color" && "bg-gray-100")}
							onClick={() => onChangeActiveTool("stroke-color")}
							size="icon"
							variant="ghost"
						>
							<div
								className="rounded-sm size-4 border bg-white"
								style={{
									borderColor: strokeColor,
								}}
							/>
						</Button>
					</Hint>
				</div>
			)}
			{!isText && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Stroke width" side="bottom" sideOffset={3}>
						<Button
							className={cn(activeTool === "stroke-width" && "bg-gray-100")}
							onClick={() => onChangeActiveTool("stroke-width")}
							size="icon"
							variant="ghost"
						>
							<BsBorderWidth className="size-4" />
						</Button>
					</Hint>
				</div>
			)}
			{isText && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Font" side="bottom" sideOffset={5}>
						<Button
							className={cn(
								"w-auto px-2 text-sm",
								activeTool === "font" && "bg-gray-100"
							)}
							onClick={() => onChangeActiveTool("font")}
							size="icon"
							variant="ghost"
						>
							<div className="max-w-[100px] truncate">{fontFamily}</div>
							<ChevronDown className="size-4 ml-2 shrink-0" />
						</Button>
					</Hint>
				</div>
			)}

			<div className="flex items-center justify-center h-full">
				<Hint label="Bring forward" side="bottom" sideOffset={3}>
					<Button
						onClick={() => editor?.bringForward()}
						size="icon"
						variant="ghost"
					>
						<ArrowUp className="size-4" />
					</Button>
				</Hint>
			</div>
			<div className="flex items-center justify-center h-full">
				<Hint label="Send backwards" side="bottom" sideOffset={3}>
					<Button
						onClick={() => editor?.sendBackwards()}
						size="icon"
						variant="ghost"
					>
						<ArrowDown className="size-4" />
					</Button>
				</Hint>
			</div>
			<div className="flex items-center justify-center h-full">
				<Hint label="Opacity" side="bottom" sideOffset={3}>
					<Button
						onClick={() => onChangeActiveTool("opacity")}
						size="icon"
						variant="ghost"
						className={cn(activeTool === "opacity" && "bg-gray-100")}
					>
						<RxTransparencyGrid className="size-4" />
					</Button>
				</Hint>
			</div>
		</div>
	);
};

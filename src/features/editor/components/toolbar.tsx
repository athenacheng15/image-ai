"use client";

import {
	FONT_SIZE,
	FONT_WEIGHT,
	TextAlignEnum,
	type ActiveTool,
	type Editor,
} from "../type";

import { useState } from "react";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { TbColorFilter } from "react-icons/tb";
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	ArrowDown,
	ArrowUp,
	ChevronDown,
	SquareSplitHorizontal,
	Trash,
} from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FontSizeInput } from "@/features/editor/components/font-size-input";
import { isImageType, isTextType } from "../utils";

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
	const initialFillColor = editor?.getActiveFillColor();
	const initialStrokeColor = editor?.getActiveStrokeColor();
	const initialFontFamily = editor?.getActiveFontFamily();
	const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
	const initialFontStyle = editor?.getActiveFontStyle();
	const initialFontLinethrough = editor?.getActiveFontLinethrough();
	const initialFontUnderline = editor?.getActiveFontUnderline();
	const initialTextAlign = editor?.getActiveTextAlign();
	const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;

	const [properties, setPropertirs] = useState({
		fillColor: initialFillColor,
		strokeColor: initialStrokeColor,
		fontFamily: initialFontFamily,
		fontWeight: initialFontWeight,
		fontStyle: initialFontStyle,
		fontLinethrough: initialFontLinethrough,
		fontUnderline: initialFontUnderline,
		textAlign: initialTextAlign,
		fontSize: initialFontSize,
	});

	const selectedObject = editor?.selectedObjs[0];
	const selectedObjectType = editor?.selectedObjs[0]?.type;
	const isText = isTextType(selectedObjectType);
	const isImage = isImageType(selectedObjectType);

	const toggleBold = () => {
		if (!selectedObject) return;

		const newValue = properties.fontWeight > 500 ? 500 : 700;
		editor?.changeFontWeight(newValue);
		setPropertirs((current) => ({ ...current, fontWeight: newValue }));
	};

	const toggleItalic = () => {
		if (!selectedObject) return;

		const isItalic = properties.fontStyle === "italic";
		const newValue = isItalic ? "normal" : "italic";
		editor?.changeFontStyle(newValue);
		setPropertirs((current) => ({ ...current, fontStyle: newValue }));
	};

	const toggleLinethrough = () => {
		if (!selectedObject) return;

		const newValue = !properties.fontLinethrough;
		editor?.changeFontLinethrough(newValue);
		setPropertirs((current) => ({ ...current, fontLinethrough: newValue }));
	};

	const toggleUnderline = () => {
		if (!selectedObject) return;

		const newValue = !properties.fontUnderline;
		editor?.changeFontUnderline(newValue);
		setPropertirs((current) => ({ ...current, fontUnderline: newValue }));
	};

	const onChangeTextAlign = (value: string) => {
		if (!selectedObject) return;

		editor?.changeTextAlign(value);
		setPropertirs((current) => ({ ...current, textAlign: value }));
	};

	const onChangeFontSize = (value: number) => {
		if (!selectedObject) return;

		editor?.changeFontSize(value);
		setPropertirs((current) => ({ ...current, fontSize: value }));
	};

	if (editor?.selectedObjs.length === 0) {
		return (
			<div className="shrink-0 h-[57px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2"></div>
		);
	}
	return (
		<div className="shrink-0 h-[57px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
			{!isImage && (
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
									backgroundColor: properties.fillColor,
								}}
							/>
						</Button>
					</Hint>
				</div>
			)}

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
									borderColor: properties.strokeColor,
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
							<div className="max-w-[100px] truncate">
								{properties.fontFamily}
							</div>
							<ChevronDown className="size-4 ml-2 shrink-0" />
						</Button>
					</Hint>
				</div>
			)}
			{isText && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Bold" side="bottom" sideOffset={3}>
						<Button
							onClick={toggleBold}
							size="icon"
							variant="ghost"
							className={cn(properties.fontWeight > 500 && "bg-gray-100")}
						>
							<FaBold className="size-4" />
						</Button>
					</Hint>
				</div>
			)}
			{isText && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Italic" side="bottom" sideOffset={3}>
						<Button
							onClick={toggleItalic}
							size="icon"
							variant="ghost"
							className={cn(properties.fontStyle === "italic" && "bg-gray-100")}
						>
							<FaItalic className="size-4" />
						</Button>
					</Hint>
				</div>
			)}
			{isText && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Underline" side="bottom" sideOffset={3}>
						<Button
							onClick={toggleUnderline}
							size="icon"
							variant="ghost"
							className={cn(properties.fontUnderline && "bg-gray-100")}
						>
							<FaUnderline className="size-4" />
						</Button>
					</Hint>
				</div>
			)}
			{isText && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Strike" side="bottom" sideOffset={3}>
						<Button
							onClick={toggleLinethrough}
							size="icon"
							variant="ghost"
							className={cn(properties.fontLinethrough && "bg-gray-100")}
						>
							<FaStrikethrough className="size-4" />
						</Button>
					</Hint>
				</div>
			)}
			{isText && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Align Left" side="bottom" sideOffset={3}>
						<Button
							onClick={() => onChangeTextAlign(TextAlignEnum.Left)}
							size="icon"
							variant="ghost"
							className={cn(
								properties.textAlign === TextAlignEnum.Left && "bg-gray-100"
							)}
						>
							<AlignLeft className="size-4" />
						</Button>
					</Hint>
				</div>
			)}
			{isText && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Align Center" side="bottom" sideOffset={3}>
						<Button
							onClick={() => onChangeTextAlign(TextAlignEnum.Center)}
							size="icon"
							variant="ghost"
							className={cn(
								properties.textAlign === TextAlignEnum.Center && "bg-gray-100"
							)}
						>
							<AlignCenter className="size-4" />
						</Button>
					</Hint>
				</div>
			)}
			{isText && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Align Right" side="bottom" sideOffset={3}>
						<Button
							onClick={() => onChangeTextAlign(TextAlignEnum.Right)}
							size="icon"
							variant="ghost"
							className={cn(
								properties.textAlign === TextAlignEnum.Right && "bg-gray-100"
							)}
						>
							<AlignRight className="size-4" />
						</Button>
					</Hint>
				</div>
			)}
			{isText && (
				<div className="flex items-center justify-center h-full">
					<FontSizeInput
						onChange={onChangeFontSize}
						value={properties.fontSize}
					/>
				</div>
			)}
			{isImage && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Filters" side="bottom" sideOffset={3}>
						<Button
							onClick={() => onChangeActiveTool("filter")}
							size="icon"
							variant="ghost"
							className={cn(activeTool === "filter" && "bg-gray-100")}
						>
							<TbColorFilter className="size-4" />
						</Button>
					</Hint>
				</div>
			)}
			{isImage && (
				<div className="flex items-center justify-center h-full">
					<Hint label="Romove background" side="bottom" sideOffset={3}>
						<Button
							onClick={() => onChangeActiveTool("remove-bg")}
							size="icon"
							variant="ghost"
							className={cn(activeTool === "remove-bg" && "bg-gray-100")}
						>
							<SquareSplitHorizontal className="size-4" />
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
			<div className="flex items-center justify-center h-full">
				<Hint label="Delete" side="bottom" sideOffset={3}>
					<Button onClick={() => editor?.delete()} size="icon" variant="ghost">
						<Trash className="size-4" />
					</Button>
				</Hint>
			</div>
		</div>
	);
};

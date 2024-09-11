"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

import { Footer } from "@/features/editor/components/footer";
import { Navbar } from "@/features/editor/components/navbar";
import { Sidebar } from "@/features/editor/components/sidebar";
import { ShapeSidebar } from "@/features/editor/components/shape-sidebar";
import { FillColorSidebar } from "@/features/editor/components/fill-color-sidebar";
import { StrokeColorSidebar } from "@/features/editor/components/stroke-color-sidebar";
import { Toolbar } from "@/features/editor/components/toolbar";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { ActiveTool, selectionDepedentTools } from "../type";

export const Editor = () => {
	const [activeTool, setActiveTool] = useState<ActiveTool>("select");

	const onChangeActiveTool = useCallback(
		(tool: ActiveTool) => {
			if (tool === activeTool) {
				// prevent double click
				return setActiveTool("select");
			}
			if (tool === "draw") {
				//
			}
			if (activeTool === "draw") {
				//
			}
			setActiveTool(tool);
		},
		[activeTool]
	);

	const onClearSelection = useCallback(() => {
		if (selectionDepedentTools.includes(activeTool)) {
			setActiveTool("select");
		}
	}, [activeTool]);

	const { init, editor } = useEditor({
		clearSelectionCallback: onClearSelection,
	});

	const canvasRef = useRef(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasRef.current, {
			controlsAboveOverlay: true,
			preserveObjectStacking: true,
		});

		init({
			initialCanvas: canvas,
			initialContainer: containerRef.current!,
		});
		return () => {
			canvas.dispose();
		};
	}, [init]);
	return (
		<div className="h-full flex flex-col">
			<Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
			<div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
				<Sidebar
					activeTool={activeTool}
					onChangeActiveTool={onChangeActiveTool}
				/>
				<ShapeSidebar
					editor={editor}
					activeTool={activeTool}
					onChangeActiveTool={onChangeActiveTool}
				/>
				<FillColorSidebar
					editor={editor}
					activeTool={activeTool}
					onChangeActiveTool={onChangeActiveTool}
				/>
				<StrokeColorSidebar
					editor={editor}
					activeTool={activeTool}
					onChangeActiveTool={onChangeActiveTool}
				/>
				<main className="flex-1 bg-muted overflow-auto relative flex flex-col">
					<Toolbar
						editor={editor}
						activeTool={activeTool}
						onChangeActiveTool={onChangeActiveTool}
						key={JSON.stringify(editor?.canvas.getActiveObject())}
					/>
					<div
						className="flex-1 h-[cacl(100%-124px)] bg-muted"
						ref={containerRef}
					>
						<canvas ref={canvasRef} />
					</div>
					<Footer />
				</main>
			</div>
		</div>
	);
};

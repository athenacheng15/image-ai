"use client";

import { useEffect, useRef } from "react";
import { fabric } from "fabric";

import { Navbar } from "@/features/editor/components/navbar";
import { Sidebar } from "@/features/editor/components/sidebar";
import { Toolbar } from "@/features/editor/components/toolbar";
import { useEditor } from "@/features/editor/hooks/use-editor";

export const Editor = () => {
	const { init } = useEditor();

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
	}, [init]);
	return (
		<div className="h-full flex flex-col">
			<Navbar />
			<div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
				<Sidebar />
				<main className="flex-1 bg-muted overflow-auto relative flex flex-col">
					<Toolbar />
					<div className="flex-1 h-full bg-muted" ref={containerRef}>
						<canvas ref={canvasRef} />
					</div>
				</main>
			</div>
		</div>
	);
};

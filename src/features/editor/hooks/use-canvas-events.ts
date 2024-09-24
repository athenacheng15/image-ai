import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
	save: () => void;
	canvas: fabric.Canvas | null;
	setSelectedObjs: (objs: fabric.Object[]) => void;
	clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
	save,
	canvas,
	setSelectedObjs,
	clearSelectionCallback,
}: UseCanvasEventsProps) => {
	useEffect(() => {
		if (canvas) {
			canvas.on("object:added", () => save());
			canvas.on("object:removed", () => save());
			canvas.on("object:modified", () => save());
			canvas.on("selection:created", (e) => setSelectedObjs(e.selected || []));
			canvas.on("selection:updated", (e) => setSelectedObjs(e.selected || []));
			canvas.on("selection:cleared", () => {
				setSelectedObjs([]);
				clearSelectionCallback?.();
			});
		}
		return () => {
			if (canvas) {
				canvas.off("object:added");
				canvas.off("object:removed");
				canvas.off("object:modified");
				canvas.off("selection:created");
				canvas.off("selection:updated");
				canvas.off("selection:cleared");
			}
		};
	}, [canvas, clearSelectionCallback, save, setSelectedObjs]);
};

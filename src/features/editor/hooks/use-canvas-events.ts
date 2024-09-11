import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
	canvas: fabric.Canvas | null;
	setSelectedObjs: (objs: fabric.Object[]) => void;
	clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
	canvas,
	setSelectedObjs,
	clearSelectionCallback,
}: UseCanvasEventsProps) => {
	useEffect(() => {
		if (canvas) {
			canvas.on("selection:created", (e) => setSelectedObjs(e.selected || []));
			canvas.on("selection:updated", (e) => setSelectedObjs(e.selected || []));
			canvas.on("selection:cleared", () => {
				setSelectedObjs([]);
				clearSelectionCallback?.();
			});
		}
		return () => {
			if (canvas) {
				canvas.off("selection:created");
				canvas.off("selection:updated");
				canvas.off("selection:cleared");
			}
		};
	}, [canvas, clearSelectionCallback, setSelectedObjs]);
};

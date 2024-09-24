import { fabric } from "fabric";

import { useEvent } from "react-use";

interface UseHotkeysProps {
	canvas: fabric.Canvas | null;
	undo: () => void;
	redo: () => void;
	save: (skip?: boolean) => void;
	copy: () => void;
	paste: () => void;
}

export const useHotkeys = ({
	canvas,
	undo,
	redo,
	save,
	copy,
	paste,
}: UseHotkeysProps) => {
	useEvent("keydown", (e) => {
		const isCtrlKey = e.isCtrlKey || e.metaKey;
		const isBacksapce = e.key === "Backspace";
		const isInput = ["INPUT", "TEXTAREA"].includes(
			(e.target as HTMLElement).tagName
		);

		if (isInput) return;

		if (isBacksapce) {
			canvas?.remove(...canvas.getActiveObjects());
			canvas?.discardActiveObject();
		}

		if (isCtrlKey) {
			e.preventDefault();

			switch (e.key.toLowerCase()) {
				case "z":
					undo();
					break;
				case "y":
					redo();
					break;
				case "c":
					copy();
					break;
				case "v":
					paste();
					break;
				case "s":
					save(true);
					break;
				case "a":
					canvas?.discardActiveObject();
					const allObjs = canvas?.getObjects().filter((obj) => obj.selectable);
					canvas?.setActiveObject(
						new fabric.ActiveSelection(allObjs, { canvas })
					);
					canvas?.renderAll();
					break;
				default:
					break;
			}
		}
	});
};

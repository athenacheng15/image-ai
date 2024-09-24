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

		if (isCtrlKey && e.key === "z") {
			e.preventDefault();
			redo();
		}
		if (isCtrlKey && e.key === "c") {
			e.preventDefault();
			copy();
		}
		if (isCtrlKey && e.key === "v") {
			e.preventDefault();
			paste();
		}
		if (isCtrlKey && e.key === "s") {
			e.preventDefault();
			save(true);
		}

		if (isCtrlKey && e.key === "a") {
			e.preventDefault();
			canvas?.discardActiveObject();
			const allObjs = canvas?.getObjects().filter((obj) => obj.selectable);
			canvas?.setActiveObject(new fabric.ActiveSelection(allObjs, { canvas }));
			canvas?.renderAll();
		}
	});
};

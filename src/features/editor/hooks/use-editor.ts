import { useCallback, useState, useMemo } from "react";
import { fabric } from "fabric";

import { useAutoResize } from "@/features/editor/hooks/use-auto-resize";
import {
	BuildEditorProps,
	CIRCLE_OPTIONS,
	DAIMOND_OPTIONS,
	Editor,
	RECTANGLE_OPTIONS,
	TRIANGLE_OPTIONS,
} from "@/features/editor/type";

const buildEditor = ({ canvas }: BuildEditorProps): Editor => {
	const getWorkspace = () => {
		return canvas.getObjects().find((obj) => obj.name === "clip");
	};
	const center = (object: fabric.Object) => {
		const workspace = getWorkspace();
		const centerPoint = workspace?.getCenterPoint();

		if (!centerPoint) return;

		// @ts-ignore
		canvas._centerObject(object, centerPoint);
	};

	const addToCanvas = (object: fabric.Object) => {
		center(object);
		canvas.add(object);
		canvas.setActiveObject(object);
	};
	return {
		addCircle: () => {
			const object = new fabric.Circle({
				...CIRCLE_OPTIONS,
			});
			addToCanvas(object);
		},
		addSoftRentangle: () => {
			const object = new fabric.Rect({
				...RECTANGLE_OPTIONS,
				rx: 50,
				ry: 50,
			});
			addToCanvas(object);
		},
		addRectangle: () => {
			const object = new fabric.Rect({
				...RECTANGLE_OPTIONS,
			});
			addToCanvas(object);
		},
		addTriangle: () => {
			const object = new fabric.Triangle({
				...TRIANGLE_OPTIONS,
			});
			addToCanvas(object);
		},
		addInverseTriangle: () => {
			const HEIGHT = TRIANGLE_OPTIONS.height;
			const WIDTH = TRIANGLE_OPTIONS.width;
			const object = new fabric.Polygon(
				[
					{ x: 0, y: 0 },
					{ x: WIDTH, y: 0 },
					{ x: WIDTH / 2, y: HEIGHT },
				],
				{ ...TRIANGLE_OPTIONS }
			);

			addToCanvas(object);
		},
		addDiamond: () => {
			const HEIGHT = DAIMOND_OPTIONS.height;
			const WIDTH = DAIMOND_OPTIONS.width;
			const object = new fabric.Polygon(
				[
					{ x: WIDTH / 2, y: 0 },
					{ x: WIDTH, y: HEIGHT / 2 },
					{ x: WIDTH / 2, y: HEIGHT },
					{ x: 0, y: HEIGHT / 2 },
				],
				{ ...DAIMOND_OPTIONS }
			);

			addToCanvas(object);
		},
	};
};

export const useEditor = () => {
	const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
	const [container, setContainer] = useState<HTMLDivElement | null>(null);

	useAutoResize({ canvas, container });

	const editor = useMemo(() => {
		if (canvas) {
			return buildEditor({ canvas });
		}
		return undefined;
	}, [canvas]);

	const init = useCallback(
		({
			initialCanvas,
			initialContainer,
		}: {
			initialCanvas: fabric.Canvas;
			initialContainer: HTMLDivElement;
		}) => {
			fabric.Object.prototype.set({
				cornerColor: "#FFF",
				cornerStyle: "circle",
				borderColor: "#3b82f6",
				borderScaleFactor: 1.5,
				transparentCorners: false,
				borderOpacityWhenMoving: 1,
				cornerStrokeColor: "#3b82f6",
			});

			const initailWorkspace = new fabric.Rect({
				width: 900,
				height: 1200,
				name: "clip",
				fill: "white",
				selectable: false,
				hasControls: false,
				shadow: new fabric.Shadow({
					color: "rgba(0,0,0,0.8)",
					blur: 5,
				}),
			});
			initialCanvas.setWidth(initialContainer.offsetWidth);
			initialCanvas.setHeight(initialContainer.offsetHeight);

			initialCanvas.add(initailWorkspace);
			initialCanvas.centerObject(initailWorkspace);
			initialCanvas.clipPath = initailWorkspace;

			setCanvas(initialCanvas);
			setContainer(initialContainer);
		},
		[]
	);
	return { init, editor };
};
